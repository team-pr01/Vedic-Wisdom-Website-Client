/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaBookOpen, FaChevronDown, FaChevronUp, FaExternalLinkAlt } from "react-icons/fa";

const Sources = ({msg} : {msg: any}) => {
     const [expandedSources, setExpandedSources] = useState<string | null>(null);

     const toggleSources = (messageId: string) => {
    setExpandedSources(expandedSources === messageId ? null : messageId);
  };
  return (
    <div className="bg-neutral-10/5 rounded-xl border border-neutral-20 overflow-hidden">
      <button
        onClick={() => toggleSources(msg.id)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-10/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FaBookOpen className="text-primary-10 text-sm" />
          <span className="text-sm font-medium text-neutral-90">
            View Sources ({msg.sources.length})
          </span>
        </div>
        {expandedSources === msg.id ? (
          <FaChevronUp className="text-neutral-40" />
        ) : (
          <FaChevronDown className="text-neutral-40" />
        )}
      </button>

      {expandedSources === msg.id && (
        <div className="px-4 pb-3 space-y-2">
          {msg.sources.map((source:any, idx:number) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-3 border border-neutral-20 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-90">
                    {source.displayName || "Source"}
                  </p>
                  {/* <p className="text-xs text-neutral-60 mt-0.5">
                                            {source.category || "General"}
                                          </p> */}
                </div>
              </div>
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-10 hover:underline mt-1.5 flex items-center gap-1"
                >
                  View Source
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sources;
