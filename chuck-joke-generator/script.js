/*const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('joke-btn');

const generateJoke = () => {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.chucknorris.io/jokes/random');

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        // console.log(JSON.parse(this.responseText).value);
        jokeEl.innerHTML = JSON.parse(this.responseText).value;
      } else {
        jokeEl.innerHTML = 'Something Went Wrong (Not Funny)';
      }
    }
  };

  xhr.send();
};

jokeBtn.addEventListener('click', generateJoke);
document.addEventListener('DOMContentLoaded', generateJoke);
*/
const jokeDiv = document.querySelector('#joke');
const button = document.querySelector('#joke-btn');
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const data = JSON.parse(this.responseText).value;
    addElementToUI(data);
  }
};

function addElementToUI(data) {
  jokeDiv.innerText = data;
}

button.addEventListener('click', () => {
  xhr.open('GET', 'https://api.chucknorris.io/jokes/random');
  xhr.send();
});
