
window.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startWorker');
  const saveBtn = document.getElementById('saveBtn');
  const loadBtn = document.getElementById('loadBtn');

  if (startBtn) {
    startBtn.addEventListener('click', startWorker);
  }

  if (saveBtn && loadBtn) {
    saveBtn.addEventListener('click', saveStorage);
    loadBtn.addEventListener('click', loadStorage);
  }
});

let worker;

function startWorker() {
  if (window.Worker) {
    if (!worker) {
      worker = new Worker('workThread.js'); 
    }

    worker.onmessage = (e) => {
      document.getElementById('workerResult').innerText = `Eredmény: ${e.data}`;
    };

    worker.onerror = (e) => {
      console.error('Hiba történt a workerben:', e.message);
    };

    worker.postMessage(100000000);
  } else {
    alert('A böngésződ nem támogatja a Web Worker-t.');
  }
}
