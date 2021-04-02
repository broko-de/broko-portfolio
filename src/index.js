//importo el archivo de template js - con @ hacemos uso de los alias que creamos en archivo de webpack
import Template from '@templates/Template.js';
//importo los archivos css - con @ hacemos uso de los alias que creamos en archivo de webpack
import '@styles/main.css';
//importo los estilos de stylus - con @ hacemos uso de los alias que creamos en archivo de webpack
import '@styles/vars.styl';

//Inicializacion de la app que carga lo que se genera en Template.js
(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
