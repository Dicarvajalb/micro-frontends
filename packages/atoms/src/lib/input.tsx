import type { ChangeEvent, CSSProperties, InputHTMLAttributes } from 'react';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label: string;
  onChange: (value: string) => void;
};

const wrapperStyle: CSSProperties = {
  display: 'grid',
  gap: '0.4rem',
};

const labelStyle: CSSProperties = {
  color: '#6d7f92',
  fontSize: '0.82rem',
  fontWeight: 700,
};

const inputStyle: CSSProperties = {
  border: '1px solid #d8e0ea',
  borderRadius: '0.85rem',
  color: '#15314a',
  fontSize: '0.95rem',
  padding: '0.8rem 0.95rem',
  outline: 'none',
  width: '100%',
};

export function Input({ label, onChange, style, ...props }: InputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <label style={{ ...wrapperStyle, ...(style ?? {}) }}>
      <span style={labelStyle}>{label}</span>
      <input style={inputStyle} onChange={handleChange} {...props} />
    </label>
  );
}
