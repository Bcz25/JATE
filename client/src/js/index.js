import { Workbox } from 'workbox-window';
import Editor from './editor';
import {getDb} from './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const displayData = async () => {
  const data = await getDb ();
  if (data && data.length > 0) {
    console.log('Data found', data);
    main.innerHTML = '';
    data.forEach((item) => {
      const div = document.createElement('div');
      div.textContent = item.jate;
      main.appendChild(div);
    });
  } else {
    main.textContent = 'No data found'; // Display message if no data
  }
};

displayData();
const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
