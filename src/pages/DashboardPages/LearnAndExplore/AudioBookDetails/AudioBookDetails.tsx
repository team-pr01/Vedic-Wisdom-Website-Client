/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PurchaseAudioBookModal from "../../../../components/Dashboard/LearnAndExplorePages/AudioBookPage/AudioBookDetailsPage/PurchaseAudioBookModal/PurchaseAudioBookModal";
import { useGetAllAudioTrackByBookIdQuery } from "../../../../redux/Features/AudioBook/audioTrackApi";
import { useCheckOwnershipQuery } from "../../../../redux/Features/AudioBook/audioBookPurchaseApi";
import Breadcrumb from "../../../../components/Reusable/Breadcrumb/Breadcrumb";
import Button from "../../../../components/Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import type { TAudioTrack } from "../../../../types/audioTrack.type";
import AudioTrackCard from "../../../../components/Dashboard/LearnAndExplorePages/AudioBookPage/AudioBookDetailsPage/AudioTrackCard/AudioTrackCard";
import AudioPlayer from "../../../../components/Dashboard/LearnAndExplorePages/AudioBookPage/AudioBookDetailsPage/AudioPlayer/AudioPlayer";

const AudioBookDetails = () => {
  const { id } = useParams();
  const { data } = useGetAllAudioTrackByBookIdQuery(id);
  const audioTrack = data?.data || {};

  const { data: checkOwnership } = useCheckOwnershipQuery(id);
  const hasPurchased = checkOwnership?.data?.hasPurchased || false;
  const tracks = audioTrack?.tracks || [];
  const [activeTrack, setActiveTrack] = useState(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  const [isPurchaseAudioBookModalOpen, setIsPurchaseAudioBookModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (tracks.length > 0) {
      setActiveTrack(tracks[0]);
      setActiveTrackIndex(0);
    }
  }, [tracks]);

  const handleNext = () => {
    if (tracks.length === 0) return;
    const nextIndex = (activeTrackIndex + 1) % tracks.length;
    setActiveTrackIndex(nextIndex);
    setActiveTrack(tracks[nextIndex]);
  };

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
      <div className="mt-6 md:mt-8 mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-10 wrap-break-word">
            {audioTrack?.audioBookName}
          </h1>
          <div className="flex items-center flex-wrap gap-x-3 gap-y-2 mt-3 text-neutral-50 font-medium text-xs sm:text-sm">
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs whitespace-nowrap">
              {tracks.length} Chapters
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 bg-neutral-60/50 rounded-full"></span>
            {!audioTrack?.isPremium && (
              <span className="text-green-500 whitespace-nowrap">Free</span>
            )}
            {audioTrack?.isPremium && hasPurchased && (
              <span className="text-green-500 whitespace-nowrap">Unlocked</span>
            )}
            {audioTrack?.isPremium && !hasPurchased && (
              <span className="text-primary-10 whitespace-nowrap">
                {audioTrack?.coinPrice} Coins to Unlock
              </span>
            )}
          </div>
        </div>

        <div className="w-full sm:w-auto shrink-0">
          {hasPurchased ? (
            <Link to={`/dashboard/my-library`} className="block w-full sm:w-auto">
              <Button
                variant="secondary"
                label="View My Library"
                className="w-full sm:w-auto"
              />
            </Link>
          ) : (
            <Button
              onClick={() => setIsPurchaseAudioBookModalOpen(true)}
              leftIcon={ICONS.unlock}
              label="Unlock Now"
              className="w-full sm:w-auto"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">
        {/* --- LEFT: TRACK LIST --- */}
        <div className="w-full lg:w-3/5 space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 md:mb-4 px-1 sm:px-2">
            Table of Contents
          </h3>
          <div className="space-y-3 sm:space-y-4">
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
              <p className="text-neutral-40 text-center py-8 text-sm sm:text-base">
                No tracks available for this audio book.
              </p>
            )}
          </div>
        </div>

        {/* --- RIGHT SIDE: THE PLAYER --- */}
        <AudioPlayer
          activeTrack={activeTrack as any}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>

      <PurchaseAudioBookModal
        isModalOpen={isPurchaseAudioBookModalOpen}
        setIsModalOpen={setIsPurchaseAudioBookModalOpen}
        audioBookId={id as string}
      />
    </div>
  );
};

export default AudioBookDetails;