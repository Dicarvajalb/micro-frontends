import type { CSSProperties, ReactNode } from 'react';

export type TableRowProps = {
  cells: ReactNode[];
  selected?: boolean;
};

const rowStyle: CSSProperties = {
  borderBottom: '1px solid #d8e0ea',
};

const cellStyle: CSSProperties = {
  color: '#15314a',
  padding: '0.95rem 0.9rem',
  verticalAlign: 'middle',
};

export function TableRow({ cells, selected = false }: TableRowProps) {
  return (
    <tr style={{ ...rowStyle, background: selected ? 'rgba(25, 144, 255, 0.06)' : '#ffffff' }}>
      {cells.map((cell, index) => (
        <td key={index} style={cellStyle}>
          {cell}
        </td>
      ))}
    </tr>
  );
}
