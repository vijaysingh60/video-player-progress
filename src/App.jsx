import React from 'react';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const demoVideoUrl = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Lecture Progress Tracker
        </h1>
      </header>
      
      <main className="w-full max-w-3xl">
        <VideoPlayer 
          videoId="video-1" 
          videoSrc={demoVideoUrl} 
        />
        
      </main>
    </div>
  );
}

export default App;