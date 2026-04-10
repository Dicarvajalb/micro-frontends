import { render, screen } from '@testing-library/react';

import { Cotizaciones } from './cotizaciones';

describe('Cotizaciones', () => {
  it('renders the card', () => {
    render(<Cotizaciones />);

    expect(screen.getByRole('heading', { name: 'Cotizaciones' })).toBeTruthy();
  });
});
