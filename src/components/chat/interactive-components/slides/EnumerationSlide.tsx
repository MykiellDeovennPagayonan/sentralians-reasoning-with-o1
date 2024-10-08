import React from 'react';

interface EnumerationSlideProps {
  title: string;
  bullets: string[];
}

const EnumerationSlide: React.FC<EnumerationSlideProps> = ({ title, bullets }) => {
  return (
    <div className="flex flex-col items-start justify-center h-full bg-white text-gray-800 p-8">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <ul className="space-y-4">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start">
            <span className="text-base">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnumerationSlide;