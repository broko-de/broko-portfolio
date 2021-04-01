import Template from './templates/Template.js';
//importo los archivos css
import './styles/main.css';
//importo los estilos de stylus
import './styles/vars.styl';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
