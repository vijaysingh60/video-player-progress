# Smart Video Progress Tracker

A smart video tracking system for online learning platforms that calculates video progress based on *unique intervals watched*, instead of naive total time or just reaching the end.

---

## 📦 Tech Stack

- **Frontend**: React
- **State Persistence**: `localStorage`
- **Icons**: `lucide-react`

---

## 🚀 Features

- Smart video progress tracking
- Skipping doesn't falsely inflate progress
- Auto-resume from the last watched position
- Clean interval merging for accurate progress
- Progress bar showing actual watched sections

---
## 📍 How we tracked the watched intervals
  - We used a custom useVideoProgress hook to track exactly which parts of a video the user has watched. When the video is playing, we:
  
  - Start an interval { start, end } from the current playback time.
  
  - Update the end every 250ms while the video is playing.
  
  - If the user seeks or pauses, we save that interval and start a new one from the new time.
  
  - This gives us an accurate list of what parts of the video were actually viewed.


## 🧠 How we merged intervals to calculate unique progress
  - To prevent double-counting time (e.g., rewatching the same segment), we:
  
  - Use a utility function to merge overlapping or adjacent intervals.
  
  - After merging, we calculate total watched time by summing the lengths of all unique intervals.
  
  - Progress percentage is then calculated as:
  - watchedTime / totalVideoDuration * 100

## ⚠️ Challenges and how we solved them
    - Problem: localStorage wasn't saving the latest lastPosition correctly due to async state updates.
  - ✅ Solution: Used a ref to track the latest lastPosition and wrote that to localStorage.


## 🔧 Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/vijaysingh60/video-player-progress.git
cd video-player-progress
npm install
npm run dev


