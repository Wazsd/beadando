
function saveStorage() {
  const input = document.getElementById('storageInput').value;
  localStorage.setItem('myData', input);
}

function loadStorage() {
  const saved = localStorage.getItem('myData');
  document.getElementById('storageResult').textContent = saved || 'Nincs elmentett adat.';
}
