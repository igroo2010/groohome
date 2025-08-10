import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getClientIp(req: Request): string {
  return req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
}

export function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

type LikedItem = {
  ip?: string;
  user_id?: string;
  date: string;
};

export function isLikedToday(likedIps: LikedItem[], ip: string, userId?: string): boolean {
  const today = getToday();
  if (userId) {
    return likedIps.some(item => item.user_id === userId && item.date === today);
  }
  return likedIps.some(item => item.ip === ip && item.date === today);
}
