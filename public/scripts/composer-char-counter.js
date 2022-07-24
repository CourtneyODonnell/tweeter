
$(document).ready(function() {
  console.log('Document ready');

  const myTextArea = document.getElementById('tweet-text');
  const remainingCharsText = document.getElementById('tweet-counter');
  const maxChars = 140;


  //eventlistener for input
  myTextArea.addEventListener('input', () => {
    const remaining = maxChars - myTextArea.value.length;
    //if the remaining chars is less than 0, color the text red
    const color = remaining < 0 ? 'red' : null;
    remainingCharsText.textContent = `${remaining}`;
    remainingCharsText.style.color = color;
  });

});


/*
references:
https://www.youtube.com/watch?v=X-LVkU95jLU
https://stackoverflow.com/questions/2136647/character-countdown-like-on-twitter
https://stackoverflow.com/questions/2001366/how-can-i-change-the-text-color-with-jquery#:~:text=Place%20the%20following%20in%20your,color'%2C%20'red')%3B
*/

