import React from 'react';

interface EnumerationSlideProps {
  title: string;
  bullets: string[];
  icons?: string[];
}

const EnumerationSlide: React.FC<EnumerationSlideProps> = ({ title, bullets, icons }) => {
  return (
    <div className="flex flex-col items-start justify-center h-screen bg-white text-gray-800 p-8">
      <h2 className="text-3xl font-semibold mb-6">{title}</h2>
      <ul className="space-y-4">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start">
            {icons && icons[index] && (
              <img src={icons[index]} alt={`Icon ${index + 1}`} className="w-6 h-6 mr-4 mt-1" />
            )}
            <span className="text-lg">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnumerationSlide;