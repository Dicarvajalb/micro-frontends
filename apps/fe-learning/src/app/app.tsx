import { useEffect, useState } from 'react';

import { appRoutes } from '../microfrontends';
import { navigateToUrl } from 'single-spa';

export function App() {
  const [pathname, setPathname] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handleRouteChange = () => {
      setPathname(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('single-spa:routing-event', handleRouteChange as EventListener);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('single-spa:routing-event', handleRouteChange as EventListener);
    };
  }, []);

  return (
    <main className="workspace">
      <section className="workspace__hero">
        <p className="workspace__eyebrow">Root-config single-spa</p>
        <h1>Fe Learning como contenedor de microfrontends</h1>
        <p className="workspace__lead">
          Este host registra los módulos independientes y los navega sin acoplarlos en build-time. Los
          componentes comunes siguen viviendo en <code>packages/atoms</code>.
        </p>
      </section>

      <section className="workspace__nav-panel" aria-label="Navegación de microfrontends">
        <div className="workspace__nav-header">
          <h2>Módulos disponibles</h2>
          <p>La navegación usa import maps y `single-spa` para cargar cada módulo de forma independiente.</p>
        </div>

        <nav className="workspace__nav">
          {appRoutes.map((app) => (
            <a
              key={app.name}
              className="workspace__nav-link"
              href={app.route}
              onClick={(event) => {
                event.preventDefault();
                navigateToUrl(app.route);
              }}
            >
              <strong>{app.label}</strong>
              <span>{app.route}</span>
            </a>
          ))}
        </nav>
      </section>

      <section className="workspace__slot-panel" aria-label="Contenido del microfrontend">
        <div className="workspace__slot-hint">
          <span>Ruta activa</span>
          <strong>{pathname}</strong>
        </div>
        <div id="single-spa-slot" className="workspace__slot" />
      </section>
    </main>
  );
}

export default App;
