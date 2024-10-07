import React from 'react';

interface HeaderSubheaderSlideProps {
  title: string;
  subtitle: string;
  logo?: string;
}

const HeaderSubheaderSlide: React.FC<HeaderSubheaderSlideProps> = ({ title, subtitle, logo }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
      {logo && (
        <img src={logo} alt="Logo" className="mb-6 w-20 h-20 object-contain" />
      )}
      <h1 className="text-5xl font-bold mb-4 text-center">{title}</h1>
      <p className="text-xl text-center max-w-2xl">{subtitle}</p>
    </div>
  );
};

export default HeaderSubheaderSlide;