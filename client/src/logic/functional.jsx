import { useState, useRef, useEffect } from "react";
import { useQuizzes } from '../features/quizzes/quiz.context.jsx';
import { Link } from "react-router";
import moreIcon from "../assets/more-icon.svg";



function MoreIconClickHandler({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { deleteQuiz } = useQuizzes();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Іконка */}
      <img
        src={moreIcon}
        alt="More"
        className="w-6 h-6 cursor-pointer hover:opacity-70"
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {/* Меню */}
      {isOpen && (
        <div className="absolute right-0 top-8 w-32 bg-white rounded-md shadow-lg border z-20">
          <Link
            to={`/edit/${id}`}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Edit
          </Link>

          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            onClick={() => {
              deleteQuiz(id);
              console.log("Delete quiz:", id);
              setIsOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default MoreIconClickHandler;
