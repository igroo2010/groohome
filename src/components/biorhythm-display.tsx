'use client';

import React from 'react';
import { format } from 'date-fns';
import { BiorhythmChart } from './biorhythm-chart';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from './loading-spinner';

type BiorhythmDisplayProps = {
  birthDate: Date;
  onStartQuiz: () => void;
  analysis: string | null;
  isLoading: boolean;
};

export function BiorhythmDisplay({ birthDate, onStartQuiz, analysis, isLoading }: BiorhythmDisplayProps) {
  return (
    <div className="w-full">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline">Your Biorhythm</h2>
        <p className="text-muted-foreground mt-2 mb-6">
          Based on selected birthdate {format(birthDate, 'yyyy-MM-dd')}
        </p>
      </div>

      <BiorhythmChart birthDate={birthDate} />
      
      <div className="w-full max-w-2xl mx-auto">
        <Card className="bg-background/70 w-full">
          <CardHeader>
            <CardTitle>AI Biorhythm Analysis</CardTitle>
            <CardDescription>This is advice based on today's rhythm.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 text-left pl-6" style={{ width: 650 }}>
            <motion.div
              className="min-h-[70px] relative w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {isLoading && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  pointerEvents: 'none',
                  zIndex: 10
                }}>
                  <LoadingSpinner title="" description="" />
                </div>
              )}
              {!isLoading && analysis && (
                <motion.p
                   className="block text-sm text-muted-foreground text-left w-full break-words whitespace-pre-line mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  dangerouslySetInnerHTML={{ __html: analysis.replace(/\.(?=\S)/g, '.<br />') }}
                />
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button onClick={onStartQuiz} size="lg" className="rounded-full px-10 py-6 text-lg" disabled={isLoading}>
          <Rocket className="mr-3 h-6 w-6" />
          Find Myself
        </Button>
      </div>
    </div>
  );
}