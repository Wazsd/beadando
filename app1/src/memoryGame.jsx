import React, { useState, useEffect } from "react";
import "./memoryGame.css";
import "./index.css";

const initialSymbols = ["🍎", "🍌", "🍇", "🍓"];

const shuffle = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const doubled = [...initialSymbols, ...initialSymbols];
    const shuffled = shuffle(doubled);
    setCards(shuffled);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const resetGame = () => {
    const doubled = [...initialSymbols, ...initialSymbols];
    const shuffled = shuffle(doubled);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
  };
  
  const handleExtraButtonClick = () => {
    resetGame();
  };
  
  
  return (
    <div>
      <h2>Memóriajáték</h2>
      <div className="memory-game">
        {cards.map((symbol, index) => (
          <div
            key={index}
            className={`card ${flipped.includes(index) || matched.includes(index) ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            {flipped.includes(index) || matched.includes(index) ? symbol : "❓"}
          </div>
        ))}
      </div>

      {matched.length === cards.length && (
        <p style={{ textAlign: "center" }}>🎉 Gratulálok, nyertél!</p>
      )}


      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handleExtraButtonClick} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Újraindítás
        </button>
      </div>

    </div>
  );
}
