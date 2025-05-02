import React from 'react';

const ProgressBar = ({ progress, intervals, duration }) => {
    
    return (
        <div className="w-full">
            <div className="w-full flex flex-col gap-2">
                <div className="w-full h-3 bg-gray-200 rounded-full relative overflow-hidden">
                    {intervals.map((interval, index) => {
                        const startPercent = (interval.start / duration) * 100;
                        const widthPercent = ((interval.end - interval.start) / duration) * 100;
                        return (
                        <div
                            key={index}
                            className="absolute h-full bg-blue-500"
                            style={{
                                left: `${startPercent}%`,
                                width: `${widthPercent}%`,
                            }}
                        />
                        );
                    })}
                    
                </div>
                
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Progress: {progress.toFixed(1)}%</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;