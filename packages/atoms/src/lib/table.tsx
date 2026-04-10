import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

export type TableProps = PropsWithChildren<{
  caption: string;
  headers: ReactNode[];
}>;

const wrapperStyle: CSSProperties = {
  border: '1px solid #d8e0ea',
  borderRadius: '1rem',
  overflow: 'hidden',
  background: '#ffffff',
};

const tableStyle: CSSProperties = {
  borderCollapse: 'collapse',
  minWidth: '100%',
  width: '100%',
};

const headCellStyle: CSSProperties = {
  background: '#f6f8fc',
  borderBottom: '1px solid #d8e0ea',
  color: '#6d7f92',
  fontSize: '0.78rem',
  fontWeight: 800,
  letterSpacing: '0.06em',
  padding: '0.85rem 0.9rem',
  textAlign: 'left',
  textTransform: 'uppercase',
};

export function Table({ caption, headers, children }: TableProps) {
  return (
    <div style={wrapperStyle}>
      <table style={tableStyle}>
        <caption
          style={{
            captionSide: 'top',
            textAlign: 'left',
            padding: '1rem 1rem 0.4rem',
            color: '#6d7f92',
            fontSize: '0.82rem',
            fontWeight: 700,
          }}
        >
          {caption}
        </caption>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={headCellStyle}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
