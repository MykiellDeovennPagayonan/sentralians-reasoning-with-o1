"use client"

import React, { useState, useRef } from "react";
import HeaderSubheaderSlide from "./slides/HeaderSubheaderSlide";
import EnumerationSlide from "./slides/EnumerationSlide";
import DefinitionSlide from "./slides/DefinitionSlide";
import ParagraphSlide from "./slides/ParagraphSlide";
import ComparisonSlide from "./slides/ComparisonSlide";
import { Slide } from "@/lib/slidesTypes";

interface PptSlidesProps {
  slides: Slide[];
}

const PptSlides: React.FC<PptSlidesProps> = ({slides}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  const slideRef = useRef<HTMLDivElement>(null);

  console.log(slides)

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const handleBack = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const onSlideClick = (event: React.MouseEvent) => {
    if (!slideRef.current) return;

    const { left, width } = slideRef.current.getBoundingClientRect();
    const clickX = event.clientX - left;

    if (clickX < width / 2) {
      handleBack();
    } else {
      handleNext();
    }
  };

  const renderSlide = (slide: Slide) => {
    console.log(slide.type)
    switch (slide.type) {
      case "Header & Subheader Slide":
        return (
          <HeaderSubheaderSlide
            title={slide.content.title}
            subtitle={slide.content.subtitle}
          />
        );
      case "Enumeration Slide":
        return (
          <EnumerationSlide
            title={slide.content.title}
            bullets={slide.content.bullets}
          />
        );
      case "Definition Slide":
        return (
          <DefinitionSlide
            term={slide.content.term}
            definition={slide.content.definition}
          />
        );
      case "Paragraph Slide":
        return <ParagraphSlide paragraph={slide.content.paragraph} />;
      case "Comparison Slide":
        return (
          <ComparisonSlide
            title={slide.content.title}
            comparisonItems={slide.content.comparisonItems}
          />
        );
      default:
        return <div>Unsupported slide type</div>;
    }
  };

  return (
    <div className="flex flex-col flex-grow items-center w-[250px] sm:w-[450px] md:w-[550px] justify-center">
      <div
        className="relative w-full h-full cursor-pointer"
        style={{ paddingBottom: "56.25%" }}
        onClick={onSlideClick}
        ref={slideRef}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
          {renderSlide(slides[currentSlide])}
        </div>
      </div>
    </div>
  );
};

export default PptSlides;