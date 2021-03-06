// Flashcards will be added as objects collected into an array:
flashcardCollection = [];
flashcard = {
  numberInSet: 0,
  front: "",
  back: ""
}

flashcardCount = 0;

// The function each of the flashcard types will use to create cards
// Types of cards created depends on what user clicks:
function createFlashcard(front, back) {
  flashcard = Object.create(flashcard)
  flashcard.front = front;
  flashcard.back = back;
  flashcardCollection.push(flashcard)
  flashcardCount += 1;
  flashcard.numberInSet = flashcardCount;
  flashcardCountDisplayText = "You've added " + flashcardCount + " flashcards to your set!";
  document.getElementById("creationSuccess").style.display = "block";
  document.getElementById("creationSuccess").innerHTML = flashcardCountDisplayText;
  document.getElementById("clickForCards").style.display = "block";
}

// Function to remove any modal:
removeModal = function(modal) {
     modal.style.display = "none"
}

// Display instructions on how to use in a modal:
  //the instructions modal:
var instructionModal = document.getElementById("instructionModal");

  // the link to open the instructions modal:
var instructionDisplayLink = document.getElementById("instruction-link");

instructionDisplayLink.onclick = function() {
  instructionModal.style.display = "block";
}

  // close the instructions modal
var closeInstructionsButton = document.getElementById("closeInstructions");
closeInstructionsButton.onclick = function() {
  removeModal(instructionModal)
}

// Three types of flashcards, displayed as modals:
// Flashcard type 1:
// created via prompts for user input
function flashcardTyped() {
  // prompts made with this tutorial: https://www.w3schools.com/js/tryit.asp?filename=tryjs_prompt
  var flashcardCountDisplayText;
  var front = prompt("Front of card:");
  var back = prompt("Back of card:");
  // only create a card if both front and back are created
  if (back == null || back == "") {
    flashcardCountDisplayText = "You've added " + flashcardCount + " flashcard(s) to your set!";
  } else {
    createFlashcard(front, back)
  }
}

// Flashcard type 2:
// create flashcards using wikipedia scraping service by Risa Fletcher
function flashcardWiki() {
  var front = prompt("Search Wikipedia:");
  // only add a flashcard if search is done, no new card if search is cancelled
  if (front) {
    fetch('https://wikipedia-scraper-312805.wl.r.appspot.com/search/' + front)
      .then(response => response.json())
      .then(data => createFlashcard(data.title, data.summary)
    );
  }
}

