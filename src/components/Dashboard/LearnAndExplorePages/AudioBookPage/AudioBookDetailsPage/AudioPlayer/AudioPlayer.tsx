import { useState, useRef, useEffect } from "react";
import {
  BiSkipPrevious,
  BiSkipNext,
  BiPauseCircle,
  BiPlayCircle,
  BiUndo,
  BiRedo,
} from "react-icons/bi";
import type { TAudioTrack } from "../../../../../../types/audioTrack.type";

const AudioPlayer = ({
  activeTrack,
  onNext,
  onPrevious,
}: {
  activeTrack: TAudioTrack;
  onNext?: () => void;
  onPrevious?: () => void;
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Format time to mm:ss
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Load audio when track changes
  useEffect(() => {
    if (audioRef.current && activeTrack?.url) {
      audioRef.current.src = activeTrack.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [activeTrack]);

  // Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle track end
  const handleTrackEnd = () => {
    if (onNext) {
      onNext();
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  // Seek to position
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  // Rewind 10 seconds
  const handleRewind = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Forward 10 seconds
  const handleForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(
        audioRef.current.duration,
        audioRef.current.currentTime + 10,
      );
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="w-full lg:w-2/5 lg:sticky lg:top-8">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="bg-white rounded-3xl p-8 shadow-lg border border-neutral-20 flex flex-col items-center">
        {/* Now Playing Label */}
        <p className="text-neutral-40 text-xs font-medium uppercase tracking-widest mb-6">
          Now Playing
        </p>

        {/* Album Art */}
        <div className="w-56 h-56 rounded-2xl shadow-xl bg-linear-to-br from-orange-500 to-primary-30 flex items-center justify-center">
          <span className="text-white text-7xl font-bold opacity-30">♪</span>
        </div>

        {/* Track Info */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold text-neutral-90 leading-tight">
            {activeTrack?.title || "No Track Selected"}
          </h3>
        </div>

        {/* Progress Slider */}
        <div className="w-full mt-6">
          <div className="relative w-full h-1 bg-neutral-30 rounded-full overflow-hidden">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              className="absolute top-0 left-0 h-full bg-primary-10 rounded-full pointer-events-none"
              style={{
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-neutral-40 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between w-full mt-8">
          {/* Previous Track */}
          <button
            onClick={onPrevious}
            className="text-neutral-40 hover:text-primary-10 transition-colors p-2"
            title="Previous track"
          >
            <BiUndo size={24} />
          </button>

          <div className="flex items-center gap-6">
            {/* Rewind 10 seconds */}
            <button
              onClick={handleRewind}
              className="text-neutral-40 hover:text-primary-10 transition-colors"
              title="Rewind 10 seconds"
            >
              <BiSkipPrevious size={32} />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="bg-primary-10 text-white p-4 rounded-full shadow-xl shadow-orange-200 hover:bg-primary-10/90 transition-all hover:scale-110 active:scale-95"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <BiPauseCircle size={36} />
              ) : (
                <BiPlayCircle size={36} />
              )}
            </button>

            {/* Forward 10 seconds */}
            <button
              onClick={handleForward}
              className="text-neutral-40 hover:text-primary-10 transition-colors"
              title="Forward 10 seconds"
            >
              <BiSkipNext size={32} />
            </button>
          </div>

          {/* Next Track */}
          <button
            onClick={onNext}
            className="text-neutral-40 hover:text-primary-10 transition-colors p-2"
            title="Next track"
          >
            <BiRedo size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
