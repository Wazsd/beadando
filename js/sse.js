
document.addEventListener('DOMContentLoaded', () => {
  const sseBtn = document.getElementById('sseBtn');
  if (sseBtn) {
    sseBtn.addEventListener('click', startSSE);
  }
});

function startSSE() {
  if (typeof (EventSource) !== "undefined") {
    const source = new EventSource("../server/sse.php"); 
    source.onmessage = function(event) {
      document.getElementById("sseOutput").innerHTML += event.data + "<br>";
    };
    source.onerror = function(event) {
      console.error('SSE hiba', event);
    }
  } else {
    document.getElementById("sseOutput").innerHTML = "A böngésződ nem támogatja az SSE-t.";
  }
}
