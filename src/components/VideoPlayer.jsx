import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { useVideoProgress } from '../hooks/useVideoProgress';

const VideoPlayer = ({ videoId, videoSrc }) => {
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(0);
    
    const {
        progress,
        lastPosition,
        intervals,
        isPlaying,
        setIsPlaying,
        handleSeek,
        setVideoElement
    } = useVideoProgress(videoId, duration);
    
    useEffect(() => {
        if (videoRef.current) {
                setVideoElement(videoRef.current);
        }
    }, [setVideoElement]);
    
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
            
            videoRef.current.currentTime = lastPosition;
        }
    };
    
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    
    const seekVideo = (time) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            handleSeek(time);
        }
    };
    
    const skipForward = () => {
        if (videoRef.current) {
            const newTime = Math.min(videoRef.current.currentTime + 10, duration);
            seekVideo(newTime);
        }
    };
    
    const skipBackward = () => {
        if (videoRef.current) {
            const newTime = Math.max(videoRef.current.currentTime - 10, 0);
            seekVideo(newTime);
        }
    };
    
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative aspect-video bg-black">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full h-full"
                    onLoadedMetadata={handleLoadedMetadata}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onSeeked={() => videoRef.current && handleSeek(videoRef.current.currentTime)}
                />
            </div>
            
            <div className="p-4 space-y-4">
                <ProgressBar 
                    progress={progress} 
                    intervals={intervals}
                    duration={duration}
                    onSeek={seekVideo}
                />
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={skipBackward}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                            <SkipBack size={22} />
                        </button>
                        
                        <button 
                            onClick={togglePlay}
                            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                            >
                            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                        
                        <button 
                        onClick={skipForward}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                        <SkipForward size={22} />
                        </button>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                        {videoRef.current ? formatTime(videoRef.current.currentTime) : "00:00"} / {duration ? formatTime(duration) : "00:00"}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VideoPlayer;