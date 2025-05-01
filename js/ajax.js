const API_URL = 'http://gamf.nhely.hu/ajax2/';
const CODE = 'wazsd';
 
// Segédfüggvény: POST kérés készítése
async function postData(params) {
    const formData = new URLSearchParams(params);
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
    });
    return response.json();
}
 
// Read - adatok betöltése
async function readData() {
    const data = await postData({ op: 'read', code: CODE });
    const listDiv = document.getElementById('dataList');
    const statsDiv = document.getElementById('statistics');
    listDiv.innerHTML = '';
    statsDiv.innerHTML = '';
 
    if (data.list && data.list.length > 0) {
        let heights = [];
        data.list.forEach(item => {
            const p = document.createElement('p');
            p.textContent = `ID: ${item.id} | Név: ${item.name} | Magasság: ${item.height} | Súly: ${item.weight}`;
            listDiv.appendChild(p);
            if (!isNaN(parseFloat(item.height))) {
                heights.push(parseFloat(item.height));
            }
        });
       
        if (heights.length > 0) {
            const sum = heights.reduce((a, b) => a + b, 0);
            const avg = sum / heights.length;
            const max = Math.max(...heights);
            statsDiv.innerHTML = `<strong>Magasság összeg:</strong> ${sum}<br>
                                  <strong>Magasság átlag:</strong> ${avg.toFixed(2)}<br>
                                  <strong>Legnagyobb magasság:</strong> ${max}`;
        }
    } else {
        listDiv.textContent = 'Nincs adat.';
    }
}
 
// Validálás (nem üresek, max 30 karakter)
function validateInputs(...inputs) {
    for (let input of inputs) {
        if (!input || input.length === 0 || input.length > 30) {
            return false;
        }
    }
    return true;
}
 
// Create - új adat felvitele
async function createData() {
    const name = document.getElementById('createName').value.trim();
    const height = document.getElementById('createHeight').value.trim();
    const weight = document.getElementById('createWeight').value.trim();
 
    if (!validateInputs(name, height, weight)) {
        document.getElementById('createMessage').textContent = 'Hibás bemenet (max 30 karakter, nem lehet ürüres)!';
        return;
    }
 
    const result = await postData({ op: 'create', name, height, weight, code: CODE });
    if (result) {
        document.getElementById('createMessage').textContent = 'Sikeres létrehozás!';
        readData();
    } else {
        document.getElementById('createMessage').textContent = 'Hiba a létrehozásnál!';
    }
}
 
// Get adat ID alapján Update-hez
async function getDataById() {
    const id = document.getElementById('updateId').value.trim();
    const nameInput = document.getElementById('updateName');
    const heightInput = document.getElementById('updateHeight');
    const weightInput = document.getElementById('updateWeight');
    const messageDiv = document.getElementById('updateMessage');
 
    // Előző üzenetek törlése
    messageDiv.textContent = '';
 
    if (!id) {
        messageDiv.textContent = 'Írj be egy ID-t!';
        return;
    }
 
    try {
        const response = await postData({ op: 'read', code: CODE });
 
        if (!response.list || response.list.length === 0) {
            messageDiv.textContent = 'Nincs adat az adatbázisban.';
            return;
        }
 
        // ID szövegként hasonlítunk
        const foundItem = response.list.find(item => item.id.toString() === id);
 
        if (foundItem) {
            nameInput.value = foundItem.name;
            heightInput.value = foundItem.height;
            weightInput.value = foundItem.weight;
            messageDiv.textContent = 'Adatok betöltve!';
            messageDiv.style.color = 'green';
        } else {
            nameInput.value = '';
            heightInput.value = '';
            weightInput.value = '';
            messageDiv.textContent = 'Nincs ilyen ID!';
            messageDiv.style.color = 'red';
        }
 
    } catch (error) {
        messageDiv.textContent = 'Hiba történt az adatok lekérdezésekor!';
        messageDiv.style.color = 'red';
    }
}
 
 
// Update - adat módosítása
async function updateData() {
    const id = document.getElementById('updateId').value.trim();
    const name = document.getElementById('updateName').value.trim();
    const height = document.getElementById('updateHeight').value.trim();
    const weight = document.getElementById('updateWeight').value.trim();
 
    if (!validateInputs(name, height, weight)) {
        document.getElementById('updateMessage').textContent = 'Hibás bemenet (max 30 karakter, nem lehet ürüres)!';
        return;
    }
 
    const result = await postData({ op: 'update', id, name, height, weight, code: CODE });
    if (result) {
        document.getElementById('updateMessage').textContent = 'Sikeres módosítás!';
        readData();
    } else {
        document.getElementById('updateMessage').textContent = 'Hiba a módosításnál!';
    }
}
 
// Delete - adat törlése
async function deleteData() {
    const id = document.getElementById('deleteId').value.trim();
    if (!id) return;
 
    const result = await postData({ op: 'delete', id, code: CODE });
    if (result) {
        document.getElementById('deleteMessage').textContent = 'Sikeres törlés!';
        readData();
    } else {
        document.getElementById('deleteMessage').textContent = 'Hiba a törlésnél!';
    }
}
 
// Eseménykezelők hozzárendelése
document.getElementById('readButton').addEventListener('click', readData);
document.getElementById('createButton').addEventListener('click', createData);
document.getElementById('getDataForId').addEventListener('click', getDataById);
document.getElementById('updateButton').addEventListener('click', updateData);
document.getElementById('deleteButton').addEventListener('click', deleteData);
 