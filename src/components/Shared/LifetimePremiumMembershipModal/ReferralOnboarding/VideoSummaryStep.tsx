import Textarea from "../../../Reusable/TextArea/TextArea";

const VideoSummaryStep = () => {
  return (
    <div className="space-y-6">
      {/* Video Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-neutral-90">Video Summary</h3>
          <p className="text-sm text-neutral-60 mt-0.5">
            Watch the short spiritual video below
          </p>
        </div>
        <span className="text-xs font-medium text-primary-10 bg-primary-10/10 px-3 py-1 rounded-full">
          Step 2 of 4
        </span>
      </div>

      {/* Video Player */}
      <div className="bg-black/5 rounded-xl overflow-hidden relative aspect-video border border-neutral-20">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/28sptQICKCk?si=zfjEOseBhdqruuE0"
          title="Spiritual Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video Description */}
      <Textarea
        name="summary"
        label="Briefly write what you learned from this video"
        placeholder="Write 2–4 lines about the main teaching of this video..."
      />
    </div>
  );
};

export default VideoSummaryStep;
