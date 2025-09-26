//Entry point for the application

import './styles/main.css';
import { ContactApp } from './components/ContactApp.js';

//Start application processes once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new ContactApp();
  console.log('Contacts application initialized successfully');
});