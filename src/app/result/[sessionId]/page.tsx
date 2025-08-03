import ResultDetail from '@/components/result/ResultDetail';

type ResultPageProps = {
  params: Promise<{ sessionId: string }>
};

export default async function ResultPage({ params }: ResultPageProps) {
  const { sessionId } = await params;
  return <ResultDetail id={sessionId} />;
} 