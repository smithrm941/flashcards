
// Flashcards will be added as objects collected into an array:
flashcardCollection = [];
flashcard = {
  numberInSet: 0,
  front: "",
  back: ""
}

// The number of flashcards created will be tracked and displayed to the user
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
  txt = "You've added " + flashcardCount + " flashcards to your set!";
  document.getElementById("creationSuccess").innerHTML = txt;
  document.getElementById("clickForCards").style.display = "block";
}

// create flashcards by typing information into prompts that pop up on the screen
function flashcardTyped() {
  // prompts made with this tutorial: https://www.w3schools.com/js/tryit.asp?filename=tryjs_prompt
  var txt;
  var front = prompt("Front of card:");
  var back = prompt("Back of card:");
  // only create a card if both front and back are created
  if (back == null || back == "") {
    txt = "You've added " + flashcardCount + " flashcard(s) to your set!";
  } else {
    createFlashcard(front, back)
  }
}

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

// WIP: create flashcards using movie sentiment service by Mateo Estrada
function flashcardMovie() {
  var movieTitle = prompt("Enter a movie title: ");
  var movieLines = prompt("Enter some movie lines: ");

  // only add a flashcard if search is done, no new card if search is cancelled
  if (movieTitle && movieLines) {
    fetch('https://vibe-api-service.herokuapp.com/sentiment-analysis-long', {
      method: "POST",
      body: {"title": movieTitle, "input_text": movieLines}
    })
        .then(response => response.json())
        .then(data => console.log(data));
  }
  alert("Adding some movie sentiment stuff to back!");

}

// The actual cards and their display:
// Modal code based on info from W3 schools: https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal, which will display cards
var cardDisplayButton = document.getElementById("clickForCards");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal to a random flashcard
cardDisplayButton.onclick = function() {
  modal.style.display = "block";
  cardToDisplay = flashcardCollection[Math.floor(Math.random() * flashcardCollection.length)]
  document.getElementById("cardBack").style.display = "none";
  document.getElementById("cardFront").style.display = "block";
  document.getElementById("cardFront").innerHTML = "<b>Front:</b> " + cardToDisplay.front;

  // Get the buttons that toggle between card related displays:
  var frontButton = document.getElementById("frontButton");
  var backButton = document.getElementById("backButton");
  var anotherCard = document.getElementById("anotherCard");
  var editFront = document.getElementById("editFront");
  var editBack = document.getElementById("editBack");

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

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
