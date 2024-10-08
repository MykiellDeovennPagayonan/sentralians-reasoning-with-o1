import React from 'react';

interface ParagraphSlideProps {
  paragraph: string;
}

const ParagraphSlide: React.FC<ParagraphSlideProps> = ({ paragraph }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-800 p-8">
      <p className="text-base max-w-2xl text-center">{paragraph}</p>
    </div>
  );
};

export default ParagraphSlide;