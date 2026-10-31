// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { IoBookOutline } from "react-icons/io5";
// import { IoFlagOutline } from "react-icons/io5";
// import { IoLanguageOutline } from "react-icons/io5";
// import { IoSearchOutline } from "react-icons/io5";
// import { IoCloseOutline } from "react-icons/io5";
// import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
// import Breadcrumb from "../../../../components/Reusable/Breadcrumb/Breadcrumb";
// import { ICONS } from "../../../../assets";
// import { useParams } from "react-router-dom";
// import { useEffect, useMemo, useState } from "react";
// import { useGetSingleBookQuery } from "../../../../redux/Features/Book/bookApi";
// import { LANGUAGES as allLanguages } from "../../../../utils/allLanguages";
// import { useGetAllBookTextsByBookIdQuery } from "../../../../redux/Features/Book/textsApi";
// // import ReportModal from "../../../../components/ReportModal/ReportModal";

// const BookDetails = () => {
//   const { id: bookId } = useParams();
//   const { data: singleBook, isLoading: isVedaLoading } =
//     useGetSingleBookQuery(bookId);

//   const { data } = useGetAllBookTextsByBookIdQuery(bookId);

  
//   console.log("single book",singleBook);
//   console.log(data);
//   // Extract levels from the actual API response structure
//   const levels = singleBook?.data?.levels || [];

//   // For dropdown values, we'll use the levels array
//   // const [levelValues, setLevelValues] = useState<any[]>([]);

//   const [showSectionDropdown, setShowSectionDropdown] = useState(false);
//   const [showSubsectionDropdown, setShowSubsectionDropdown] = useState(false);
//   const [showVerseDropdown, setShowVerseDropdown] = useState(false);
//   const [showLanguageModal, setShowLanguageModal] = useState(false);
//   const [languageSearchTerm, setLanguageSearchTerm] = useState("");
//   const [targetLanguage, setTargetLanguage] = useState({
//     name: "select language",
//     code: "en",
//   });
//   const [currentTranslation, setCurrentTranslation] = useState<string | null>(
//     null,
//   );

//   // selected values - using the levels from API
//   const [currentSection, setCurrentSection] = useState<string | null>(
//     levels?.[0]?.name || null,
//   );
//   const [currentSubSection, setCurrentSubSection] = useState<string | null>(
//     levels?.[1]?.name || null,
//   );
//   const [currentVerse, setCurrentVerse] = useState<string | null>(
//     levels?.[2]?.name || null,
//   );

//   const [level1Values, setLevel1Values] = useState<string[]>([]);
//   const [level2Values, setLevel2Values] = useState<string[]>([]);
//   const [level3Values, setLevel3Values] = useState<string[]>([]);
//   const [flattenedVerses, setFlattenedVerses] = useState<
//     { locationKey: string; levels: string[] }[]
//   >([]);

//   const [isReportModalOpen, setIsReportModalOpen] = useState(false);
//   const [reportingVerse, setReportingVerse] = useState<any>(null);
//   console.log(isReportModalOpen, reportingVerse);

//   // Since we don't have actual verse data from the book API, we'll need to fetch it separately
//   // For now, let's set up some mock data or handle the case where no verses are available
//   useEffect(() => {
//     if (levels?.length > 0) {
//       // Set level values from the levels array
//       const l1Values = levels.map((level: any) => level.name);
//       setLevel1Values(l1Values);

//       // Set initial selections
//       if (l1Values.length > 0 && !currentSection) {
//         setCurrentSection(l1Values[0]);
//       }
//     }
//   }, [levels]);

//   // For demo purposes, let's create some mock verse data
//   useEffect(() => {
//     if (currentSection) {
//       // Mock data for demonstration
//       const mockVerses = [
//         { locationKey: "1.1", levels: ["1", "1"] },
//         { locationKey: "1.2", levels: ["1", "2"] },
//         { locationKey: "1.3", levels: ["1", "3"] },
//         { locationKey: "2.1", levels: ["2", "1"] },
//         { locationKey: "2.2", levels: ["2", "2"] },
//       ];
//       setFlattenedVerses(mockVerses);
//       setLevel2Values(["1", "2"]);
//       setLevel3Values(["1", "2", "3"]);
//     }
//   }, [currentSection]);

//   const [currentVerseIndex, setCurrentVerseIndex] = useState<number>(-1);

//   useEffect(() => {
//     if (!flattenedVerses.length) return;

//     const currentKey = [currentSection, currentSubSection, currentVerse]
//       .filter(Boolean)
//       .join(".");

//     const idx = flattenedVerses.findIndex((v) => v.locationKey === currentKey);
//     setCurrentVerseIndex(idx);
//   }, [flattenedVerses, currentSection, currentSubSection, currentVerse]);

