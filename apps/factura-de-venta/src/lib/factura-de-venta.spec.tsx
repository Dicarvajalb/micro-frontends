import { render, screen } from '@testing-library/react';

import { FacturaDeVenta } from './factura-de-venta';

describe('FacturaDeVenta', () => {
  it('renders the card', () => {
    render(<FacturaDeVenta />);

    expect(screen.getByRole('heading', { name: 'Facturas de venta' })).toBeTruthy();
  });
});
