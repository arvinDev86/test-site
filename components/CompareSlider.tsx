import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CompareSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const CompareSlider: React.FC<CompareSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    // Clamp the position between 0 and the container width
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  // Add listeners to the window to handle dragging outside the component
  useEffect(() => {
    const handleMouseUpWindow = () => setIsDragging(false);
    const handleTouchEndWindow = () => setIsDragging(false);
    
    window.addEventListener('mouseup', handleMouseUpWindow);
    window.addEventListener('touchend', handleTouchEndWindow);
    return () => {
      window.removeEventListener('mouseup', handleMouseUpWindow);
      window.removeEventListener('touchend', handleTouchEndWindow);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-700 shadow-2xl shadow-violet-900/20"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image (Bottom Layer) */}
      <img
        src={beforeImage}
        alt="Before"
        className="w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-md">قبل</div>

      {/* After Image (Top Layer) */}
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-md">بعد</div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 h-full w-1 bg-violet-500 cursor-ew-resize pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center shadow-lg">
          <ChevronLeft size={20} className="text-white" />
          <ChevronRight size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
};
