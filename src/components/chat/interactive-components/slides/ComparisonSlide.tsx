import React from 'react';

interface ComparisonItem {
  header: string;
  points: string[];
}

interface ComparisonSlideProps {
  title: string;
  comparisonItems: ComparisonItem[];
}

const ComparisonSlide: React.FC<ComparisonSlideProps> = ({ title, comparisonItems }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-white">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex flex-row justify-center w-full max-w-5xl space-x-2">
        {comparisonItems.map((item, index) => (
          <div key={index} className="flex-1 bg-gray-50 p-2 m-auto h-full rounded-lg shadow-md">
            <h3 className="text-base font-semibold mb-4">{item.header}</h3>
            <ul className="space-y-2">
              {item.points.map((point, idx) => (
                <li key={idx} className="flex items-center text-xs">
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonSlide;