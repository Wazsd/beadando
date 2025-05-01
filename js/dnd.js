// Az elemek kiválasztása
const dragItem = document.getElementById('dragMe');
const dropZone = document.getElementById('dropZone');

// Amikor elkezded húzni az elemet
dragItem.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', dragItem.id);
  setTimeout(() => {
    dragItem.style.opacity = '0.5'; // Halványítás húzás közben
  }, 0);
});

// Amikor abbahagyod a húzást, de nem droppoltad
dragItem.addEventListener('dragend', () => {
  dragItem.style.opacity = '1'; // Visszaáll az átlátszatlanság
});

// Amikor az egér a célzóna fölé ér
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.style.backgroundColor = '#d1f7c4'; // Világoszöld háttér jelzés
});

// Amikor az egér elhagyja a célzónát
dropZone.addEventListener('dragleave', () => {
  dropZone.style.backgroundColor = '#fafafa'; // Vissza az eredeti háttérszínre
});

// Amikor ledobod az elemet
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(id);

  // Az elemet átmozgatjuk a dropZone-ba
  dropZone.appendChild(draggedElement);
  
  // Animációs visszajelzés
  dropZone.style.backgroundColor = '#a2f5a2'; // Sötétebb zöld sikeres dobásnál

  // Elem stílusok frissítése
  draggedElement.style.opacity = '1';
  draggedElement.style.margin = '10px auto';
  draggedElement.style.cursor = 'default';

  // Egy kis animáció: háttér visszaáll kb. 1 másodperc múlva
  setTimeout(() => {
    dropZone.style.backgroundColor = '#fafafa';
  }, 1000);
});
