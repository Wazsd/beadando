document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
  
    let isDrawing = false;
  
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF0000";
  
    canvas.addEventListener('mousedown', (event) => {
      isDrawing = true;
      ctx.beginPath();
      ctx.moveTo(event.offsetX, event.offsetY);
    });
  
    canvas.addEventListener('mousemove', (event) => {
      if (isDrawing) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
      }
    });
  
    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
    });
  });
  