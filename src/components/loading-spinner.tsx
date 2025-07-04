import { Loader } from 'lucide-react';

type LoadingSpinnerProps = {
  title?: string;
  description?: string;
}

export function LoadingSpinner({ title = "당신의 페르소나를 준비하고 있어요.", description = " " }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center" style={{ width: 300, height: 200 }}>
      <Loader className="h-12 w-12 animate-spin text-primary" />
      <h2 className="text-xl font-semibold font-headline text-foreground/80">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
