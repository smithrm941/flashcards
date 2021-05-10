
flashcardCollection = [];
flashcard = {
  front: "",
  back: ""
}
flashcardCount = 0;

function myFunction() {
  // prompts made with this tutorial: https://www.w3schools.com/js/tryit.asp?filename=tryjs_prompt
  var txt;
  var front = prompt("Front of card:");
  if (front == null || front == "") {
    txt = "User cancelled the prompt.";
  } else {
    txt = "One card with " + front + " has been added to the flashcard collection";
  }


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

// Modal code from W3 schools: https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal, which will display cards
var cardDisplayButton = document.getElementById("clickForCards");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
cardDisplayButton.onclick = function() {
  modal.style.display = "block";
  document.getElementById("cardFront").style.display = "block";
  document.getElementById("cardFront").innerHTML = flashcardCollection[0].front;
}

// Get the buttons that flips cards
var frontButton = document.getElementById("frontButton");
var backButton = document.getElementById("backButton");


// When user clicks the button, show info from back of cards
backButton.onclick = function() {
  if (document.getElementById("cardFront").style.display = "block") {
    document.getElementById("cardFront").style.display = "none";
    document.getElementById("cardBack").style.display = "block";
    document.getElementById("cardBack").innerHTML = flashcardCollection[0].back;
  }
}

frontButton.onclick = function() {
  if (document.getElementById("cardBack").style.display = "block") {
    document.getElementById("cardBack").style.display = "none";
    document.getElementById("cardFront").style.display = "block";
    document.getElementById("cardFront").innerHTML = flashcardCollection[0].front;
  }
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
