"use client";

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Flashcard {
  term: string;
  definition: string;
}

interface FlashcardProps {
  flashcards: Flashcard[];
}

const Flashcards: React.FC<FlashcardProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const mockFlashcards: Flashcard[] = [
    {
      term: "What is React?",
      definition: "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update and render them when data changes."
    },
    {
      term: "What is JSX?",
      definition: "JSX is a syntax extension for JavaScript used with React. It allows you to write HTML-like code in your JavaScript files, making it easier to describe what the UI should look like."
    },
    {
      term: "What is a React component?",
      definition: "A React component is a reusable piece of UI that can be a function or a class. It returns a React element that describes what should appear on the screen."
    },
    {
      term: "What is the virtual DOM?",
      definition: "The virtual DOM is a lightweight copy of the actual DOM in memory. React uses it to improve performance by minimizing direct manipulation of the DOM, instead updating the virtual DOM and efficiently rendering only the necessary changes."
    }
  ]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : mockFlashcards.length - 1))
    setIsFlipped(false)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < mockFlashcards.length - 1 ? prevIndex + 1 : 0))
    setIsFlipped(false)
  }

  const currentFlashcard = mockFlashcards[currentIndex]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card 
        className={`w-full max-w-md aspect-[4/3] cursor-pointer perspective-1000 transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={handleFlip}
      >
        <div className="relative w-full h-full text-card-foreground">
          <div className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-6 ${isFlipped ? 'rotate-y-180 opacity-0' : ''}`}>
            <h2 className="text-2xl font-bold text-center mb-2">{currentFlashcard.term}</h2>
          </div>
          <div className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-6 ${isFlipped ? '' : 'rotate-y-180 opacity-0'}`}>
            <h2 className="text-2xl font-bold text-center mb-2">{currentFlashcard.definition}</h2>
          </div>
        </div>
      </Card>
      <div className="flex justify-between w-full max-w-md mt-4">
        <Button onClick={handlePrevious} variant="outline" className="flex items-center">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleNext} variant="outline" className="flex items-center">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Card {currentIndex + 1} of {mockFlashcards.length}
      </p>
    </div>
  )
};

export default Flashcards;
