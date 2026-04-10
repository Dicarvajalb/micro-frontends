import type { ButtonHTMLAttributes, CSSProperties, PropsWithChildren } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
  }
>;

const baseStyle: CSSProperties = {
  borderRadius: '0.85rem',
  border: '1px solid transparent',
  fontSize: '0.95rem',
  fontWeight: 700,
  lineHeight: 1,
  padding: '0.8rem 1rem',
};

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #1990ff 0%, #0b74df 100%)',
    color: '#ffffff',
  },
  secondary: {
    background: '#ffffff',
    borderColor: '#d8e0ea',
    color: '#15314a',
  },
  ghost: {
    background: 'transparent',
    borderColor: '#d8e0ea',
    color: '#15314a',
  },
};

export function Button({ variant = 'secondary', children, style, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        cursor: 'pointer',
        ...(style ?? {}),
      }}
      {...props}
    >
      {children}
    </button>
  );
}
