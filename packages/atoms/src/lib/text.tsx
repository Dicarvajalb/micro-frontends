import type { CSSProperties, PropsWithChildren } from 'react';

export type TextProps = PropsWithChildren<{
  muted?: boolean;
}>;

export function Text({ muted = false, children }: TextProps) {
  const style: CSSProperties = {
    color: muted ? '#6d7f92' : '#15314a',
    fontSize: '0.95rem',
    lineHeight: 1.5,
    margin: 0,
  };

  return <p style={style}>{children}</p>;
}
