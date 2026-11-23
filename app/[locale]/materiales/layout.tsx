import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'materials');
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
