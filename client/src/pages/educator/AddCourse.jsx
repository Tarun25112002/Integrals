import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const AddCourse = () => {
  const { backendUrl , getToken} = useContext(AppContext);
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write course description here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addChapter = () => {
    const newChapter = {
      id: uniqid(),
      chapterTitle: "",
      lectures: [],
    };
    setChapters([...chapters, newChapter]);
  };

  const updateChapterTitle = (id, title) => {
    setChapters(
      chapters.map((ch) => (ch.id === id ? { ...ch, chapterTitle: title } : ch))
    );
  };

  const deleteChapter = (id) => {
    setChapters(chapters.filter((ch) => ch.id !== id));
  };

  const openLecturePopup = (chapterId) => {
    setCurrentChapterId(chapterId);
    setShowPopup(true);
  };

  const closeLecturePopup = () => {
    setShowPopup(false);
    setCurrentChapterId(null);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const addLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureUrl) {
      alert("Please fill in all lecture details");
      return;
    }

    const newLecture = {
      id: uniqid(),
      ...lectureDetails,
    };

    setChapters(
      chapters.map((ch) =>
        ch.id === currentChapterId
          ? { ...ch, lectures: [...ch.lectures, newLecture] }
          : ch
      )
    );
    closeLecturePopup();
  };

  const deleteLecture = (chapterId, lectureId) => {
    setChapters(
      chapters.map((ch) =>
        ch.id === chapterId
          ? { ...ch, lectures: ch.lectures.filter((l) => l.id !== lectureId) }
          : ch
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseTitle || !coursePrice || !image || chapters.length === 0) {
      toast.error("Please fill in all required fields and add at least one chapter");
      return;
    }

    // Transform local state to server schema
    const courseContent = chapters.map((ch, chIdx) => ({
      chapterId: ch.id,
      chapterOrder: chIdx + 1,
      chapterTitle: ch.chapterTitle,
      chapterContent: (ch.lectures || []).map((l, lIdx) => ({
        lectureId: l.id,
        lectureTitle: l.lectureTitle,
        lectureDuration: Number(l.lectureDuration) || 0,
        lectureUrl: l.lectureUrl,
        isPreviewFree: Boolean(l.isPreviewFree),
        lectureOrder: lIdx + 1,
      })),
    }));

    if (
      courseContent.length === 0 ||
      courseContent.some((ch) => (ch.chapterContent || []).length === 0)
    ) {
      toast.error("Please add at least one lecture to each chapter");
      return;
    }

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("image", image);
      formData.append(
        "courseData",
        JSON.stringify({
          courseTitle,
          courseDescription: quillRef.current?.root?.innerHTML || "",
          coursePrice: Number(coursePrice),
          discount: Number(discount) || 0,
          courseContent,
        })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/educator/add-course`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Course created successfully!");
        navigate("/educator/my-courses");
      } else {
        toast.error(data.message || "Failed to create course");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-8">
      
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Create New Course
        </h1>
        <p className="text-sm text-gray-500">
          Fill in the details to create your course
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter course title"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description *
              </label>
              <div
                ref={editorRef}
                className="bg-white border border-gray-300 rounded-lg min-h-[200px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select category</option>
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount (%)
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="0"
                  min="0"
                  max="100"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Thumbnail *
              </label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-24 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="thumbnailImage"
                    className="flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <img
                      src={assets.file_upload_icon}
                      alt="Upload"
                      className="w-8 h-8 mb-1"
                    />
                    <span className="text-xs text-gray-500">Upload</span>
                  </label>
                )}
                <input
                  type="file"
                  id="thumbnailImage"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Course Content
            </h2>
            <button
              type="button"
              onClick={addChapter}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              + Add Chapter
            </button>
          </div>

          {chapters.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No chapters added yet. Click "Add Chapter" to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {chapters.map((chapter, chIndex) => (
                <div
                  key={chapter.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-gray-500">
                      Chapter {chIndex + 1}
                    </span>
                    <input
                      type="text"
                      value={chapter.chapterTitle}
                      onChange={(e) =>
                        updateChapterTitle(chapter.id, e.target.value)
                      }
                      placeholder="Chapter title"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => openLecturePopup(chapter.id)}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                    >
                      + Lecture
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteChapter(chapter.id)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                  {chapter.lectures.length > 0 && (
                    <div className="ml-6 space-y-2">
                      {chapter.lectures.map((lecture, lIndex) => (
                        <div
                          key={lecture.id}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {lIndex + 1}. {lecture.lectureTitle}
                            </p>
                            <p className="text-xs text-gray-500">
                              Duration: {lecture.lectureDuration} min
                              {lecture.isPreviewFree && (
                                <span className="ml-2 text-green-600">
                                  • Free Preview
                                </span>
                              )}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              deleteLecture(chapter.id, lecture.id)
                            }
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

       
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/educator/my-courses")}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Create Course
          </button>
        </div>
      </form>

      
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Lecture
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lecture Title
                </label>
                <input
                  type="text"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureTitle: e.target.value,
                    })
                  }
                  placeholder="Enter lecture title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureDuration: e.target.value,
                    })
                  }
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureUrl: e.target.value,
                    })
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="previewFree"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      isPreviewFree: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="previewFree"
                  className="ml-2 text-sm text-gray-700"
                >
                  Free preview
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={closeLecturePopup}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addLecture}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Lecture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
