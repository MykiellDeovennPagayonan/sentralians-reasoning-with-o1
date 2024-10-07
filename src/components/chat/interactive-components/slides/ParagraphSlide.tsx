import React from 'react';

interface ParagraphSlideProps {
  title: string;
  paragraph: string;
  backgroundImage?: string;
}

const ParagraphSlide: React.FC<ParagraphSlideProps> = ({ title, paragraph, backgroundImage }) => {
  return (
    <div
      className={`w-full h-screen flex flex-col justify-center items-center p-8 ${
        backgroundImage ? 'bg-cover bg-center' : 'bg-white'
      }`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-lg text-gray-700">{paragraph}</p>
      </div>
    </div>
  );
};

export default ParagraphSlide;