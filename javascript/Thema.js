//Zorgen dat de knop van thema kan veranderen
const Thema = document.getElementById('thema-button');

// Toggle bij klik
Thema.addEventListener('click', () => {
  document.body.classList.toggle('donker');

  //De keuze van thema bewaren
  if (document.body.classList.contains('donker')) {
    localStorage.setItem('thema', 'donker');
  } else {
    localStorage.setItem('thema', 'licht');
  }
});

// Zet thema bij laden
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('thema') === 'donker') {
    document.body.classList.add('donker');
  }
});