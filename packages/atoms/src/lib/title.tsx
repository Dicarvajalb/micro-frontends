import type { CSSProperties, PropsWithChildren } from 'react';

type TitleLevel = 1 | 2 | 3 | 4;

export type TitleProps = PropsWithChildren<{
  level?: TitleLevel;
}>;

const titleStyles: Record<TitleLevel, CSSProperties> = {
  1: { fontSize: '1.8rem' },
  2: { fontSize: '1.35rem' },
  3: { fontSize: '1.1rem' },
  4: { fontSize: '1rem' },
};

export function Title({ level = 2, children }: TitleProps) {
  const Heading = `h${level}` as const;

  return (
    <Heading
      style={{
        ...titleStyles[level],
        color: '#15314a',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        margin: 0,
      }}
    >
      {children}
    </Heading>
  );
}
