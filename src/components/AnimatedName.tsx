import { useState, useEffect } from "react";

export default function AnimatedName() {
  const name = "Syed Hassan";
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 120;

    const timer = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? name.substring(0, prev.length - 1)
          : name.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === name) {
        setTimeout(() => setIsDeleting(true), 1500); // pause before deleting
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <h1 className="text-4xl sm:text-5xl font-black leading-tight">
      Hi, I’m <span className="gradient-text">{text}</span>
    </h1>
  );
}
