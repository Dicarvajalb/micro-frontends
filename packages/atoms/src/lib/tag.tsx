import type { CSSProperties, PropsWithChildren } from 'react';

type TagTone = 'neutral' | 'info' | 'success' | 'warning';

export type TagProps = PropsWithChildren<{
  tone?: TagTone;
}>;

const toneStyles: Record<TagTone, CSSProperties> = {
  neutral: {
    background: 'rgba(25, 144, 255, 0.10)',
    color: '#0b74df',
  },
  info: {
    background: 'rgba(20, 128, 74, 0.12)',
    color: '#14804a',
  },
  success: {
    background: 'rgba(20, 128, 74, 0.12)',
    color: '#14804a',
  },
  warning: {
    background: 'rgba(194, 122, 0, 0.12)',
    color: '#c27a00',
  },
};

export function Tag({ tone = 'neutral', children }: TagProps) {
  return (
    <span
      style={{
        ...toneStyles[tone],
        borderRadius: '999px',
        display: 'inline-flex',
        fontSize: '0.76rem',
        fontWeight: 800,
        lineHeight: 1,
        padding: '0.35rem 0.6rem',
      }}
    >
      {children}
    </span>
  );
}
