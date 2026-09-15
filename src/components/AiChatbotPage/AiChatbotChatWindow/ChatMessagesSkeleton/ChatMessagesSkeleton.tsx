const ChatMessagesSkeleton = () => {
  return (
    <div className="max-w-[60%] mx-auto space-y-6">
      {/* Bot Message Skeleton */}
      <div className="flex justify-start">
        <div className="max-w-full mr-auto">
          <div className="px-5 py-3.5 rounded-3xl rounded-tl-none bg-white border border-slate-100 shadow-sm animate-pulse">
            {/* Message line 1 */}
            <div className="h-4 bg-slate-200 rounded-full w-64 mb-2"></div>
            {/* Message line 2 */}
            <div className="h-4 bg-slate-200 rounded-full w-48 mb-2"></div>
            {/* Message line 3 */}
            <div className="h-4 bg-slate-200 rounded-full w-56"></div>
          </div>

          {/* Sources skeleton */}
          <div className="mt-2 space-y-2 animate-pulse">
            <div className="h-3 bg-slate-200 rounded-full w-32"></div>
          </div>
        </div>
      </div>

      {/* User Message Skeleton */}
      <div className="flex justify-end">
        <div className="max-w-full ml-auto">
          <div className="px-5 py-3.5 rounded-3xl rounded-tr-none bg-[#F3E8D2]/60 border border-[#E8D5B5] shadow-sm animate-pulse">
            <div className="h-4 bg-[#E8D5B5]/70 rounded-full w-40"></div>
          </div>
        </div>
      </div>

      {/* Bot Message Skeleton with more lines */}
      <div className="flex justify-start">
        <div className="max-w-full mr-auto">
          <div className="px-5 py-3.5 rounded-3xl rounded-tl-none bg-white border border-slate-100 shadow-sm animate-pulse">
            <div className="h-4 bg-slate-200 rounded-full w-72 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded-full w-60 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded-full w-40"></div>
          </div>

          {/* Sources skeleton */}
          <div className="mt-2 space-y-2 animate-pulse">
            <div className="h-3 bg-slate-200 rounded-full w-28 mb-1"></div>
            <div className="h-3 bg-slate-200 rounded-full w-36"></div>
          </div>
        </div>
      </div>

      {/* User Message Skeleton */}
      <div className="flex justify-end">
        <div className="max-w-full ml-auto">
          <div className="px-5 py-3.5 rounded-3xl rounded-tr-none bg-[#F3E8D2]/60 border border-[#E8D5B5] shadow-sm animate-pulse">
            <div className="h-4 bg-[#E8D5B5]/70 rounded-full w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessagesSkeleton;
