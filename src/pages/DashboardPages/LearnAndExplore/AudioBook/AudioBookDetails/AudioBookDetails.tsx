/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Breadcrumb from "../../../../../components/Reusable/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import { useGetAllAudioTrackByBookIdQuery } from "../../../../../redux/Features/AudioBook/audioTrackApi";
import AudioPlayer from "../../../../../components/Dashboard/LearnAndExplorePages/AudioBookPage/AudioBookDetailsPage/AudioPlayer/AudioPlayer";
import AudioTrackCard from "../../../../../components/Dashboard/LearnAndExplorePages/AudioBookPage/AudioBookDetailsPage/AudioTrackCard/AudioTrackCard";
import type { TAudioTrack } from "../../../../../types/audioTrack.type";

const AudioBookDetails = () => {
  const { id } = useParams();
  const { data } = useGetAllAudioTrackByBookIdQuery(id);
  const audioTrack = data?.data || {};
  const tracks = audioTrack?.tracks || [];
  const [activeTrack, setActiveTrack] = useState(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  // Set initial active track
  useEffect(() => {
    if (tracks.length > 0) {
      setActiveTrack(tracks[0]);
      setActiveTrackIndex(0);
    }
  }, [tracks]);

  // Total duration
  const totalAudioTracksDuration = tracks?.reduce(
    (acc: any, track: TAudioTrack) => acc + (track?.duration || 0),
    0,
  );

  // Handle Next
  const handleNext = () => {
    if (tracks.length === 0) return;
    const nextIndex = (activeTrackIndex + 1) % tracks.length;
    setActiveTrackIndex(nextIndex);
    setActiveTrack(tracks[nextIndex]);
  };

  // Handle Previous
  const handlePrevious = () => {
    if (tracks.length === 0) return;
    const prevIndex = (activeTrackIndex - 1 + tracks.length) % tracks.length;
    setActiveTrackIndex(prevIndex);
    setActiveTrack(tracks[prevIndex]);
  };

  return (
    <div className="font-Manrope">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          {
            label: "Audio Books",
            path: "/dashboard/learn-and-explore/audio-book",
          },
          { label: audioTrack?.audioBookName || "Audio Book", path: "#" },
        ]}
      />

      {/* Header Metadata */}
      <div className="mt-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-10">
          {audioTrack?.audioBookName}
        </h1>
        <div className="flex items-center gap-4 mt-3 text-neutral-50 font-medium text-sm">
          <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs">
            {tracks.length} Chapters
          </span>
          <span className="w-1.5 h-1.5 bg-neutral-60/50 rounded-full"></span>
          <span>{totalAudioTracksDuration} total</span>
          <span className="w-1.5 h-1.5 bg-neutral-60/50 rounded-full"></span>
          <span
            className={`${audioTrack?.isPremium ? "text-orange-500" : "text-green-500"}`}
          >
            {audioTrack?.isPremium ? "Paid" : "Free"}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* --- LEFT: TRACK LIST --- */}
        <div className="w-full lg:w-3/5 space-y-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">
            Table of Contents
          </h3>
          <div className="space-y-4">
            {tracks?.length > 0 ? (
              tracks?.map((track: TAudioTrack) => (
                <AudioTrackCard
                  key={track?._id}
                  track={track}
                  activeTrack={activeTrack as any}
                  setActiveTrack={setActiveTrack as any}
                />
              ))
            ) : (
              <p className="text-neutral-40 text-center py-8">
                No tracks available for this audio book.
              </p>
            )}
          </div>
        </div>

        {/* --- RIGHT: THE PLAYER --- */}
        <AudioPlayer
          activeTrack={activeTrack as any}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
};

export default AudioBookDetails;
