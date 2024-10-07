import React, { useState } from "react";
import HeaderSubheaderSlide from "./slides/HeaderSubheaderSlide";
import EnumerationSlide from "./slides/EnumerationSlide";
import DefinitionSlide from "./slides/DefinitionSlide";
import ParagraphSlide from "./slides/ParagraphSlide";
import ComparisonSlide from "./slides/ComparisonSlide";
import { Slide } from "@/lib/slidesTypes";

const sampleSlides: Slide[] = [
  {
    type: "Header & Subheader Slide",
    title: "Welcome to Our Presentation",
    subtitle: "An overview of our Q3 achievements",
    logo: "/logo.png",
  },
  {
    type: "Enumeration Slide",
    title: "Key Highlights",
    bullets: ["Increased Revenue by 20%", "Expanded to 3 new markets", "Launched 5 new products"],
    icons: ["/icons/revenue.png", "/icons/market.png", "/icons/product.png"],
  },
  {
    type: "Definition Slide",
    term: "Scalability",
    definition: "The ability of a system to handle a growing amount of work by adding resources.",
    icon: "/icons/scalability.png",
  },
  {
    type: "Paragraph Slide",
    title: "Our Mission",
    paragraph:
      "Our mission is to deliver high-quality products that create value for our customers and stakeholders. We strive for excellence in every aspect of our business.",
    backgroundImage: "/backgrounds/mission.jpg", // Replace with your image path
  },
  {
    type: "Comparison Slide",
    title: "Product Comparison",
    comparisonItems: [
      {
        header: "Product A",
        points: ["Feature 1", "Feature 2", "Feature 3"],
        icon: "/icons/productA.png",
      },
      {
        header: "Product B",
        points: ["Feature 4", "Feature 5", "Feature 6"],
        icon: "/icons/productB.png",
      },
    ],
  },
];

const PptSlides: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = sampleSlides.length;

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const handleBack = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const renderSlide = (slide: Slide) => {
    switch (slide.type) {
      case "Header & Subheader Slide":
        return (
          <HeaderSubheaderSlide
            title={slide.title}
            subtitle={slide.subtitle}
            logo={slide.logo}
          />
        );
      case "Enumeration Slide":
        return (
          <EnumerationSlide
            title={slide.title}
            bullets={slide.bullets}
            icons={slide.icons}
          />
        );
      case "Definition Slide":
        return (
          <DefinitionSlide
            term={slide.term}
            definition={slide.definition}
            icon={slide.icon}
          />
        );
      case "Paragraph Slide":
        return (
          <ParagraphSlide
            title={slide.title}
            paragraph={slide.paragraph}
            backgroundImage={slide.backgroundImage}
          />
        );
      case "Comparison Slide":
        return (
          <ComparisonSlide
            title={slide.title}
            comparisonItems={slide.comparisonItems}
          />
        );
      default:
        return <div>Unsupported slide type</div>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden h-5/6">
        {renderSlide(sampleSlides[currentSlide])}
      </div>
      <div className="flex mt-4 space-x-4">
        <button
          onClick={handleBack}
          disabled={currentSlide === 0}
          className={`px-4 py-2 rounded ${
            currentSlide === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentSlide === totalSlides - 1}
          className={`px-4 py-2 rounded ${
            currentSlide === totalSlides - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Slide {currentSlide + 1} of {totalSlides}
      </div>
    </div>
  );
};

export default PptSlides;