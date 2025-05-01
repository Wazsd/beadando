
self.addEventListener('message', (e) => {
  let number = e.data;
  let result = 0;

  for (let i = 0; i <= number; i++) {
    result += i;
  }

  self.postMessage(result);
});
