"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ResultCard } from '@/components/result-card';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function ResultDetail({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/get-session-detail/${id}`)
      .then(res => res.json())
      .then(d => {
        if (d && d.error) {
          setError(d.error);
          setData(null);
        } else {
          setData(d);
        }
        setLoading(false);
      })
      .catch((e) => {
        setError('네트워크 오류 또는 서버 에러');
        setLoading(false);
      });
  }, [id]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0.5 }}
      animate={{ scale: loading ? 0.8 : 1, opacity: loading ? 0.5 : 1 }}
      transition={{ duration: 0.5 }}
      className="transition-all"
    >
      {loading ? (
        <div className="flex items-center justify-center h-96"><LoadingSpinner /></div>
      ) : error ? (
        <div>에러: {error}</div>
      ) : !data ? (
        <div>데이터 없음</div>
      ) : (
        <ResultCard
          persona={{
            personaName: data.ai_result?.personaTitle || '',
            description: data.ai_result?.analysis || '',
            destination: data.recommended_destination || '',
            imageUrl: data.image_url || '',
            recommendations: data.ai_result?.recommendations || [],
            budget: data.ai_result?.budget || '',
            transport: data.ai_result?.transport || '',
            tip: data.ai_result?.tip || '',
            likes: data.likes || 0,
          }}
          onReset={() => window.history.back()}
        />
      )}
    </motion.div>
  );
} 