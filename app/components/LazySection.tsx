'use client';

import { ReactNode, Suspense } from 'react';
import { useIntersectionObserver } from '@/utils/useIntersectionObserver';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  className?: string;
}

export default function LazySection({
  children,
  fallback = <div className="min-h-screen" />,
  rootMargin = '100px',
  className = '',
}: LazySectionProps) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0,
    rootMargin,
    freezeOnceVisible: true,
  });

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}

