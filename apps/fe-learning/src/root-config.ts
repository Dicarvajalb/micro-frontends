import { pathToActiveWhen, registerApplication, start } from 'single-spa';

import { appRoutes } from './microfrontends';

let started = false;
let registered = false;

function loadMicrofrontend(moduleName: string) {
  return import(/* @vite-ignore */ moduleName);
}

export function registerMicrofrontends() {
  if (registered) {
    return;
  }

  appRoutes.forEach((app) => {
    registerApplication({
      name: app.name,
      app: () => loadMicrofrontend(app.module),
      activeWhen: pathToActiveWhen(app.route),
    });
  });

  registered = true;

  if (!started) {
    start({ urlRerouteOnly: true });
    started = true;
  }
}
