const form = document.querySelector('#item-form');
const filter = document.querySelector('#filter');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');

function onSubmit(e) {
  e.preventDefault();

  let duplicateItem = false;
  const item = document.querySelector('#item-form #item-input');
  itemList.querySelectorAll('li').forEach((items) => {
    if (items.innerText.toLowerCase() === item.value.toLowerCase()) {
      alert('Item already present');
      duplicateItem = true;
    }
  });

  if (duplicateItem === true) {
    //reset the field afterwards
    item.value = '';
    return;
  }

  if (item.value === '') {
    alert('Item field can not be empty');
  } else {
    //create a li, text node, button & icon
    const li = document.createElement('li');
    const text = document.createTextNode(item.value);
    const deleteButton = document.createElement('button');
    deleteButton.className = 'remove-item btn-link text-red';
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark';

    //adding elements into li an ul
    deleteButton.appendChild(icon);
    li.appendChild(text);
    li.appendChild(deleteButton);
    itemList.appendChild(li);

    //reset the field afterwards
    item.value = '';
  }
}

function onClickDelete(e) {
  e.target.parentElement.parentElement.remove();
}

function clearAll() {
  itemList.querySelectorAll('li').forEach((items) => items.remove());
  //   filter.remove();
  //   clearButton.remove();
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

form.addEventListener('submit', onSubmit);
itemList.addEventListener('click', onClickDelete);
clearButton.addEventListener('click', clearAll);
filter.addEventListener('input', onFilter);
