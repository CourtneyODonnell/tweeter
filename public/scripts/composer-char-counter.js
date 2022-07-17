
$(document).ready(function() {
  // --- our code goes here ---
  const myTextArea = document.getElementById('tweet-text');
  const remainingCharsText = document.getElementById('tweet-counter');
  const maxChars = 140;

  //eventlistener for input
  myTextArea.addEventListener('input', () => {
    const remaining = maxChars - myTextArea.value.length;
    //if the remaining chars is less than 10%, color the text red
    const color = remaining < maxChars * 0.1 ? 'red' : null;
    remainingCharsText.textContent = `${remaining}`;
    remainingCharsText.style.color = color;
  });

  $("#btn").on('click', function() {
    console.log(this); //The this keyword is a reference to the button
  });
  
  $("#btn").on('click', () => {
    console.log(this); //The this keyword here refers to something else!
  });
});


