/*function fetchUser() {
  showSpinner();
  fetch('https://randomuser.me/api')
    .then((res) => res.json())
    .then((data) => {
      hideSpinner();
      displayUser(data.results[0]);
    });
}

function displayUser(user) {
  const userDisplay = document.querySelector('#user');

  if (user.gender === 'female') {
    document.body.style.backgroundColor = 'rebeccapurple';
  } else {
    document.body.style.backgroundColor = 'steelblue';
  }

  userDisplay.innerHTML = `
  <div class="flex justify-between">
  <div class="flex">
    <img
      class="w-48 h-48 rounded-full mr-8"
      src="${user.picture.large}"
    />
    <div class="space-y-3">
      <p class="text-xl">
        <span class="font-bold">Name: </span>${user.name.first} ${user.name.last}
      </p>
      <p class="text-xl">
        <span class="font-bold">Email: </span> ${user.email}
      </p>
      <p class="text-xl">
        <span class="font-bold">Phone: </span> ${user.phone}
      </p>
      <p class="text-xl">
        <span class="font-bold">Location: </span> ${user.location.city} ${user.location.country}
      </p>
      <p class="text-xl"><span class="font-bold">Age: </span> ${user.dob.age}</p>
    </div>
  </div>
</div>
  `;
}

function showSpinner() {
  document.querySelector('.spinner').style.display = 'block';
}

function hideSpinner() {
  document.querySelector('.spinner').style.display = 'none';
}

document.querySelector('#generate').addEventListener('click', fetchUser);

fetchUser();
*/
const body = document.querySelector('body');
const button = document.querySelector('#generate');
const user = document.querySelector('#user');

function addDataToUI(data) {
  user.innerHTML = '';
  const profile = [
    `Name: ${data['results'][0]['name']['first']} ${data['results'][0]['name']['last']}`,
    `Email: ${data['results'][0]['email']}`,
    `Phone: ${data['results'][0]['phone']}`,
    `Location: ${data['results'][0]['location']['state']} ${data['results'][0]['location']['country']}`,
    `Age: ${data['results'][0]['dob']['age']}`,
  ];

  const divLeft = document.createElement('div');
  const divRight = document.createElement('div');

  const img = document.createElement('img');
  img.src = data['results'][0]['picture']['large'];
  divLeft.appendChild(img);
  img.style.borderRadius = '50%';
  img.style.height = '200px';

  profile.forEach((element) => {
    cutIndex = element.indexOf(' ');
    const div = document.createElement('div');
    const strong = document.createElement('strong');
    let text = document.createTextNode(element.substring(0, cutIndex));
    strong.appendChild(text);
    text = document.createTextNode(element.substring(cutIndex));
    div.appendChild(strong);
    div.appendChild(text);
    divRight.appendChild(div);
  });

  user.appendChild(divLeft);
  user.appendChild(divRight);

  //applyinh css
  body.style.backgroundColor =
    data['results'][0]['gender'] === 'female' ? 'purple' : 'teal';

  user.style.display = 'flex';
  divLeft.style.margin = '0 10px 20px 30px';
  divRight.style.margin = '20px 10px 20px 40px';
  divRight.style.fontSize = '20px';
}

function generateUser() {
  fetch('https://randomuser.me/api')
    .then((resp) => resp.json())
    .then((data) => addDataToUI(data));
}

button.addEventListener('click', generateUser);