//   const navigateVerse = (direction: "next" | "previous") => {
//     if (!flattenedVerses.length) return;

//     const newIndex =
//       direction === "next" ? currentVerseIndex + 1 : currentVerseIndex - 1;

//     if (newIndex < 0 || newIndex >= flattenedVerses.length) return;
//     const next = flattenedVerses[newIndex];

//     // Reset state levels dynamically based on available depth
//     setCurrentSection(next.levels[0]);
//     setCurrentSubSection(next.levels[1] || null);
//     setCurrentVerse(next.levels[2] || null);
//     setTargetLanguage({ name: "select language", code: "en" });
//     setCurrentTranslation(null);
//   };

//   // Mock verse data for display
//   const [verseData, setVerseData] = useState<any>(null);

//   useEffect(() => {
//     // Create mock verse data for demonstration
//     if (currentSection && currentSubSection) {
//       setVerseData({
//         originalText:
//           "ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै। तेजस्वि नावधीतमस्तु मा विद्विषावहै।",
//         translations: [
//           {
//             langCode: "en",
//             translation:
//               "Om. May we be protected together. May we be nourished together. May we work together with great energy. May our study be brilliant and effective. May we not hate each other.",
//           },
//           {
//             langCode: "hi",
//             translation:
//               "ॐ। हम सब एक साथ सुरक्षित रहें। हम सब एक साथ पोषित हों। हम सब एक साथ महान ऊर्जा के साथ काम करें। हमारा अध्ययन उज्ज्वल और प्रभावशाली हो। हम एक-दूसरे से घृणा न करें।",
//           },
//         ],
//       });
//     }
//   }, [currentSection, currentSubSection]);

//   // // This is the actual API call for verses - uncomment when you have the actual endpoint
//   // const [payload, setPayload] = useState<any | null>(null);
//   // const { data: CurrentVeda, isLoading } = useGetSingleVedaQuery(payload!, {
//   //   skip: !payload,
//   // });

//   // useEffect(() => {
//   //   if (!veda) return;
//   //   // Build payload based on the actual API structure
//   //   if (currentSection && currentSubSection) {
//   //     const p: any = {
//   //       id: vedaId,
//   //       // Adjust these fields based on your actual API requirements
//   //     };
//   //     setPayload(p);
//   //   }
//   // }, [veda, currentSection, currentSubSection, currentVerse, vedaId]);

//   const getTranslationByLang = (langCode: string): void => {
//     const showTranslation =
//       verseData?.translations?.find((t: any) => t.langCode === langCode)
//         ?.translation || "Translation not available";
//     setCurrentTranslation(showTranslation);
//   };

//   const handleOpenReportModal = (verse: any) => {
//     setReportingVerse(verse);
//     setIsReportModalOpen(true);
//   };

//   const availableLanguageCodes = useMemo<string[]>(() => {
//     if (!allLanguages || !verseData?.translations) return [];
//     const availableCodes = verseData.translations.map((t: any) =>
//       t.langCode.toLowerCase(),
//     );
//     return allLanguages
//       .map((lang) => lang.code.toLowerCase())
//       .filter((code) => availableCodes.includes(code));
//   }, [allLanguages, verseData]);

//   const filteredLanguages = useMemo(() => {
//     return allLanguages.filter(
//       (lang) =>
//         availableLanguageCodes.includes(lang.code.toLowerCase()) &&
//         lang.name.toLowerCase().includes(languageSearchTerm.toLowerCase()),
//     );
//   }, [allLanguages, availableLanguageCodes, languageSearchTerm]);

//   // Get book name from veda data
//   const bookName = singleBook?.data?.name || "Book";

//   return (
//     <div className="font-Manrope">
//       <Breadcrumb
//         items={[
//           { label: "Dashboard", path: "/dashboard" },
//           {
//             label: "Book",
//             path: "/dashboard/learn-and-explore/book",
//           },
//           {
//             label: bookName,
//             path: `/dashboard/learn-and-explore/book/${bookId}`,
//           },
//         ]}
//       />

//       <h4 className="text-neutral-90 font-bold text-xl mt-8">{bookName}</h4>
//       <div className="flex gap-10 mt-3">
//         <div className="w-[70%]">
//           {isVedaLoading ? (
//             <div className="bg-white border border-neutral-55 p-4 rounded-2xl flex items-center justify-center min-h-50">
//               <p className="text-neutral-50">Loading...</p>
//             </div>
//           ) : verseData ? (
//             <>
//               <div className="bg-white border border-neutral-55 p-4 rounded-2xl">
//                 {/* Sanskrit Text */}
//                 {verseData?.originalText &&
//                   verseData.originalText
//                     .split("।")
//                     .filter((line: any) => line.trim() !== "")
//                     .map((line: any, index: number) => (
//                       <p
//                         key={`orig-${index}`}
//                         className="text-xl text-[#2D3748] dark:text-[#F7FAFC] text-center leading-relaxed mb-4 font-serif"
//                       >
//                         {line.trim()}।
//                       </p>
//                     ))}

