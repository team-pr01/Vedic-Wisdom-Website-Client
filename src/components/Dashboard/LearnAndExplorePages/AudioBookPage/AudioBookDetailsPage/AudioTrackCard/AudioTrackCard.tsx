import { BiPlay } from "react-icons/bi";
import type { TAudioTrack } from "../../../../../../types/audioTrack.type";
import type { Dispatch, SetStateAction } from "react";

const AudioTrackCard = ({
  track,
  activeTrack,
  setActiveTrack,
}: {
  track: TAudioTrack;
  activeTrack: TAudioTrack;
  setActiveTrack: Dispatch<SetStateAction<TAudioTrack>>;
}) => {
  const trackId = track?._id;
  return (
    <button
      onClick={() => setActiveTrack(track)}
      className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 border w-full bg-white border-neutral-55 ${
        activeTrack?._id === trackId
          ? "bg-white border-orange-200 shadow-lg shadow-orange-100/50 -translate-y-0.5"
          : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
            activeTrack?._id === trackId
              ? "bg-primary-10 text-white"
              : "bg-gray-100 text-gray-400 group-hover:bg-orange-100 group-hover:text-primary-10"
          }`}
        >
          {track?.order}
        </div>
        <div>
          <h4
            className={`font-semibold transition-colors group-hover:text-primary-10 ${activeTrack?._id === trackId ? "text-primary-10" : "text-neutral-10"}`}
          >
            {track?.title}
          </h4>
          <p className="text-xs text-gray-400 mt-0.5">{track?.duration}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div
          className={`p-2 rounded-full transition-all ${activeTrack?._id === trackId ? "text-primary-10 scale-110" : "text-gray-300 group-hover:text-primary-10"}`}
        >
          <BiPlay size={24} />
        </div>
      </div>
    </button>
  );
};

export default AudioTrackCard;
