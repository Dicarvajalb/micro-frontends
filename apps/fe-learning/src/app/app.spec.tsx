import { render, screen } from '@testing-library/react';

import { App } from './app';

describe('App', () => {
  it('renders the root-config shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Fe Learning como contenedor de microfrontends' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Cotizaciones /cotizaciones' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Facturas de venta /factura-de-venta' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Notas de crédito /notas-de-credito' })).toBeTruthy();
  });
});
