
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



  document.getElementById("demo").innerHTML = txt;

}
