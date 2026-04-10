import { useMemo, useState } from 'react';

import { Button, Input, Table, TableRow, Tag, Text, Title } from '@my-workspace/atoms';

type CreditNoteState = 'Aplicada' | 'Pendiente' | 'Anulada';

type CreditNoteRecord = {
  id: string;
  date: string;
  invoice: string;
  reason: string;
  amount: string;
  state: CreditNoteState;
};

const creditNotes: CreditNoteRecord[] = [
  {
    id: 'NC-220-001',
    date: '18 dic. 2025',
    invoice: 'FV-330-993101829',
    reason: 'Devolución parcial',
    amount: '50.00 COP',
    state: 'Aplicada',
  },
  {
    id: 'NC-220-002',
    date: '19 dic. 2025',
    invoice: 'FV-330-993101813',
    reason: 'Error de impuestos',
    amount: '25.00 COP',
    state: 'Pendiente',
  },
  {
    id: 'NC-220-003',
    date: '20 dic. 2025',
    invoice: 'FV-330-993101798',
    reason: 'Anulación total',
    amount: '400.00 COP',
    state: 'Anulada',
  },
];

const stateFilters: Array<'Todas' | CreditNoteState> = ['Todas', 'Aplicada', 'Pendiente', 'Anulada'];

function stateTone(state: CreditNoteState) {
  if (state === 'Aplicada') return 'success';
  if (state === 'Pendiente') return 'warning';
  return 'neutral';
}

export function NotasDeCredito() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof stateFilters)[number]>('Todas');

  const visibleNotes = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return creditNotes.filter((record) => {
      const matchesQuery =
        normalized.length === 0 ||
        [record.id, record.invoice, record.reason].some((value) => value.toLowerCase().includes(normalized));

      const matchesFilter = filter === 'Todas' || record.state === filter;

      return matchesQuery && matchesFilter;
    });
  }, [filter, query]);

  return (
    <section style={panelStyle}>
      <header style={headerStyle}>
        <div style={{ display: 'grid', gap: '0.35rem' }}>
          <Title level={2}>Notas de crédito</Title>
          <Text muted>Logica propia de ajustes: búsqueda, estado del ajuste y vínculo con la factura base.</Text>
        </div>

        <div style={summaryStyle}>
          <strong>{visibleNotes.length}</strong>
          <span>notas visibles</span>
        </div>
      </header>

      <div style={filtersStyle}>
        <Input label="Buscar nota" placeholder="ID, factura o motivo" value={query} onChange={setQuery} />
        <div style={chipsStyle} aria-label="Estados de nota de crédito">
          {stateFilters.map((state) => (
            <Button key={state} variant={state === filter ? 'primary' : 'secondary'} onClick={() => setFilter(state)}>
              {state}
            </Button>
          ))}
        </div>
      </div>

      <Table caption="Listado de notas de crédito" headers={['Fecha', 'Nota', 'Aplica a', 'Motivo', 'Valor', 'Estado', 'Acciones']}>
        {visibleNotes.map((record) => (
          <TableRow
            key={record.id}
            selected={record.state === 'Pendiente'}
            cells={[
              record.date,
              <div key={`${record.id}-note`} style={cellStack}>
                <Title level={4}>{record.id}</Title>
                <Text muted>Documento de ajuste</Text>
              </div>,
              record.invoice,
              record.reason,
              record.amount,
              <Tag key={`${record.id}-state`} tone={stateTone(record.state)}>
                {record.state}
              </Tag>,
              <div key={`${record.id}-actions`} style={actionsStyle}>
                <Button variant="primary">Ver nota</Button>
                <Button variant="ghost">Aplicar a factura</Button>
              </div>,
            ]}
          />
        ))}
      </Table>
    </section>
  );
}

const panelStyle = {
  background: '#ffffff',
  border: '1px solid #d8e0ea',
  borderRadius: '1.25rem',
  boxShadow: '0 20px 50px rgba(18, 40, 61, 0.08)',
  display: 'grid',
  gap: '1rem',
  padding: '1.25rem',
} as const;

const headerStyle = {
  alignItems: 'flex-end',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
  flexWrap: 'wrap',
} as const;

const summaryStyle = {
  display: 'grid',
  justifyItems: 'end',
  gap: '0.1rem',
} as const;

const filtersStyle = {
  display: 'grid',
  gap: '0.75rem',
} as const;

const chipsStyle = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
} as const;

const cellStack = {
  display: 'grid',
  gap: '0.25rem',
} as const;

const actionsStyle = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
} as const;
