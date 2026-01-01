import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "@clerk/clerk-react";

const TranscriptionManager = ({ courseId, courseContent, onClose }) => {
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { backendUrl } = useContext(AppContext);
  const { getToken } = useAuth();

  const handleLectureSelect = async (chapter, lecture) => {
    setSelectedLecture({
      lectureId: lecture.lectureId,
      lectureTitle: lecture.lectureTitle,
      chapterTitle: chapter.chapterTitle,
    });

    // Fetch existing transcription if any
    setIsFetching(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/chatbot/transcription/${courseId}/${lecture.lectureId}`
      );
      if (data.success && data.exists) {
        setTranscription(data.transcription.content);
      } else {
        setTranscription("");
      }
    } catch (error) {
      console.error("Error fetching transcription:", error);
      setTranscription("");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSave = async () => {
    if (!selectedLecture || !transcription.trim()) {
      toast.error("Please select a lecture and enter transcription");
      return;
    }

    setIsLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/chatbot/transcription`,
        {
          courseId,
          lectureId: selectedLecture.lectureId,
          content: transcription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Transcription saved successfully!");
      } else {
        toast.error(data.message || "Failed to save transcription");
      }
    } catch (error) {
      console.error("Error saving transcription:", error);
      toast.error("Failed to save transcription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Manage Video Transcriptions</h2>
            <p className="text-sm text-blue-100">
              Add transcriptions to enable AI-powered Q&A for your videos
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Lecture List */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-700 mb-3">
                Select a Lecture
              </h3>
              {courseContent?.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    {chapter.chapterTitle}
                  </h4>
                  <div className="space-y-1">
                    {chapter.chapterContent?.map((lecture, lectureIndex) => (
                      <button
                        key={lectureIndex}
                        onClick={() => handleLectureSelect(chapter, lecture)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedLecture?.lectureId === lecture.lectureId
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {lecture.lectureTitle}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transcription Editor */}
          <div className="flex-1 flex flex-col p-4">
            {selectedLecture ? (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800">
                    {selectedLecture.lectureTitle}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedLecture.chapterTitle}
                  </p>
                </div>

                {isFetching ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={transcription}
                      onChange={(e) => setTranscription(e.target.value)}
                      placeholder="Paste or type the video transcription here. This will be used by the AI chatbot to answer student questions about the video content..."
                      className="flex-1 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        {transcription.split(/\s+/).filter(Boolean).length}{" "}
                        words
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setTranscription("")}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Clear
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isLoading || !transcription.trim()}
                          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Save Transcription
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p>Select a lecture to add or edit its transcription</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border-t border-blue-100 p-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">
            💡 Tips for better AI responses:
          </h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>
              • Include timestamps if available (e.g., [00:05] Introduction)
            </li>
            <li>• Ensure technical terms are spelled correctly</li>
            <li>
              • Include any code snippets or formulas mentioned in the video
            </li>
            <li>
              • The more detailed the transcription, the better the AI can help
              students
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionManager;
