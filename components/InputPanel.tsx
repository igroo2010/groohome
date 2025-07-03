import React from 'react';

interface InputPanelProps {
  koreanText: string;
  setKoreanText: (text: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ koreanText, setKoreanText, handleSubmit, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex flex-col h-full">
      <label htmlFor="korean-input" className="text-lg font-semibold text-slate-800 mb-3">
        한글 텍스트 입력
      </label>
      <textarea
        id="korean-input"
        value={koreanText}
        onChange={(e) => setKoreanText(e.target.value)}
        placeholder="여기에 검사하고 번역할 문장을 입력하세요..."
        className="w-full flex-grow p-4 border border-slate-600 bg-slate-800 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-none min-h-[300px] text-base"
        disabled={isLoading}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading || !koreanText.trim()}
        className="mt-4 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            처리 중...
          </>
        ) : (
          '맞춤법 검사 & 번역하기'
        )}
      </button>
    </div>
  );
};