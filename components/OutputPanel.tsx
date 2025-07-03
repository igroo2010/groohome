
import React from 'react';
import { TranslationResult } from '../types';
import { Loader } from './Loader';

interface OutputPanelProps {
  result: TranslationResult | null;
  isLoading: boolean;
  error: string | null;
}

const OutputBlock: React.FC<{ title: string; content: string; lang?: string }> = ({ title, content, lang = 'ko' }) => (
    <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
        <div lang={lang} className="w-full p-4 bg-slate-100 border border-slate-200 rounded-lg min-h-[150px] whitespace-pre-wrap text-base">
            {content}
        </div>
    </div>
);


export const OutputPanel: React.FC<OutputPanelProps> = ({ result, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 font-semibold">{error}</p>
            </div>
        );
    }

    if (result) {
      return (
        <div className="space-y-6">
          <OutputBlock title="교정된 한글" content={result.corrected_korean} lang="ko"/>
          <OutputBlock title="영어 번역" content={result.english_translation} lang="en"/>
        </div>
      );
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-medium">결과가 여기에 표시됩니다.</p>
        </div>
    );
  };
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex flex-col h-full min-h-[450px]">
      {renderContent()}
    </div>
  );
};
