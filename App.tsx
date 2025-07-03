
import React, { useState, useCallback } from 'react';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { getCorrectionAndTranslation } from './services/geminiService';
import { TranslationResult } from './types';
import { LogoIcon } from './components/LogoIcon';

const App: React.FC = () => {
  const [koreanText, setKoreanText] = useState<string>('');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!koreanText.trim()) {
      setError('보낼 텍스트를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const translationResult = await getCorrectionAndTranslation(koreanText);
      setResult(translationResult);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
      setError(`오류: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [koreanText]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-center sm:justify-start gap-4 mb-8">
          <LogoIcon className="h-10 w-10 text-blue-600" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">한글 맞춤법 검사기 & 번역기</h1>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputPanel
            koreanText={koreanText}
            setKoreanText={setKoreanText}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <OutputPanel
            result={result}
            isLoading={isLoading}
            error={error}
          />
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>© ATOCnC Corp.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
