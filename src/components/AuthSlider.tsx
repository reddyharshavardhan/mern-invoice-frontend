import { useState, useEffect } from "react";

const sliderImages = [
  { src: "/img1.png", alt: "Connecting People With Technology - 1" },
  { src: "/img2.png", alt: "Levitation Billboard - 2" },
];

export function AuthSlider() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % sliderImages.length),
      3500
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setFade(false);
    const tid = setTimeout(() => setFade(true), 350);
    return () => clearTimeout(tid);
  }, [index]);

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
      <img
        src={sliderImages[index].src}
        alt={sliderImages[index].alt}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}