export type MicrofrontendRoute = {
  name: string;
  label: string;
  module: string;
  route: string;
};

export const appRoutes: MicrofrontendRoute[] = [
  {
    name: 'cotizaciones',
    label: 'Cotizaciones',
    module: '@my-workspace/cotizaciones',
    route: '/cotizaciones',
  },
  {
    name: 'factura-de-venta',
    label: 'Facturas de venta',
    module: '@my-workspace/factura-de-venta',
    route: '/factura-de-venta',
  },
  {
    name: 'notas-de-credito',
    label: 'Notas de crédito',
    module: '@my-workspace/notas-de-credito',
    route: '/notas-de-credito',
  },
];
