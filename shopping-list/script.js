const form = document.querySelector('#item-form');
const filter = document.querySelector('#filter');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');
let editmodeElement;

function onSubmit(e) {
  e.preventDefault();

  let duplicateItem = false;
  const item = document.querySelector('#item-form #item-input');
  itemList.querySelectorAll('li').forEach((items) => {
    if (items.innerText.toLowerCase() === item.value.toLowerCase()) {
      duplicateItem = true;
    }
  });

  if (duplicateItem === true) {
    //if element present in edit mode
    if (editmodeElement) {
      makeUIChangesForEditModeExit();
    } else {
      alert('Item already present');
    }

    //reset the field afterwards
    item.value = '';
    return;
  }

  if (item.value === '') {
    alert('Item field can not be empty');
  } else {
    addItemToDOM(item);
    addItemToStorage();
    checkUI();

    //reset the field afterwards
    item.value = '';
  }
}

function addItemToDOM(item) {
  let text;
  //create a li, text node, button & icon
  const li = document.createElement('li');
  if (typeof item == 'string') {
    text = document.createTextNode(item);
  } else {
    text = document.createTextNode(item.value);
  }

  const deleteButton = document.createElement('button');
  deleteButton.className = 'remove-item btn-link text-red';
  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';

  //adding elements into li an ul
  deleteButton.appendChild(icon);
  li.appendChild(text);
  li.appendChild(deleteButton);

  if (!editmodeElement) {
    itemList.appendChild(li);
  } else {
    itemList.querySelectorAll('li').forEach((item) => {
      if (item.style.color === 'grey') itemList.replaceChild(li, item);
    });
    makeUIChangesForEditModeExit();
  }
}

function addItemToStorage(itemList) {
  itemList = document.querySelectorAll('#item-list li');
  const itemsArr = [];
  itemList.forEach((item) => itemsArr.push(item.innerText));
  localStorage.setItem('items', JSON.stringify(itemsArr));
}

function removeItem(e) {
  if (e.target.parentElement.className.includes('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  } else {
    activateEditMode(e.target);
  }
  addItemToStorage();
  checkUI();
}

function activateEditMode(li) {
  if (!editmodeElement) {
    makeUIChangesForEditMode(li);
  } else {
    editmodeElement.style.color = 'black';
    makeUIChangesForEditMode(li);
  }
}

function makeUIChangesForEditMode(li) {
  editmodeElement = li;
  const inputItem = form.querySelector('#item-input');
  const addItemButton = form.querySelector('.btn');
  const icon = document.createElement('i');
  const text = document.createTextNode('  Update Item');
  icon.className = 'fa-solid fa-pen';

  li.style.color = 'grey';

  inputItem.value = li.innerText;
  addItemButton.style.backgroundColor = 'green';
  addItemButton.innerHTML = '';
  addItemButton.appendChild(icon);
  addItemButton.appendChild(text);
}

function makeUIChangesForEditModeExit() {
  editmodeElement = null;
  const inputItem = form.querySelector('#item-input');
  const addItemButton = form.querySelector('.btn');
  const icon = document.createElement('i');
  const text = document.createTextNode('  Add Item');
  icon.className = 'fa-solid fa-plus';

  items = itemList.querySelectorAll('li');
  items.forEach((item) => (item.style.color = 'Black'));

  inputItem.value = '';
  addItemButton.style.backgroundColor = 'black';
  addItemButton.innerHTML = '';
  addItemButton.appendChild(icon);
  addItemButton.appendChild(text);
}

function clearAll() {
  itemList.querySelectorAll('li').forEach((items) => items.remove());
  addItemToStorage();
  checkUI();
}

function onFilter(e) {
  list = itemList.querySelectorAll('li');

  list.forEach((item) => {
    if (item.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
      item.style = 'None';
    } else {
      item.style.display = 'None';
    }
  });
}

function checkUI() {
  if (document.querySelectorAll('#item-list li').length < 1) {
    filter.style.display = 'None';
    clearButton.style.display = 'None';
  } else {
    filter.style = 'None';
    clearButton.style = 'None';
  }
}

function checkLocalStorage() {
  const items = JSON.parse(localStorage.getItem('items'));
  if (items != null) {
    items.forEach((item) => addItemToDOM(item));
  }
}

checkLocalStorage();
checkUI();
form.addEventListener('submit', onSubmit);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearAll);
filter.addEventListener('input', onFilter);
