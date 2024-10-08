import React from 'react';

interface DefinitionSlideProps {
  term: string;
  definition: string;
  icon?: string;
}

const DefinitionSlide: React.FC<DefinitionSlideProps> = ({ term, definition, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-800 p-8">
      {icon && (
        <img src={icon} alt="Term Icon" className="mb-6 w-16 h-16 object-contain" />
      )}
      <h3 className="text-4xl font-bold mb-4">{term}</h3>
      <p className="text-xl max-w-2xl text-center">{definition}</p>
    </div>
  );
};

export default DefinitionSlide;