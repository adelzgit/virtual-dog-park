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

// 2) For every "Pet the dog" button inside a breed card...
//    (scoped to .breed-card so the care buttons below are not included)
const petButtons = document.querySelectorAll(".breed-card .pet-button");

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
   Adopt a dog, then Feed, Play, or Next Day to care for it.
   The dog's progress is saved in the browser and brought back on refresh. */

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
const growthFill = document.getElementById("growth-fill");
const feedButton = document.getElementById("feed-button");
const playButton = document.getElementById("play-button");
const nextDayButton = document.getElementById("next-day-button");
const startOverButton = document.getElementById("start-over-button");

// Map each breed name to its picture file (same drawings as the encyclopedia).
const breedPictures = {
  "Beagle": "assets/beagle.svg",
  "Golden Retriever": "assets/golden-retriever.svg",
  "Poodle": "assets/poodle.svg"
};

// The one key we use in the browser's localStorage.
// localStorage is a small text storage built into the browser.
// It lives on the visitor's own computer and survives a page refresh.
// We store only ONE dog, as a single JSON string under this key.
const STORAGE_KEY = "virtualDogParkPetV1";

// getStage: turn a day number into a growth stage name.
// Day 1 = Puppy; Days 2-3 = Young Dog; Day 4 and up = Adult Dog.
function getStage(day) {
  if (day === 1) return "Puppy";
  if (day <= 3) return "Young Dog";
  return "Adult Dog";
}

// saveDog: write the current dog to localStorage as text (JSON).
function saveDog() {
  if (!myDog) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(myDog));
}

// loadDog: read the saved dog when the page opens, if there is one.
function loadDog() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  try {
    myDog = JSON.parse(saved);
    renderDog();
    showMessage("Welcome back! Your dog was restored.", false);
  } catch (e) {
    // If the saved text is broken, just ignore it.
  }
}

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

  // A new dog always starts the same way: Day 1, happiness 50.
  // The growth stage is worked out from the day, so we don't store it by hand.
  myDog = {
    name: name,
    breed: breed,
    day: 1,
    happiness: 50
  };

  saveDog();   // save right after adoption
  showMessage("You adopted " + name + "! Take good care of them.", false);
  renderDog();
}

// renderDog: put the dog's details onto the page using textContent
// (so a name like <b>x</b> shows as plain text, never as HTML).
function renderDog() {
  if (!myDog) return;

  // Work out the growth stage from the day, every time we draw the dog.
  const stage = getStage(myDog.day);
  myDog.stage = stage;

  dogPanel.hidden = false;
  dogPanelImage.src = breedPictures[myDog.breed];
  dogPanelImage.alt = "Illustration of a " + myDog.breed;
  dogPanelName.textContent = myDog.name;
  dogBreed.textContent = myDog.breed;
  dogDay.textContent = myDog.day;
  dogStage.textContent = stage;          // text clearly states the stage
  dogHappiness.textContent = myDog.happiness;

  // Visible growth 1: the picture gets bigger as the dog grows.
  if (stage === "Puppy") {
    dogPanelImage.style.width = "150px";
    dogPanelImage.style.height = "150px";
  } else if (stage === "Young Dog") {
    dogPanelImage.style.width = "180px";
    dogPanelImage.style.height = "180px";
  } else {
    dogPanelImage.style.width = "210px";
    dogPanelImage.style.height = "210px";
  }

  // Visible growth 2: fill the bar. Full by day 7, then stays full.
  const growthPercent = Math.min(myDog.day, 7) / 7 * 100;
  growthFill.style.width = growthPercent + "%";
}

// increaseHappiness: raise happiness by "amount", but never above 100.
function increaseHappiness(amount) {
  if (!myDog) return;
  myDog.happiness = myDog.happiness + amount;
  if (myDog.happiness > 100) {
    myDog.happiness = 100;
  }
  saveDog();   // save after every care action
  renderDog();
}

// nextDay: move forward one day. Day +1, happiness -5 (never below 0).
function nextDay() {
  if (!myDog) return;
  myDog.day = myDog.day + 1;
  myDog.happiness = myDog.happiness - 5;
  if (myDog.happiness < 0) {
    myDog.happiness = 0;
  }
  saveDog();
  renderDog();
}

// startOver: ask first. If the visitor cancels, the dog is kept.
function startOver() {
  const sure = window.confirm("Delete your dog and start over? This cannot be undone.");
  if (!sure) return;                 // cancelled: keep the dog
  localStorage.removeItem(STORAGE_KEY);
  myDog = null;
  dogPanel.hidden = true;
  adoptMessage.hidden = true;
  nameInput.value = "";
  nameInput.focus();
}

// Connect the buttons to their functions.
adoptForm.addEventListener("submit", adoptDog);
feedButton.addEventListener("click", function () { increaseHappiness(10); });
playButton.addEventListener("click", function () { increaseHappiness(10); });
nextDayButton.addEventListener("click", nextDay);
startOverButton.addEventListener("click", startOver);

// When the page loads, bring back a saved dog if there is one.
loadDog();
