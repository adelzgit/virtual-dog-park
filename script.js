/* ===== Virtual Dog Park - script.js =====
   Plain JavaScript. No frameworks, no libraries.
   Two small, friendly features:
   1) Show the current year in the footer.
   2) "Pet the dog" buttons that wag the picture and say hello. */

// 1) Put the current year into the footer (so we never forget to update it).
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 2) For every "Pet the dog" button on the page...
const petButtons = document.querySelectorAll(".pet-button");

petButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Find the card that contains this button.
    const card = button.closest(".breed-card");
    if (!card) return;

    // Get the picture and the message box inside that card.
    const image = card.querySelector(".breed-image");
    const message = card.querySelector(".pet-message");
    const breedName = button.getAttribute("data-breed");

    // Make the dog wag by adding a CSS class, then remove it when done.
    if (image) {
      image.classList.add("wag");
      // Remove the class after the animation finishes (about 1.2s).
      setTimeout(function () {
        image.classList.remove("wag");
      }, 1200);
    }

    // Show a friendly message.
    if (message) {
      const happyWords = [
        "Wags tail happily!",
        "Gives you a big smile!",
        "Loves the attention!",
        "Barks a cheerful hello!"
      ];
      const randomWord =
        happyWords[Math.floor(Math.random() * happyWords.length)];
      message.textContent = breedName + " " + randomWord;
      message.hidden = false;
    }
  });
});

/* ===== My Virtual Dog feature =====
   Adopt a dog, then Feed or Play to raise its happiness.
   Day and growth stage are set when you adopt and stay the same. */

// The dog we adopted. "null" means we don't have one yet.
let myDog = null;

// Grab the elements we need once, so we don't look them up repeatedly.
const adoptForm = document.getElementById("adopt-form");
const breedSelect = document.getElementById("breed-select");
const nameInput = document.getElementById("dog-name");
const adoptMessage = document.getElementById("adopt-message");
const dogPanel = document.getElementById("dog-panel");
const dogPanelImage = document.getElementById("dog-panel-image");
const dogPanelName = document.getElementById("dog-panel-name");
const dogBreed = document.getElementById("dog-breed");
const dogDay = document.getElementById("dog-day");
const dogStage = document.getElementById("dog-stage");
const dogHappiness = document.getElementById("dog-happiness");
const feedButton = document.getElementById("feed-button");
const playButton = document.getElementById("play-button");

// Map each breed name to its picture file (same drawings as the encyclopedia).
const breedPictures = {
  "Beagle": "assets/beagle.svg",
  "Golden Retriever": "assets/golden-retriever.svg",
  "Poodle": "assets/poodle.svg"
};

// showMessage: print a note to the visitor. isError=true shows it in red.
function showMessage(text, isError) {
  adoptMessage.textContent = text;        // textContent = safe plain text
  adoptMessage.hidden = false;
  adoptMessage.classList.toggle("error", isError);
}

// adoptDog: runs when the form is submitted. Creates the dog and shows it.
function adoptDog(event) {
  event.preventDefault();                 // stop the page from reloading

  const rawName = nameInput.value;        // exactly what the user typed
  const name = rawName.trim();            // drop spaces at the start/end

  // The input stops at 20 characters on its own (maxlength="20").
  // If the name is only spaces, trim() makes it empty, so we reject it.
  if (name === "") {
    showMessage("Please enter a name for your dog.", true);
    return;
  }

  const breed = breedSelect.value;

  // A new dog always starts the same way: Day 1, Puppy, happiness 50.
  myDog = {
    name: name,
    breed: breed,
    day: 1,
    stage: "Puppy",
    happiness: 50
  };

  showMessage("You adopted " + name + "! Take good care of them.", false);
  renderDog();
}

// renderDog: put the dog's details onto the page using textContent
// (so a name like <b>x</b> shows as plain text, never as HTML).
function renderDog() {
  if (!myDog) return;

  dogPanel.hidden = false;
  dogPanelImage.src = breedPictures[myDog.breed];
  dogPanelImage.alt = "Illustration of a " + myDog.breed;
  dogPanelName.textContent = myDog.name;
  dogBreed.textContent = myDog.breed;
  dogDay.textContent = myDog.day;
  dogStage.textContent = myDog.stage;
  dogHappiness.textContent = myDog.happiness;
}

// increaseHappiness: raise happiness by "amount", but never above 100.
function increaseHappiness(amount) {
  if (!myDog) return;
  myDog.happiness = myDog.happiness + amount;
  if (myDog.happiness > 100) {
    myDog.happiness = 100;
  }
  renderDog();
}

// Connect the buttons to their functions.
adoptForm.addEventListener("submit", adoptDog);
feedButton.addEventListener("click", function () { increaseHappiness(10); });
playButton.addEventListener("click", function () { increaseHappiness(10); });