//                 {/* Translation Controls */}
//                 <div className="flex justify-between items-center mt-6 pt-6 border-t border-neutral-55">
//                   <button
//                     className="flex items-center gap-2 bg-primary-10 text-white px-4 py-2 rounded-full hover:bg-primary-10/90 transition-colors"
//                     onClick={() => setShowLanguageModal(true)}
//                   >
//                     <IoLanguageOutline size={18} />
//                     <span className="text-white text-sm font-medium">
//                       to: {targetLanguage.name}
//                     </span>
//                   </button>

//                   <button
//                     className="p-2 bg-red-500/10 hover:bg-red-50 rounded-full transition-colors"
//                     onClick={() => handleOpenReportModal(verseData)}
//                   >
//                     <IoFlagOutline size={18} className="text-red-500" />
//                   </button>
//                 </div>

//                 {/* Translation */}
//                 {currentTranslation && (
//                   <div className="mt-6 pt-6 border-t border-neutral-55">
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-sm text-neutral-50">
//                         Translation by AI
//                       </span>
//                       {verseData?.isHumanVerified && (
//                         <div className="bg-[#10B981]/20 text-[#10B981] text-xs font-semibold px-2 py-1 rounded">
//                           Human Verified
//                         </div>
//                       )}
//                     </div>

//                     {/* Translation Content */}
//                     <div className="space-y-4">
//                       <div>
//                         <p className="leading-relaxed text-[#2D3748]">
//                           {currentTranslation}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex items-center justify-center gap-4 mt-6">
//                 <button
//                   className={`flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-55 transition-all duration-300 group ${
//                     currentVerseIndex <= 0
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-primary-10 hover:text-white hover:border-primary-10"
//                   }`}
//                   onClick={() => navigateVerse("previous")}
//                   disabled={currentVerseIndex <= 0}
//                 >
//                   <IoChevronBackOutline className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
//                   Previous
//                 </button>

//                 <span className="text-sm font-semibold text-neutral-90">
//                   {currentSection}
//                   {currentSubSection && `.${currentSubSection}`}
//                   {currentVerse && `.${currentVerse}`}
//                 </span>

//                 <button
//                   className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 group shadow-md hover:shadow-lg ${
//                     currentVerseIndex >= flattenedVerses.length - 1
//                       ? "opacity-50 cursor-not-allowed bg-neutral-55 text-neutral-50"
//                       : "bg-primary-10 text-white hover:bg-primary-10/90"
//                   }`}
//                   onClick={() => navigateVerse("next")}
//                   disabled={currentVerseIndex >= flattenedVerses.length - 1}
//                 >
//                   Next
//                   <IoChevronForwardOutline className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="bg-white border border-neutral-55 p-4 rounded-2xl flex flex-col items-center justify-center min-h-50">
//               <IoBookOutline size={48} className="text-neutral-40" />
//               <p className="text-center mt-4 text-lg text-neutral-50">
//                 {levels?.length > 0
//                   ? "Select a section to display."
//                   : "No content available for this Vedic text yet."}
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="w-[30%]">
//           <div className="bg-white border border-neutral-55 p-3 rounded-2xl flex flex-col gap-2">
//             {/* Section Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setShowSectionDropdown(!showSectionDropdown);
//                   setShowSubsectionDropdown(false);
//                   setShowVerseDropdown(false);
//                 }}
//                 className="text-neutral-90 font-semibold text-sm 2xl:text-base flex items-center justify-between w-full p-3 rounded-md bg-neutral-70 border border-neutral-55 hover:bg-neutral-60 transition-colors"
//               >
//                 <span>{currentSection || "Select Section"}</span>
//                 <MdOutlineKeyboardArrowDown className="text-2xl" />
//               </button>

