import Repository from './repository.js';

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const form = document.querySelector('.new-form');

const repository = new Repository();

let shoppingListArray = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  onAdd();
});

function onAdd() {
  const text = { id: Date.now(), name: input.value, checked: false };
  shoppingListArray.push(text);
  if (text.name === '') {
    input.focus();
    return;
  }
  const item = createItem(text);
  item.scrollIntoView({ block: 'center' });
  input.value = '';
  input.focus();
  repository.setLocalStorage(shoppingListArray);
}

function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', text.id);
  itemRow.innerHTML = `
          <div class="item">
            <div class='item__wrapper'>
              <input type="checkbox" data-check=${text.id} class="item__checkbox" />
              <span data-key=${text.id} class="item__name">${text.name}</span>
            </div>
            <button class="item__delete">
              <i class="fas fa-minus-circle" data-id=${text.id}></i>
            </button>
          </div>
          <div class="item__divider"></div>
  `;
  items.append(itemRow);
  return itemRow;
}

items.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
    shoppingListArray = shoppingListArray.filter(
      (item) => item.id !== parseInt(id)
    );
    repository.setLocalStorage(shoppingListArray);
  }
});

items.addEventListener('change', (event) => {
  const dataCheck = event.target.dataset.check;
  const checkedItem = event.target.checked;
  const itemName = document.querySelector(
    `.item__name[data-key="${dataCheck}"]`
  );
  const macthData = shoppingListArray.find((data) => data.id == dataCheck);
  if (checkedItem) {
    macthData.checked = true;
    repository.setLocalStorage(shoppingListArray);
    itemName.classList.toggle('item__checked');
  } else {
    macthData.checked = false;
    repository.setLocalStorage(shoppingListArray);
    itemName.classList.toggle('item__checked');
  }
});

if (repository.getLocalStorage()) {
  shoppingListArray = repository.getLocalStorage();
  shoppingListArray.forEach(createItem);

  shoppingListArray.map((item) => {
    const itemName = document.querySelector(
      `.item__name[data-key="${item.id}"]`
    );
    const checkBox = document.querySelector(
      `.item__checkbox[data-check="${item.id}"]`
    );
    if (item.checked) {
      itemName.classList.toggle('item__checked');
      checkBox.checked = true;
    }
  });
}
