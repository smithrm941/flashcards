
// Flashcards will be added as objects collected into an array:
flashcardCollection = [];
flashcard = {
  front: "",
  back: ""
}

// The number of flashcards created will be tracked and displayed to the user
flashcardCount = 0;

function myFunction() {
  // prompts made with this tutorial: https://www.w3schools.com/js/tryit.asp?filename=tryjs_prompt
  var txt;
  var front = prompt("Front of card:");

  var back = prompt("Back of card:");
  if (back == null || back == "") {
    txt = "You've added " + flashcardCount + " flashcards to your set!";
  } else {
    flashcard = Object.create(flashcard)
    flashcard.front = front;
    flashcard.back = back;
    flashcardCollection.push(flashcard)
    flashcardCount += 1;
    txt = "You've added " + flashcardCount + " flashcards to your set!";
  }
  document.getElementById("creationSuccess").innerHTML = txt;
  flashcardCollection.forEach(card => {

  })
  document.getElementById("clickForCards").style.display = "block";
}

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
  document.getElementById("cardFront").style.display = "block";
  document.getElementById("cardFront").innerHTML = cardToDisplay.front;

  // Get the buttons that toggle between card related displays:
  var frontButton = document.getElementById("frontButton");
  var backButton = document.getElementById("backButton");
  var anotherCard = document.getElementById("anotherCard");
  var editCard = document.getElementById("editCard");



  // When user clicks "back" button, show info from "back" of card:
  backButton.onclick = function() {
    if (document.getElementById("cardFront").style.display = "block") {
      document.getElementById("cardFront").style.display = "none";
      document.getElementById("cardBack").style.display = "block";
      document.getElementById("cardBack").innerHTML = cardToDisplay.back;
    }
  }

  // When user clicks "front" button, show info from "front" of card:
  frontButton.onclick = function() {
    if (document.getElementById("cardBack").style.display = "block") {
      document.getElementById("cardBack").style.display = "none";
      document.getElementById("cardFront").style.display = "block";
      document.getElementById("cardFront").innerHTML = cardToDisplay.front;
    }
  }

  // if front of a card is on display, clicking edit will allow user to edit front
  if (document.getElementById("cardFront").style.display = "block") {
    editCard.onclick = function() {
      // document.getElementById("cardFront").innerHTML = cardToDisplay.front;
      console.log("display the edit front box!");
    }
  }

  // if back of a card is on display, clicking edit will allow user to edit back
  if (document.getElementById("cardBack").style.display = "block") {
    editCard.onclick = function() {
      // document.getElementById("cardFront").innerHTML = cardToDisplay.front;
      console.log("display the edit back box!");
    }
  }



  //When user clicks "another card" button, a card will be randomly chosen again:
  anotherCard.onclick = function() {
    cardToDisplay = flashcardCollection[Math.floor(Math.random() * flashcardCollection.length)]
    document.getElementById("cardFront").innerHTML = cardToDisplay.front;
    document.getElementById("cardBack").style.display = "none";
    document.getElementById("cardFront").style.display = "block";
    document.getElementById("cardFront").innerHTML = cardToDisplay.front;

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
