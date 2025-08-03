import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster";
import '../globals.css';

export const metadata: Metadata = {
  title: '관리자 대시보드 - 여행 페르소나',
  description: 'WanderPersona 관리자 페이지',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
} 