import { useMemo, useState } from 'react';

import { Button, Input, Table, TableRow, Tag, Text, Title } from '@my-workspace/atoms';

type InvoiceStatus = 'Enviada' | 'Pendiente' | 'Rechazada' | 'Sin enviar';

type InvoiceRecord = {
  id: string;
  date: string;
  client: string;
  total: string;
  balance: string;
  dianStatus: InvoiceStatus;
  emailStatus: 'Enviado' | 'Sin enviar';
};

const invoiceRecords: InvoiceRecord[] = [
  {
    id: 'FV-330-993101829',
    date: '22 dic. 2025',
    client: 'SIIGO SAS',
    total: '500.00 COP',
    balance: '0.00 COP',
    dianStatus: 'Sin enviar',
    emailStatus: 'Sin enviar',
  },
  {
    id: 'FV-330-993101814',
    date: '22 dic. 2025',
    client: 'SOFIA SIIGO',
    total: '25,985.00 COP',
    balance: '0.00 COP',
    dianStatus: 'Enviada',
    emailStatus: 'Enviado',
  },
  {
    id: 'FV-330-993101813',
    date: '5 dic. 2025',
    client: 'SIIGO SAS',
    total: '500.00 COP',
    balance: '0.00 COP',
    dianStatus: 'Rechazada',
    emailStatus: 'Sin enviar',
  },
  {
    id: 'FV-330-993101798',
    date: '5 dic. 2025',
    client: 'SOFIA SIIGO',
    total: '400.00 COP',
    balance: '0.00 COP',
    dianStatus: 'Pendiente',
    emailStatus: 'Sin enviar',
  },
];

const dianStates: Array<'Todas' | InvoiceStatus> = ['Todas', 'Enviada', 'Pendiente', 'Rechazada', 'Sin enviar'];

function statusTone(status: InvoiceStatus | 'Enviado' | 'Sin enviar') {
  if (status === 'Enviada' || status === 'Enviado') return 'success';
  if (status === 'Rechazada') return 'warning';
  if (status === 'Pendiente' || status === 'Sin enviar') return 'neutral';
  return 'neutral';
}

export function FacturaDeVenta() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof dianStates)[number]>('Todas');

  const visibleInvoices = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return invoiceRecords.filter((record) => {
      const matchesQuery =
        normalized.length === 0 ||
        [record.id, record.client, record.total].some((value) => value.toLowerCase().includes(normalized));

      const matchesFilter = filter === 'Todas' || record.dianStatus === filter;

      return matchesQuery && matchesFilter;
    });
  }, [filter, query]);

  return (
    <section style={panelStyle}>
      <header style={headerStyle}>
        <div style={{ display: 'grid', gap: '0.35rem' }}>
          <Title level={2}>Facturas de venta</Title>
          <Text muted>Logica propia de facturación: búsqueda, filtro por estado DIAN y acciones por documento.</Text>
        </div>

        <div style={summaryStyle}>
          <strong>{visibleInvoices.length}</strong>
          <span>facturas visibles</span>
        </div>
      </header>

      <div style={filtersStyle}>
        <Input label="Buscar factura" placeholder="ID, cliente o total" value={query} onChange={setQuery} />
        <div style={chipsStyle} aria-label="Estados DIAN">
          {dianStates.map((state) => (
            <Button key={state} variant={state === filter ? 'primary' : 'secondary'} onClick={() => setFilter(state)}>
              {state}
            </Button>
          ))}
        </div>
      </div>

      <Table
        caption="Listado de facturas electrónicas"
        headers={['Fecha', 'Comprobante', 'Cliente', 'Total', 'Saldo', 'DIAN', 'Email', 'Acciones']}
      >
        {visibleInvoices.map((record) => (
          <TableRow
            key={record.id}
            selected={record.dianStatus === 'Rechazada'}
            cells={[
              record.date,
              <div key={`${record.id}-invoice`} style={cellStack}>
                <Title level={4}>{record.id}</Title>
                <Text muted>Factura de venta</Text>
              </div>,
              <div key={`${record.id}-client`} style={cellStack}>
                <Title level={4}>{record.client}</Title>
                <Text muted>Cliente facturado</Text>
              </div>,
              record.total,
              <div key={`${record.id}-balance`} style={cellStack}>
                <strong>{record.balance}</strong>
                <Tag tone="info">Pagada</Tag>
              </div>,
              <Tag key={`${record.id}-dian`} tone={statusTone(record.dianStatus)}>{record.dianStatus}</Tag>,
              <Tag key={`${record.id}-email`} tone={record.emailStatus === 'Enviado' ? 'success' : 'warning'}>
                {record.emailStatus}
              </Tag>,
              <div key={`${record.id}-actions`} style={actionsStyle}>
                <Button variant="primary">Enviar a la DIAN</Button>
                <Button variant="ghost">Ver documento</Button>
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
