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
