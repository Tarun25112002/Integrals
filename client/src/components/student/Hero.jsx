import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const goals = [
  "Your Goals.",
  "Your Career.",
  "Your Success.",
  "Your Dreams.",
  "Your Future.",
  "Your Growth.",
];

const Hero = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const [displayedText, setDisplayedText] = useState("");
  const timeoutRef = useRef(null);
  const currentTextIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const textElement = textRef.current;
    const cursorElement = cursorRef.current;
    if (!textElement || !cursorElement) return;

    gsap.set(cursorElement, { opacity: 1 });
    
    const cursorAnimation = gsap.to(cursorElement, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    const typeText = () => {
      const currentGoal = goals[currentTextIndexRef.current];
      const typingSpeed = 100;
      const deletingSpeed = 50;
      const pauseAfterTyping = 2000;
      const pauseAfterDeleting = 500;

      if (!isDeletingRef.current && currentIndexRef.current < currentGoal.length) {
        setDisplayedText(currentGoal.substring(0, currentIndexRef.current + 1));
        currentIndexRef.current++;
        timeoutRef.current = setTimeout(typeText, typingSpeed);
      } else if (isDeletingRef.current && currentIndexRef.current > 0) {
        setDisplayedText(currentGoal.substring(0, currentIndexRef.current - 1));
        currentIndexRef.current--;
        timeoutRef.current = setTimeout(typeText, deletingSpeed);
      } else if (!isDeletingRef.current && currentIndexRef.current === currentGoal.length) {
        isDeletingRef.current = true;
        timeoutRef.current = setTimeout(typeText, pauseAfterTyping);
      } else if (isDeletingRef.current && currentIndexRef.current === 0) {
        isDeletingRef.current = false;
        currentTextIndexRef.current = (currentTextIndexRef.current + 1) % goals.length;
        timeoutRef.current = setTimeout(typeText, pauseAfterDeleting);
      }
    };

    timeoutRef.current = setTimeout(() => {
      typeText();
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      cursorAnimation.kill();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">
      <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto">
        Integrate your skills with our online courses tailored to <br />
        <span className="text-blue-600 inline-block min-w-[200px]">
          <span ref={textRef}>{displayedText}</span>
          <span
            ref={cursorRef}
            className="inline-block w-0.5 h-[1em] bg-blue-600 ml-1 align-middle"
          ></span>
        </span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>

      <p className="md:block hidden text-gray-500 max-2-2xl mx-auto">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>
      <p className="md:hidden text-gray-500 max-w-sm mx-auto">
        We bring together world-class instructors to help you achieve your
        professional goals .
      </p>
      <SearchBar />
    </div>
  );
};

export default Hero;
