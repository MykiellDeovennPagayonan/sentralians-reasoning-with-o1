"use client";

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mic, Volume2 } from 'lucide-react';
import { textToSpeech } from '@/components/speech/TextToSpeech';

interface Spelling {
  word: string;
  definition: string;
  examples: string[]; // Change to an array of strings
}

interface SpellingProps {
  spellings: Spelling[];
}

const Spelling: React.FC<SpellingProps> = ({ spellings }) => {
  const [audioMap, setAudioMap] = useState<{ [key: string]: string }>({});
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currAnswer, setCurrAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const speakText = (text: string) => {
    textToSpeech(text, audioMap, setAudioMap, setIsSpeaking, currentAudioRef);
  };

  const speakWord = () => {
    const wordToSpeak = spellings[currentQuestion].word;
    speakText(wordToSpeak);
  };

  const speakDefinition = () => {
    const definitionToSpeak = spellings[currentQuestion].definition;
    speakText(definitionToSpeak);
  };

  const speakExample = (example: string) => {
    speakText(example); // Speak the specific example passed as an argument
  };

  const handleAnswerClick = () => {
    const correctAnswer = spellings[currentQuestion].word.toLowerCase();
    const isCorrect = currAnswer.toLowerCase() === correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextSpellingQuestion = currentQuestion + 1;
    if (nextSpellingQuestion < spellings.length) {
      setCurrentQuestion(nextSpellingQuestion);
      setCurrAnswer("");
    } else {
      setShowScore(true);
    }
  };

  const handleRedo = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const progress = ((currentQuestion + 1) / spellings.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-100 to-blue-50">
      <div className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-xl transition-all duration-300">
        <div className="w-full bg-gray-300 rounded-full h-3 mb-6 shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {showScore ? (
          <div className="text-center">
            <p className="text-2xl font-bold mb-4 text-gray-800">
              Congratulations! You scored {score} out of {spellings.length}
            </p>
            <Button 
              onClick={handleRedo}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Redo Spelling
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="flex flex-col md:flex-row w-full md:gap-6 mt-5 items-center justify-center">
                <div className='flex flex-col items-center justify-center text-center w-full md:w-2/3'>
                  <div className="relative flex flex-col items-center mb-4">
                    <p className="text-sm font-medium text-blue-500 mb-2">
                      Press the speaker icon to start the spelling word.
                    </p>
                    <div
                      className={`flex justify-center items-center w-20 h-20 rounded-full transition-all duration-300 ${isSpeaking ? 'bg-blue-300 animate-pulse shadow-lg' : 'bg-gray-300'}`}
                    >
                      <Volume2 
                        onClick={speakWord} 
                        className={`text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300`} 
                        size={32}
                      />
                    </div>
                    {isSpeaking && (
                      <p className="absolute -top-8 text-blue-500 text-sm font-medium">Speaking...</p>
                    )}
                    <div className='flex flex-col space-y-4 items-center w-full'>
                      <h3 className="text-lg mt-4 font-semibold text-gray-800 text-center">
                        {spellings[currentQuestion].definition}
                      </h3>
                      <Mic 
                        onClick={speakDefinition} 
                        className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-300" 
                        size={32}
                      />
                    </div>
                  </div>
                </div>
                
                <div className='flex flex-col space-y-4 items-center justify-center w-full md:w-1/3 text-center'>
                  {spellings[currentQuestion].examples.map((example, index) => (
                    <Button 
                      key={index}
                      onClick={() => speakExample(example)} // Speak the specific example when clicked
                      className='w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300'>{`Example ${index + 1}`}</Button>
                  ))}
                </div>
              </div>

              <div className='flex flex-col space-y-4 mt-6 w-full'>
                <Input 
                  className='w-full py-3 border-2 border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-400 transition-all duration-300' 
                  placeholder='Input your answer' 
                  value={currAnswer} 
                  onChange={(e) => setCurrAnswer(e.target.value)} 
                />
                <Button 
                  className='w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300'
                  onClick={handleAnswerClick}
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Spelling;
