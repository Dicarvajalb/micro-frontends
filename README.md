# MyWorkspace

Workspace Nx para una demo de factura electrónica con arquitectura de microfrontends.

## Estructura

- `apps/fe-learning`: host `single-spa` y punto de entrada de la aplicación.
- `apps/cotizaciones`, `apps/factura-de-venta`, `apps/notas-de-credito`: microfrontends independientes.
- `packages/atoms`: componentes compartidos de UI.

## Cómo funciona

- El host registra y navega los microfrontends por ruta.
- Cada microfrontend expone `bootstrap`, `mount` y `unmount`.
- Los componentes comunes se reutilizan desde `packages/atoms`.

## Comandos útiles

```bash
npm run dev
npm run build:all
npm run test:all
```

## CI/CD

El flujo de GitHub Actions ejecuta pruebas, construye una imagen Docker y la despliega en AWS ECS.
