import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface ComparisonItem {
  header: string;
  points: string[];
  icon?: string;
}

interface ComparisonSlideProps {
  title: string;
  comparisonItems: ComparisonItem[];
}

const ComparisonSlide: React.FC<ComparisonSlideProps> = ({ title, comparisonItems }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-8 bg-white">
      <h2 className="text-3xl font-bold mb-8">{title}</h2>
      <div className="flex flex-col md:flex-row justify-center items-start w-full max-w-5xl space-y-8 md:space-y-0 md:space-x-8">
        {comparisonItems.map((item, index) => (
          <div key={index} className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md">
            {item.icon && (
              <img src={item.icon} alt={`${item.header} icon`} className="w-12 h-12 mb-4" />
            )}
            <h3 className="text-2xl font-semibold mb-4">{item.header}</h3>
            <ul className="space-y-2">
              {item.points.map((point, idx) => (
                <li key={idx} className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
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