import { Home } from './pages/home.js';
import { Detalhes } from './pages/detalhes.js';
import { FormFilme } from './pages/form.js';
import { Header } from './components/header.js';
import { Footer } from './components/footer.js';

const app = document.querySelector('#app');
document.querySelector('#header').innerHTML = Header();
document.querySelector('#footer').innerHTML = Footer();

function router() {
  const hash = window.location.hash || '#home';
  const [_, route, id] = hash.split('/');

  switch (route) {
    case 'home':
    default:
      Home(app);
      break;
    case 'detalhes':
      Detalhes(app, id);
      break;
    case 'novo':
      FormFilme(app);
      break;
    case 'editar':
      FormFilme(app, id);
      break;
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

export const API_URL = 'https://back-end-tf-web-kqse.onrender.com';