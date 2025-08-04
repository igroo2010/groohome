'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Question } from './quiz-questions';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

type QuizProps = {
  currentStep: number;
  onAnswer: (answer: string) => void;
  questions: Question[];
};

export function Quiz({ currentStep, onAnswer, questions, selectedOption }: QuizProps & { selectedOption?: string }) {
  useEffect(() => {
    if (questions.length > 0) {
      console.log(`퀴즈 스테이지 ${currentStep + 1}:`, questions[currentStep]?.text);
    }
  }, [currentStep, questions]);

  if (questions.length === 0) {
    return null;
  }

  const question = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="w-full min-h-[400px] flex flex-col justify-between h-full">
      <p className="mt-4 font-semibold text-primary mb-4 text-center">
        Question {currentStep + 1} of {questions.length}
      </p>
      <Progress value={progress} className="w-full h-1" />

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          style={{ height: question.height }}
        >
          <div className="mb-10" />
          <h2 className="text-2xl font-bold font-headline mb-8 text-left">
            {question.text}
          </h2>
          <div className="flex flex-col gap-2 items-center w-full">
            {question.options.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <Button
                  key={option.id}
                  variant="outline"
                  size="lg"
                  className={
                    `min-h-[65px] w-full max-w-2xl px-5 py-4 text-base md:text-lg rounded-lg border transition-colors shadow-sm flex items-center text-left whitespace-normal font-body ` +
                    (isSelected
                      ? 'bg-primary text-white shadow-md scale-[1.02] border-primary'
                      : 'bg-white text-primary border-gray-200 hover:bg-primary/5')
                  }
                  style={{ transition: 'all 0.15s cubic-bezier(.4,0,.2,1)' }}
                  onClick={() => onAnswer(option.text)}
                >
                  <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold md:text-x1 font-headline">
                    {option.id}
                  </span>
                  <span className="flex-1 break-words text-left leading-tight font-body font-medium antialiased">{option.text}</span>
                </Button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