// Flashcard type 3:
// create flashcards using movie sentiment service by Mateo Estrada
function flashcardMovie() {
  var movieTitle = prompt("Enter a movie title: ");
  var movieLines = prompt("Enter some movie lines: ");
  var movieData = {
    "title": movieTitle,
    "input_text": movieLines
  }

  // only add a flashcard if search is done, no new card if search is cancelled
  if (movieTitle && movieLines) {
    fetch('https://vibe-api-service.herokuapp.com/sentiment-analysis-long', {
      method: "POST",
      body: JSON.stringify(movieData),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(data => createFlashcard(movieTitle,
        "<br>" + "<br>Overall sentiment (-1: most negative to 1: most positive): "
        + data.compound
        + "<br>Percent negative: " + Math.round(data.neg*100)
        + "<br>Percent neutral: " + Math.round(data.neu*100)
        + "<br>Percent positive: " + Math.round(data.pos*100)));
  }
}

// The actual cards and their display:
// Modal code based on info from W3 schools: https://www.w3schools.com/howto/howto_css_modals.asp
// Modal that acts as flashcard:
var cardModal = document.getElementById("cardModal");

// Get the button that opens the flashcard modal
var cardDisplayButton = document.getElementById("clickForCards");

// Get the <span> element that closes the flashcard modal
var span = document.getElementsByClassName("close")[0];

// Flashcard functionality:

// Get the buttons that toggle between card related displays:
var frontButton = document.getElementById("frontButton");
var backButton = document.getElementById("backButton");
var anotherCard = document.getElementById("anotherCard");
var editFront = document.getElementById("editFront");
var editBack = document.getElementById("editBack");
var deleteCard = document.getElementById("deleteCard");


// When user clicks "back" button, show info from "back" of card:
backButton.onclick = function() {
  if (document.getElementById("cardFront").style.display = "block") {
    document.getElementById("cardFront").style.display = "none";
    document.getElementById("cardBack").style.display = "block";
    document.getElementById("cardBack").innerHTML = "<b>Back:</b> " + cardToDisplay.back;
  }
}

// When user clicks "front" button, show info from "front" of card:
frontButton.onclick = function() {
  if (document.getElementById("cardBack").style.display = "block") {
    document.getElementById("cardBack").style.display = "none";
    document.getElementById("cardFront").style.display = "block";
    document.getElementById("cardFront").innerHTML = "<b>Front:</b> " + cardToDisplay.front;
  }
}

// Allow user to edit front of a card
editFront.onclick = function() {
    var editFrontPrompt = prompt("Edit front of card - change " + cardToDisplay.front + " to:")
    if (editFrontPrompt) {
      cardToDisplay.front = editFrontPrompt;
      if (document.getElementById("cardFront").style.display = "block") {
        document.getElementById("cardFront").innerHTML = "<b>Front:</b> " + cardToDisplay.front;
      }
    }
}

// Allow user to edit back of a card
editBack.onclick = function() {
    var editBackPrompt = prompt("Edit back of card - change " + cardToDisplay.back + " to:")
    if (editBackPrompt) {
      cardToDisplay.back = editBackPrompt;
      if (document.getElementById("cardBack").style.display = "block") {
        document.getElementById("cardBack").innerHTML = "<b>Back:</b> " + cardToDisplay.back;
      }
    }
}

//When user clicks "another card" button, a card will be randomly chosen again:
anotherCard.onclick = function() {
  cardToDisplay = flashcardCollection[Math.floor(Math.random() * flashcardCollection.length)]
  document.getElementById("cardBack").style.display = "none";
  document.getElementById("cardFront").style.display = "block";
  document.getElementById("cardFront").innerHTML = "<b>Front:</b> " + cardToDisplay.front;
}

// delete card function (based on code from https://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript/22864817)
function cardDeletion(array, attribute, value) {
  // finding the index of the card to delete
  var index;
  for(var i = 0; i < array.length; i += 1) {
    if(array[i][attribute] === value) {
        index = i;
    }
  }
  // all elements in array have index of 0 or higher
  if (index > -1) {
    // card to delete is removed using its index via splice
    array.splice(index, 1);
    // card count is updated and display is updated based on number of cards left
    flashcardCount -= 1
    if (flashcardCount > 0) {
      flashcardCountDisplayText = "You've added " + flashcardCount + " flashcards to your set!";
      document.getElementById("creationSuccess").innerHTML = flashcardCountDisplayText;
    } else {
      document.getElementById("creationSuccess").style.display = "none";
      document.getElementById("clickForCards").style.display = "none";
    }
  }
}

//When user clicks "delete" button, user is prompted to confirm before card is removed
// using delete function above:
deleteCard.onclick = function() {
  deleteConfirmed = confirm("Are you sure you want to delete this card?")
  if(deleteConfirmed){
    alert("Deleting " + cardToDisplay.front + " card!")
    cardDeletion(flashcardCollection, 'front', cardToDisplay.front)
    removeModal(cardModal)
  }
}

// When the user clicks on <span> (x), close the flashcard modal
span.onclick = function() {
  removeModal(cardModal)
}

// When the user clicks anywhere outside of the flashcard modal, close it
window.onclick = function(event) {
  if (event.target == cardModal) {
    removeModal(cardModal)
  }
}

// Function to display flashcard that includes functionality above:
cardDisplayButton.onclick = function() {
  cardModal.style.display = "block";
  // Cards are chosen at random:
  cardToDisplay = flashcardCollection[Math.floor(Math.random() * flashcardCollection.length)]
  document.getElementById("cardBack").style.display = "none";
  document.getElementById("cardFront").style.display = "block";
  document.getElementById("cardFront").innerHTML = "<b>Front:</b> " + cardToDisplay.front;
}
