import { render, screen } from '@testing-library/react';

import { NotasDeCredito } from './notas-de-credito';

describe('NotasDeCredito', () => {
  it('renders the card', () => {
    render(<NotasDeCredito />);

    expect(screen.getByRole('heading', { name: 'Notas de crédito' })).toBeTruthy();
  });
});
