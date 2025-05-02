import { useState, useEffect, useRef } from 'react';
import { addInterval, calculateTotalWatchedTime, calculateProgressPercentage } from '../utils/intervalUtils';

const PROGRESS_UPDATE_INTERVAL = 250; 

export const useVideoProgress = (videoId, duration) => {
    const [intervals, setIntervals] = useState([]);
    const [lastPosition, setLastPosition] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const currentIntervalRef = useRef(null);
    const videoRef = useRef(null);
    

    useEffect(() => {
        const loadProgress = () => {
        try {
            const savedData = localStorage.getItem(`video-progress-${videoId}`);
            if (savedData) {
            const data = JSON.parse(savedData);
            setIntervals(data.intervals);
            setLastPosition(data.lastPosition);
            
            
            const watchedTime = calculateTotalWatchedTime(data.intervals);
            setProgress(calculateProgressPercentage(watchedTime, duration));
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
        };
        
        loadProgress();
    }, [videoId, duration]);
    
    useEffect(() => {
        const saveProgress = () => {
        try {
            const data = {
            videoId,
            intervals,
            totalDuration: duration,
            lastPosition,
            };
            localStorage.setItem(`video-progress-${videoId}`, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
        };
        
        saveProgress();
        
        const watchedTime = calculateTotalWatchedTime(intervals);
        setProgress(calculateProgressPercentage(watchedTime, duration));
    }, [intervals, lastPosition, videoId, duration]);
    
    useEffect(() => {
        let progressInterval = null;
        
        if (isPlaying && videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        if (!currentIntervalRef.current) {
            currentIntervalRef.current = { start: currentTime, end: currentTime };
        }
        
        progressInterval = window.setInterval(() => {
            if (!videoRef.current || !currentIntervalRef.current) return;
            
            const newTime = videoRef.current.currentTime;
            
            currentIntervalRef.current.end = newTime;
            
            setLastPosition(newTime);
            
            setIntervals(prevIntervals => 
                addInterval(prevIntervals, { ...currentIntervalRef.current })
            );
        }, PROGRESS_UPDATE_INTERVAL);
        } else if (currentIntervalRef.current) {
            setIntervals(prevIntervals => 
                addInterval(prevIntervals, currentIntervalRef.current)
            );
            currentIntervalRef.current = null;
        }
        
        return () => {
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        };
    }, [isPlaying]);
    
    const handleSeek = (time) => {
        if (currentIntervalRef.current && isPlaying) {
            setIntervals(prevIntervals => 
                addInterval(prevIntervals, currentIntervalRef.current)
            );
            currentIntervalRef.current = { start: time, end: time };
        }
        
        setLastPosition(time);
    };
    
    const setVideoElement = (element) => {
        videoRef.current = element;
    };
    
    return {
        progress,
        lastPosition,
        intervals,
        isPlaying,
        setIsPlaying,
        handleSeek,
        setVideoElement,
    };
};