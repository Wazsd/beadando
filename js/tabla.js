let data = [];

const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const cityInput = document.getElementById("city");
const jobInput = document.getElementById("job");
const editIndex = document.getElementById("editIndex");
const searchInput = document.getElementById("search");
const tableBody = document.querySelector("#dataTable tbody");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newItem = {
    name: nameInput.value.trim(),
    age: parseInt(ageInput.value),
    city: cityInput.value.trim(),
    job: jobInput.value.trim()
  };

  if (!form.checkValidity()) return;

  if (editIndex.value === "") {
    data.push(newItem); 
  } else {
    data[editIndex.value] = newItem; 
    editIndex.value = "";
  }

  form.reset();
  renderTable();
});

function renderTable(filteredData = null) {
  const displayData = filteredData || data;
  tableBody.innerHTML = "";

  displayData.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.age}</td>
      <td>${item.city}</td>
      <td>${item.job}</td>
      <td>
        <button onclick="editItem(${index})">Szerkeszt</button>
        <button onclick="deleteItem(${index})">Törlés</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editItem(index) {
  const item = data[index];
  nameInput.value = item.name;
  ageInput.value = item.age;
  cityInput.value = item.city;
  jobInput.value = item.job;
  editIndex.value = index;
}

function deleteItem(index) {
  if (confirm("Biztosan törlöd ezt a sort?")) {
    data.splice(index, 1); 
    renderTable();
  }
}

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = data.filter(item =>
    Object.values(item).some(val =>
      val.toString().toLowerCase().includes(term)
    )
  );
  renderTable(filtered);
});

const headers = document.querySelectorAll("#dataTable th[data-col]");
headers.forEach(header => {
  header.addEventListener("click", () => {
    const col = header.getAttribute("data-col");
    data.sort((a, b) => {
      if (typeof a[col] === "number") return a[col] - b[col];
      return a[col].localeCompare(b[col]);
    });
    renderTable();
  });
});

renderTable(); 
