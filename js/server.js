const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname)); 

app.get('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });

  let count = 0;
  const interval = setInterval(() => {
    count++;
    res.write(`data: Üzenet ${count} - ${new Date().toLocaleTimeString()}\n\n`);
    
  }, 3000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});
