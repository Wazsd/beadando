function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        document.getElementById("geoResult").innerText = `Szélesség: ${latitude}, Hosszúság: ${longitude}`;
      }, () => {
        alert("Nem sikerült a helymeghatározás.");
      });
    } else {
      alert("A böngésződ nem támogatja a geolokációt.");
    }
  }
  