//               {showSectionDropdown && (
//                 <div className="absolute z-10 mt-1 left-0 right-0 bg-white border border-neutral-55 rounded-lg shadow-lg max-h-48 overflow-y-auto">
//                   {level1Values.map((section, i) => (
//                     <div
//                       key={i}
//                       onClick={() => {
//                         setCurrentSection(section);
//                         setShowSectionDropdown(false);
//                         setCurrentSubSection(null);
//                         setCurrentVerse(null);
//                         setTargetLanguage({
//                           name: "select language",
//                           code: "en",
//                         });
//                         setCurrentTranslation(null);
//                       }}
//                       className={`px-3 py-2 text-sm cursor-pointer ${
//                         currentSection === section
//                           ? "bg-primary-10 text-white"
//                           : "hover:bg-neutral-70 text-neutral-90"
//                       }`}
//                     >
//                       {section}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Subsection Dropdown - shown if we have level2 values */}
//             {currentSection && level2Values.length > 0 && (
//               <div className="relative">
//                 <button
//                   onClick={() => {
//                     setShowSubsectionDropdown(!showSubsectionDropdown);
//                     setShowSectionDropdown(false);
//                     setShowVerseDropdown(false);
//                   }}
//                   className="text-neutral-90 font-semibold text-sm 2xl:text-base flex items-center justify-between w-full p-3 rounded-md bg-neutral-70 border border-neutral-55 hover:bg-neutral-60 transition-colors"
//                 >
//                   <span>{currentSubSection || "Select Subsection"}</span>
//                   <MdOutlineKeyboardArrowDown className="text-2xl" />
//                 </button>

//                 {showSubsectionDropdown && (
//                   <div className="absolute z-10 mt-1 left-0 right-0 bg-white border border-neutral-55 rounded-lg shadow-lg max-h-48 overflow-y-auto">
//                     {level2Values.map((subsection) => (
//                       <div
//                         key={subsection}
//                         onClick={() => {
//                           setCurrentSubSection(subsection);
//                           setShowSubsectionDropdown(false);
//                           setCurrentVerse(null);
//                           setTargetLanguage({
//                             name: "select language",
//                             code: "en",
//                           });
//                           setCurrentTranslation(null);
//                         }}
//                         className={`px-3 py-2 text-sm cursor-pointer ${
//                           currentSubSection === subsection
//                             ? "bg-primary-10 text-white"
//                             : "hover:bg-neutral-70 text-neutral-90"
//                         }`}
//                       >
//                         {subsection}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Verse Dropdown - shown if we have level3 values */}
//             {currentSubSection && level3Values.length > 0 && (
//               <div className="relative">
//                 <button
//                   onClick={() => {
//                     setShowVerseDropdown(!showVerseDropdown);
//                     setShowSectionDropdown(false);
//                     setShowSubsectionDropdown(false);
//                   }}
//                   className="text-neutral-90 font-semibold text-sm 2xl:text-base flex items-center justify-between w-full p-3 rounded-md bg-neutral-70 border border-neutral-55 hover:bg-neutral-60 transition-colors"
//                 >
//                   <span>{currentVerse || "Select Verse"}</span>
//                   <MdOutlineKeyboardArrowDown className="text-2xl" />
//                 </button>

//                 {showVerseDropdown && (
//                   <div className="absolute z-10 mt-1 left-0 right-0 bg-white border border-neutral-55 rounded-lg shadow-lg max-h-48 overflow-y-auto">
//                     {level3Values.map((verse) => (
//                       <div
//                         key={verse}
//                         onClick={() => {
//                           setCurrentVerse(verse);
//                           setShowVerseDropdown(false);
//                           setTargetLanguage({
//                             name: "select language",
//                             code: "en",
//                           });
//                           setCurrentTranslation(null);
//                         }}
//                         className={`px-3 py-2 text-sm cursor-pointer ${
//                           currentVerse === verse
//                             ? "bg-primary-10 text-white"
//                             : "hover:bg-neutral-70 text-neutral-90"
//                         }`}
//                       >
//                         {verse}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="bg-neutral-70 border border-primary-20 shadow-book-filter flex flex-col gap-4 p-3 rounded-2xl mt-4">
//             <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
//               <div className="border border-primary-10/80 size-10 rounded-full flex items-center justify-center p-2">
//                 <img src={ICONS.bookmark} alt="Bookmark" />
//               </div>
//               <p className="text-neutral-90 font-semibold text-sm 2xl:text-base">
//                 Bookmark
//               </p>
//             </button>
//             <button
//               className="flex items-center gap-2 hover:opacity-70 transition-opacity"
//               onClick={() => setShowLanguageModal(true)}
//             >
//               <div className="border border-primary-10/80 size-10 rounded-full flex items-center justify-center p-2">
//                 <img src={ICONS.translate} alt="Translate" />
//               </div>
//               <p className="text-neutral-90 font-semibold text-sm 2xl:text-base">
//                 Translate
//               </p>
//             </button>
//             <button
//               className="flex items-center gap-2 hover:opacity-70 transition-opacity"
//               onClick={() => handleOpenReportModal(verseData)}
//             >
//               <div className="border border-primary-10/80 size-10 rounded-full flex items-center justify-center p-2">
//                 <img src={ICONS.reportIssue} alt="Report Issue" />
//               </div>
//               <p className="text-neutral-90 font-semibold text-sm 2xl:text-base">
//                 Report Issue
//               </p>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Language Modal */}
//       {showLanguageModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="w-full max-w-md rounded-2xl bg-white shadow-xl dark:bg-neutral-900 dark:text-white">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-neutral-700">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Select Translation Language
//               </h2>
//               <button
//                 onClick={() => setShowLanguageModal(false)}
//                 className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-neutral-800"
//               >
//                 <IoCloseOutline
//                   size={24}
//                   className="text-gray-600 dark:text-gray-300"
//                 />
//               </button>
//             </div>

