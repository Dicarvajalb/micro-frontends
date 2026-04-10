import { useMemo, useState } from 'react';

import { Button, Input, Table, TableRow, Tag, Text, Title } from '@my-workspace/atoms';

type QuoteState = 'Abierta' | 'Aprobada' | 'Vencida';

type QuoteRecord = {
  id: string;
  date: string;
  customer: string;
  total: string;
  expires: string;
  state: QuoteState;
};

const quotes: QuoteRecord[] = [
  {
    id: 'CT-500-001',
    date: '12 dic. 2025',
    customer: 'SIIGO SAS',
    total: '1,200.00 COP',
    expires: '20 dic. 2025',
    state: 'Abierta',
  },
  {
    id: 'CT-500-002',
    date: '13 dic. 2025',
    customer: 'SOFIA SIIGO',
    total: '2,450.00 COP',
    expires: '18 dic. 2025',
    state: 'Aprobada',
  },
  {
    id: 'CT-500-003',
    date: '10 dic. 2025',
    customer: 'ACME SAS',
    total: '900.00 COP',
    expires: '15 dic. 2025',
    state: 'Vencida',
  },
];

const stateFilters: Array<'Todas' | QuoteState> = ['Todas', 'Abierta', 'Aprobada', 'Vencida'];

function stateTone(state: QuoteState) {
  if (state === 'Aprobada') return 'success';
  if (state === 'Vencida') return 'warning';
  return 'neutral';
}

export function Cotizaciones() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof stateFilters)[number]>('Todas');

  const visibleQuotes = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return quotes.filter((record) => {
      const matchesQuery =
        normalized.length === 0 ||
        [record.id, record.customer, record.total].some((value) => value.toLowerCase().includes(normalized));

      const matchesFilter = filter === 'Todas' || record.state === filter;

      return matchesQuery && matchesFilter;
    });
  }, [filter, query]);

  return (
    <section style={panelStyle}>
      <header style={headerStyle}>
        <div style={{ display: 'grid', gap: '0.35rem' }}>
          <Title level={2}>Cotizaciones</Title>
          <Text muted>Logica propia de preventa: seguimiento comercial, estados y conversión a factura.</Text>
        </div>

        <div style={summaryStyle}>
          <strong>{visibleQuotes.length}</strong>
          <span>cotizaciones visibles</span>
        </div>
      </header>

      <div style={filtersStyle}>
        <Input label="Buscar cotización" placeholder="ID, cliente o valor" value={query} onChange={setQuery} />
        <div style={chipsStyle} aria-label="Estados de cotización">
          {stateFilters.map((state) => (
            <Button key={state} variant={state === filter ? 'primary' : 'secondary'} onClick={() => setFilter(state)}>
              {state}
            </Button>
          ))}
        </div>
      </div>

      <Table caption="Listado de cotizaciones" headers={['Fecha', 'Cotización', 'Cliente', 'Total', 'Vence', 'Estado', 'Acciones']}>
        {visibleQuotes.map((record) => (
          <TableRow
            key={record.id}
            selected={record.state === 'Vencida'}
            cells={[
              record.date,
              <div key={`${record.id}-quote`} style={cellStack}>
                <Title level={4}>{record.id}</Title>
                <Text muted>Propuesta comercial</Text>
              </div>,
              record.customer,
              record.total,
              record.expires,
              <Tag key={`${record.id}-state`} tone={stateTone(record.state)}>
                {record.state}
              </Tag>,
              <div key={`${record.id}-actions`} style={actionsStyle}>
                <Button variant="primary">Ver documento</Button>
                <Button variant="ghost">Convertir en factura</Button>
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
