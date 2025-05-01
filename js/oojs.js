class Animal {
    constructor(name, type) {
      this.name = name;
      this.type = type;
    }
  
    describe() {
      return `${this.name} egy ${this.type}.`;
    }
  
    createCard() {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${this.name}</h3><p>Fajta: ${this.type}</p>`;
      document.getElementById('animalContainer').appendChild(card);
    }
  }
  
  class Bird extends Animal {
    constructor(name, canFly) {
      super(name, "madár");
      this.canFly = canFly;
    }
  
    describe() {
      return `${this.name} egy madár, ${this.canFly ? "tud repülni" : "nem tud repülni"}.`;
    }
  
    createCard() {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${this.name}</h3><p>Madár - ${this.canFly ? "Repül" : "Nem repül"}</p>`;
      document.getElementById('animalContainer').appendChild(card);
    }
  }
  
document.getElementById('animalForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('animalName').value.trim();
    const type = document.getElementById('animalType').value;
  
    let newAnimal;
  
    if (type === "madár") {
      newAnimal = new Bird(name, true);
    } else if (type === "repülésképtelen madár") {
      newAnimal = new Bird(name, false);
    } else {
      newAnimal = new Animal(name, type);
    }
  
    console.log(newAnimal.describe());
    newAnimal.createCard();
  
    this.reset(); 
    });

  