import React from 'react';
import Image from 'next/image';
import type { RecommendDestinationOutput } from '@/ai/flows/recommend-destination';

type ShareCardProps = {
  persona: RecommendDestinationOutput;
  forwardedRef: React.Ref<HTMLDivElement>;
};

export function ShareCard({ persona, forwardedRef }: ShareCardProps) {
  return (
    <div
      ref={forwardedRef}
      className="fixed -left-[9999px] top-0 w-[1024px] h-[1024px] bg-background p-12 flex flex-col items-center justify-center font-sans"
    >
      <div className="w-full h-full border-8 border-primary rounded-2xl shadow-2xl flex flex-col overflow-hidden bg-card">
        <div className="relative w-full h-3/4">
          <Image
            src={persona.imageUrl}
            alt={persona.personaTitle}
            width={1024}
            height={768}
            className="object-cover w-full h-full"
            unoptimized 
          />
        </div>
        <div className="w-full h-1/4 bg-card p-8 flex flex-col justify-center items-center text-center">
          <h2 className="text-7xl font-bold font-headline text-primary-foreground">{persona.personaTitle}</h2>
          <p className="mt-4 text-4xl font-body text-accent">WanderPersona.com</p>
        </div>
      </div>
    </div>
  );
}