//             {/* Search Field */}
//             <div className="mx-4 mt-3 flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800">
//               <IoSearchOutline
//                 size={16}
//                 className="text-gray-400 dark:text-gray-500"
//               />
//               <input
//                 type="text"
//                 placeholder="Search languages..."
//                 value={languageSearchTerm}
//                 onChange={(e) => setLanguageSearchTerm(e.target.value)}
//                 className="ml-2 w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white"
//               />
//             </div>

//             {/* Language List */}
//             <div className="max-h-80 overflow-y-auto px-4 py-3">
//               {filteredLanguages?.length > 0 ? (
//                 filteredLanguages.map((lang) => (
//                   <button
//                     key={lang.code}
//                     onClick={() => {
//                       setTargetLanguage(lang);
//                       setShowLanguageModal(false);
//                       setLanguageSearchTerm("");
//                       getTranslationByLang(lang.code);
//                     }}
//                     className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
//                       targetLanguage?.code === lang?.code
//                         ? "bg-primary-10 text-white"
//                         : "hover:bg-gray-100 dark:hover:bg-neutral-800"
//                     }`}
//                   >
//                     <span>{lang.name}</span>
//                     <span
//                       className={`text-xs ${
//                         targetLanguage?.code === lang?.code
//                           ? "text-blue-100"
//                           : "text-gray-500 dark:text-gray-400"
//                       }`}
//                     >
//                       ({lang.code})
//                     </span>
//                   </button>
//                 ))
//               ) : (
//                 <p className="px-2 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
//                   No languages found matching "{languageSearchTerm}"
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Report Modal - Uncomment when ReportModal component is available */}
//       {/* {isReportModalOpen && reportingVerse && currentTranslation && vedaId && (
//         <ReportModal
//           isOpen={isReportModalOpen}
//           onClose={handleCloseReportModal}
//           verseId={reportingVerse?._id}
//           bookId={vedaId}
//           originalText={verseData?.originalText}
//           translation={currentTranslation}
//           languageCode={targetLanguage.code}
//         />
//       )} */}
//     </div>
//   );
// };

// export default BookDetails;


/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { IoFlagOutline } from "react-icons/io5";
import { IoLanguageOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Breadcrumb from "../../../../components/Reusable/Breadcrumb/Breadcrumb";
import { ICONS } from "../../../../assets";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useGetSingleBookQuery } from "../../../../redux/Features/Book/bookApi";
import { LANGUAGES as allLanguages } from "../../../../utils/allLanguages";
import { 
  useGetAllBookTextsByBookIdQuery,
  useGetTextByDetailsQuery // <-- Ensure this is exported from your textsApi
} from "../../../../redux/Features/Book/textsApi";

