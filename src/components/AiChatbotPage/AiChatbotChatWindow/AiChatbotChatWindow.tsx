import { FiBell, FiCopy, FiImage, FiInfo, FiMic, FiRotateCcw, FiSearch, FiSend, FiTrash2 } from "react-icons/fi";

const AiChatbotChatWindow = () => {
    return (
        <main className="flex-1 flex flex-col relative rounded-3xl bg-[#fafafa] overflow-hidden text-[#1C2542]">
        {/* Header */}
        <header className="h-20 bg-white border-b border-[#DEDEDE] flex items-center justify-between px-10">
          <h2 className="font-bold text-xl text-[#1C2542]">Spiritual AI Assistant</h2>

          <div className="flex items-center gap-5">
            <div className="relative">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8F8F8F]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search conversations..."
                className="bg-[#f3f3f3] border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#ffb72f] w-72 transition-all"
              />
            </div>
            <button className="p-2.5 text-[#8F8F8F] bg-[#f6f6f6] rounded-xl hover:text-[#1a1f2c] transition-colors">
              <FiBell size={20} />
            </button>
            <button className="p-2.5 text-[#8F8F8F] bg-[#f6f6f6] rounded-xl hover:text-[#1a1f2c] transition-colors">
              <FiInfo size={20} />
            </button>
          </div>
        </header>

        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-[#fafafa]">
          {/* Example Chat Output Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-[#DEDEDE] shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3f3f3]">
                <div className="flex gap-6">
                  <Tab label="HTML" />
                  <Tab label="CSS" />
                  <Tab label="JS" active />
                </div>
                <button className="flex items-center gap-2 text-xs text-[#8F8F8F] font-bold hover:text-[#1a1f2c] transition-colors uppercase tracking-wider">
                  <FiCopy size={15} /> Copy code
                </button>
              </div>
              <div className="p-8 bg-[#fbf6ee]/40 font-mono text-sm leading-relaxed text-[#1C2542]">
                <p>
                  <span className="text-blue-500">let</span> cancelButton =
                  document.
                  <span className="text-[#db940d]">getElementById</span>(
                  <span className="text-green-600">"cancel-button"</span>);
                </p>
                <p>
                  <span className="text-blue-500">let</span> sendButton =
                  document.
                  <span className="text-[#db940d]">getElementById</span>(
                  <span className="text-green-600">"send-button"</span>);
                </p>
                <p className="my-2" />
                <p>
                  cancelButton.
                  <span className="text-[#db940d]">addEventListener</span>(
                  <span className="text-green-600">"click"</span>,{" "}
                  <span className="text-blue-500">function</span>() {"{"}
                </p>
                <p className="pl-6 text-[#8F8F8F]">
                  console.<span className="text-[#db940d]">log</span>(
                  <span className="text-green-600">"Cancel clicked"</span>);
                </p>
                <p>{"}"});</p>
              </div>
            </div>
            <div className="mt-6 flex gap-4 p-4 bg-[#fff0d4]/30 rounded-2xl border border-[#ffcf72]/20">
              <FiInfo className="text-[#db940d] shrink-0 mt-1" size={20} />
              <p className="text-[#535353] text-sm leading-relaxed">
                Note: This is just an example of a simple JS form handler. In
                production, ensure you add event delegation and proper cleanup
                to avoid memory leaks.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Input Area */}
        <footer className="p-8 bg-white border-t border-[#DEDEDE]">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-[#DEDEDE] rounded-full text-sm font-bold text-[#535353] hover:bg-[#f6f6f6] shadow-sm transition-all active:scale-95">
              <FiRotateCcw size={16} /> Regenerate response
            </button>

            <div className="w-full relative">
              <div className="flex items-center bg-[#f9f9f9] border border-[#DEDEDE] rounded-2xl p-2.5 shadow-inner focus-within:border-[#ffb72f] transition-colors">
                <button className="p-2.5 text-[#8F8F8F] hover:text-[#1a1f2c]">
                  <FiImage size={22} />
                </button>
                <button className="p-2.5 text-[#8F8F8F] hover:text-[#1a1f2c]">
                  <FiMic size={22} />
                </button>
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="flex-1 border-none focus:ring-0 px-4 text-base bg-transparent text-[#1C2542] placeholder-[#8F8F8F]"
                />
                <button className="bg-[#ffb72f] p-3.5 rounded-xl text-[#1a1f2c] hover:bg-[#db940d] transition-all shadow-md active:scale-95">
                  <FiSend size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between w-full px-2">
              <p className="text-[11px] text-[#8F8F8F] font-medium italic">
                AI can produce inaccurate information about people, places, or
                facts.
              </p>
              <button className="flex items-center gap-2 text-[11px] text-[#8F8F8F] hover:text-red-500 font-bold transition-colors">
                <FiTrash2 /> Clear History
              </button>
            </div>
          </div>
        </footer>
      </main>
    );
};

export default AiChatbotChatWindow;


const Tab = ({ label, active = false }) => (
  <button
    className={`text-xs font-bold px-1 pb-2 transition-all tracking-widest uppercase ${active ? "text-[#1C2542] border-b-2 border-[#ffb72f]" : "text-[#8F8F8F] hover:text-[#535353]"}`}
  >
    {label}
  </button>
);