const BookDetails = () => {
  const { id: bookId } = useParams();
  
  // 1. Fetch Book Metadata (Levels)
  const { data: singleBook, isLoading: isVedaLoading } = useGetSingleBookQuery(bookId);
  const book = singleBook?.data;
  const levels = book?.levels || [];

  // 2. Fetch all texts once to build the available dropdown options
  const { data: bookTextsData, isLoading: isTextsLoading } = useGetAllBookTextsByBookIdQuery(bookId);
  
  const allTexts = useMemo(() => {
    if (!bookTextsData?.data) return [];
    const rawData = Array.isArray(bookTextsData.data) ? bookTextsData.data : bookTextsData.data?.data || [];
    return rawData;
  }, [bookTextsData]);

  // 3. UI States for Dropdowns & Modals
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  const [showSubsectionDropdown, setShowSubsectionDropdown] = useState(false);
  const [showVerseDropdown, setShowVerseDropdown] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");
  const [targetLanguage, setTargetLanguage] = useState({ name: "select language", code: "en" });
  const [currentTranslation, setCurrentTranslation] = useState<string | null>(null);

  // 4. Selected Filter States
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [currentSubSection, setCurrentSubSection] = useState<string | null>(null);
  const [currentVerse, setCurrentVerse] = useState<string | null>(null);

  // 5. Build Dynamic Filter Object for API
  const filterLevels = useMemo(() => {
    const filters: Record<string, string> = {};
    // Map over the actual levels from the book structure
    levels.forEach((level: any, index: number) => {
      if (index === 0 && currentSection) filters[level.name] = currentSection;
      if (index === 1 && currentSubSection) filters[level.name] = currentSubSection;
      if (index === 2 && currentVerse) filters[level.name] = currentVerse;
    });
    return filters;
  }, [levels, currentSection, currentSubSection, currentVerse]);

  // 6. Fetch Filtered Text based on selections
  const { data: filteredTextData, isLoading: isFilterLoading, isFetching: isFilterFetching } = useGetTextByDetailsQuery(
    { bookId: bookId!, levels: filterLevels },
    { skip: !bookId || Object.keys(filterLevels).length === 0 }
  );

  // Normalize the API response (can return array or single object depending on your backend)
  const filteredTexts = useMemo(() => {
    if (!filteredTextData?.data) return [];
    return Array.isArray(filteredTextData.data) ? filteredTextData.data : [filteredTextData.data];
  }, [filteredTextData]);

  // 7. Initialize first values when data loads
  useEffect(() => {
    if (allTexts.length > 0 && levels.length > 0 && !currentSection) {
      const firstText = allTexts[0];
      setCurrentSection(firstText.location[0]?.value || null);
      if (levels.length > 1) setCurrentSubSection(firstText.location[1]?.value || null);
      if (levels.length > 2) setCurrentVerse(firstText.location[2]?.value || null);
    }
  }, [allTexts, levels]);

  // 8. Filtered Options for Dropdowns (Derived from allTexts)
  const level1Options = useMemo(() => {
    const vals = new Set(allTexts.map((t: any) => t.location[0]?.value));
    return Array.from(vals).filter(Boolean).sort() as string[];
  }, [allTexts]);

  const level2Options = useMemo(() => {
    if (!currentSection) return [];
    const vals = new Set(
      allTexts
        .filter((t: any) => t.location[0]?.value === currentSection)
        .map((t: any) => t.location[1]?.value)
    );
    return Array.from(vals).filter(Boolean).sort() as string[];
  }, [allTexts, currentSection]);

  const level3Options = useMemo(() => {
    if (!currentSection || !currentSubSection) return [];
    const vals = new Set(
      allTexts
        .filter(
          (t: any) =>
            t.location[0]?.value === currentSection &&
            t.location[1]?.value === currentSubSection
        )
        .map((t: any) => t.location[2]?.value)
    );
    return Array.from(vals).filter(Boolean).sort((a: any, b: any) => Number(a) - Number(b)) as string[];
  }, [allTexts, currentSection, currentSubSection]);

  // 9. Navigation Logic
  const currentVerseIndex = useMemo(() => {
    if (filteredTexts.length !== 1) return -1;
    const currentId = filteredTexts[0]._id;
    return allTexts.findIndex((t: any) => t._id === currentId);
  }, [allTexts, filteredTexts]);

  const navigateVerse = (direction: "next" | "previous") => {
    if (allTexts.length === 0 || currentVerseIndex === -1) return;
    const newIndex = direction === "next" ? currentVerseIndex + 1 : currentVerseIndex - 1;
    
    if (newIndex < 0 || newIndex >= allTexts.length) return;
    const next = allTexts[newIndex];

    setCurrentSection(next.location[0]?.value || null);
    setCurrentSubSection(next.location[1]?.value || null);
    setCurrentVerse(next.location[2]?.value || null);
    resetTranslation();
  };

  const resetTranslation = () => {
    setTargetLanguage({ name: "select language", code: "en" });
    setCurrentTranslation(null);
  };

  // 10. Translation Handling
  const getTranslationByLang = (langCode: string): void => {
    const translationObj = filteredTexts[0]?.translations?.find(
      (t: any) => t.langCode.toLowerCase() === langCode.toLowerCase()
    );
    setCurrentTranslation(translationObj?.translation || "Translation not available");
  };

  const availableLanguageCodes = useMemo<string[]>(() => {
    if (!filteredTexts[0]?.translations) return [];
    return filteredTexts[0].translations.map((t: any) => t.langCode.toLowerCase());
  }, [filteredTexts]);

  const filteredLanguages = useMemo(() => {
    return allLanguages.filter(
      (lang) =>
        availableLanguageCodes.includes(lang.code.toLowerCase()) &&
        lang.name.toLowerCase().includes(languageSearchTerm.toLowerCase())
    );
  }, [availableLanguageCodes, languageSearchTerm]);

  const bookName = book?.name || "Book";
  const isLoading = isVedaLoading || isTextsLoading || isFilterLoading || isFilterFetching;

  const getLevelName = (index: number) => levels[index]?.name || `Level ${index + 1}`;

  return (
    <div className="font-Manrope">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Book", path: "/dashboard/learn-and-explore/book" },
          { label: bookName, path: `/dashboard/learn-and-explore/book/${bookId}` },
        ]}
      />

      <h4 className="text-neutral-90 font-bold text-xl mt-8">{bookName}</h4>
      
      <div className="flex gap-10 mt-3">
        {/* --- LEFT PANEL: VERSE DISPLAY --- */}
        <div className="w-[70%]">
          {isLoading ? (
            <div className="bg-white border border-neutral-55 p-4 rounded-2xl flex items-center justify-center min-h-50">
              <p className="text-neutral-50">Loading...</p>
            </div>
          ) : filteredTexts.length === 1 ? (
            // SINGLE VERSE VIEW
            <>
              <div className="bg-white border border-neutral-55 p-4 rounded-2xl">
                {/* Original Text */}
                {filteredTexts[0].originalText && (
                  <div className="text-center">
                    {filteredTexts[0].originalText.split("\n").map((line: string, index: number) => (
                      <p key={index} className="text-xl text-[#2D3748] leading-relaxed mb-2 font-serif">
                        {line}
                      </p>
                    ))}
                  </div>
                )}

                {/* Translation Controls */}
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-neutral-55">
                  <button
                    className="flex items-center gap-2 bg-primary-10 text-white px-4 py-2 rounded-full hover:bg-primary-10/90 transition-colors"
                    onClick={() => setShowLanguageModal(true)}
                  >
                    <IoLanguageOutline size={18} />
                    <span className="text-white text-sm font-medium">to: {targetLanguage.name}</span>
                  </button>
                  <button className="p-2 bg-red-500/10 hover:bg-red-50 rounded-full transition-colors">
                    <IoFlagOutline size={18} className="text-red-500" />
                  </button>
                </div>

                {/* Translation Result */}
                {currentTranslation && (
                  <div className="mt-6 pt-6 border-t border-neutral-55">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-neutral-50">Translation</span>
                    </div>
                    <p className="leading-relaxed text-[#2D3748] whitespace-pre-wrap">
                      {currentTranslation}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-55 transition-all ${
                    currentVerseIndex <= 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-10 hover:text-white"
                  }`}
                  onClick={() => navigateVerse("previous")}
                  disabled={currentVerseIndex <= 0}
                >
                  <IoChevronBackOutline /> Previous
                </button>
                <span className="text-sm font-semibold text-neutral-90 text-center">
                  {filteredTexts[0].location.map((l: any) => l.value).join(".")}
                </span>
                <button
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all ${
                    currentVerseIndex >= allTexts.length - 1 
                      ? "opacity-50 cursor-not-allowed bg-neutral-55" 
                      : "bg-primary-10 text-white hover:bg-primary-10/90"
                  }`}
                  onClick={() => navigateVerse("next")}
                  disabled={currentVerseIndex >= allTexts.length - 1}
                >
                  Next <IoChevronForwardOutline />
                </button>
              </div>
            </>
          ) : filteredTexts.length > 1 ? (
            // MULTIPLE VERSES LIST VIEW (User didn't filter deep enough)
            <div className="bg-white border border-neutral-55 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-4 text-neutral-90">Select a specific verse</h3>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {filteredTexts.map((text: any) => (
                  <div 
                    key={text._id}
                    onClick={() => {
                      // Auto-fill dropdowns to this specific verse
                      setCurrentSection(text.location[0]?.value);
                      setCurrentSubSection(text.location[1]?.value);
                      setCurrentVerse(text.location[2]?.value);
                    }}
                    className="p-4 border border-neutral-55 rounded-xl hover:border-primary-10 cursor-pointer transition-colors bg-neutral-70/50 hover:bg-neutral-70"
                  >
                    <div className="font-semibold text-primary-10 mb-2">
                      {text.location.map((l: any) => l.value).join(".")}
                    </div>
                    <p className="text-neutral-90 line-clamp-2 font-serif">{text.originalText}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-neutral-55 p-4 rounded-2xl flex flex-col items-center justify-center min-h-50">
              <IoBookOutline size={48} className="text-neutral-40" />
              <p className="text-center mt-4 text-lg text-neutral-50">No text found for this selection.</p>
            </div>
          )}
        </div>

        {/* --- RIGHT PANEL: FILTERS --- */}
        <div className="w-[30%]">
          <div className="bg-white border border-neutral-55 p-3 rounded-2xl flex flex-col gap-2">
            
            {/* Level 1 */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSectionDropdown(!showSectionDropdown);
                  setShowSubsectionDropdown(false);
                  setShowVerseDropdown(false);
                }}
                className="text-neutral-90 font-semibold flex items-center justify-between w-full p-3 rounded-md bg-neutral-70 border border-neutral-55 hover:bg-neutral-60"
              >
                <span>{getLevelName(0)}: {currentSection || "Select"}</span>
                <MdOutlineKeyboardArrowDown className="text-2xl" />
              </button>
              {showSectionDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-55 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {level1Options.map((val) => (
                    <div
                      key={val}
                      onClick={() => {
                        setCurrentSection(val);
                        setCurrentSubSection(null);
                        setCurrentVerse(null);
                        setShowSectionDropdown(false);
                        resetTranslation();
                      }}
                      className={`px-3 py-2 text-sm cursor-pointer ${currentSection === val ? "bg-primary-10 text-white" : "hover:bg-neutral-70"}`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Level 2 */}
            {levels.length > 1 && currentSection && (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSubsectionDropdown(!showSubsectionDropdown);
                    setShowSectionDropdown(false);
                    setShowVerseDropdown(false);
                  }}
                  className="text-neutral-90 font-semibold flex items-center justify-between w-full p-3 rounded-md bg-neutral-70 border border-neutral-55 hover:bg-neutral-60"
                >
                  <span>{getLevelName(1)}: {currentSubSection || "Select"}</span>
                  <MdOutlineKeyboardArrowDown className="text-2xl" />
                </button>
                {showSubsectionDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-55 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {level2Options.map((val) => (
                      <div
                        key={val}
                        onClick={() => {
                          setCurrentSubSection(val);
                          setCurrentVerse(null);
                          setShowSubsectionDropdown(false);
                          resetTranslation();
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer ${currentSubSection === val ? "bg-primary-10 text-white" : "hover:bg-neutral-70"}`}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Level 3 */}
            {levels.length > 2 && currentSubSection && (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowVerseDropdown(!showVerseDropdown);
                    setShowSectionDropdown(false);
                    setShowSubsectionDropdown(false);
                  }}
                  className="text-neutral-90 font-semibold flex items-center justify-between w-full p-3 rounded-md bg-neutral-70 border border-neutral-55 hover:bg-neutral-60"
                >
                  <span>{getLevelName(2)}: {currentVerse || "Select"}</span>
                  <MdOutlineKeyboardArrowDown className="text-2xl" />
                </button>
                {showVerseDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-55 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {level3Options.map((val) => (
                      <div
                        key={val}
                        onClick={() => {
                          setCurrentVerse(val);
                          setShowVerseDropdown(false);
                          resetTranslation();
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer ${currentVerse === val ? "bg-primary-10 text-white" : "hover:bg-neutral-70"}`}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-neutral-70 border border-primary-20 flex flex-col gap-4 p-3 rounded-2xl mt-4">
            <button className="flex items-center gap-2 hover:opacity-70">
              <div className="border border-primary-10/80 size-10 rounded-full flex items-center justify-center p-2">
                <img src={ICONS.bookmark} alt="Bookmark" />
              </div>
              <p className="text-neutral-90 font-semibold">Bookmark</p>
            </button>
            <button className="flex items-center gap-2 hover:opacity-70" onClick={() => setShowLanguageModal(true)}>
              <div className="border border-primary-10/80 size-10 rounded-full flex items-center justify-center p-2">
                <img src={ICONS.translate} alt="Translate" />
              </div>
              <p className="text-neutral-90 font-semibold">Translate</p>
            </button>
          </div>
        </div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="text-lg font-semibold">Select Translation Language</h2>
              <button onClick={() => setShowLanguageModal(false)}>
                <IoCloseOutline size={24} />
              </button>
            </div>
            <div className="mx-4 mt-3 flex items-center rounded-lg border bg-gray-50 px-3 py-2">
              <IoSearchOutline size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search languages..."
                value={languageSearchTerm}
                onChange={(e) => setLanguageSearchTerm(e.target.value)}
                className="ml-2 w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
            <div className="max-h-80 overflow-y-auto px-4 py-3">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setTargetLanguage(lang);
                      setShowLanguageModal(false);
                      setLanguageSearchTerm("");
                      getTranslationByLang(lang.code);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                      targetLanguage?.code === lang?.code ? "bg-primary-10 text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-xs opacity-70">({lang.code})</span>
                  </button>
                ))
              ) : (
                <p className="px-2 py-3 text-center text-sm text-gray-500">No languages found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;