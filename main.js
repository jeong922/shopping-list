const addBtn = document.querySelector('.footer__button');
const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const form = document.querySelector('.new-form');

let shoppingListArray = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  onAdd();
});

function onAdd() {
  // 1. 입력한 텍스트 받아오기
  const text = { id: Date.now(), name: input.value, checked: false };
  shoppingListArray.push(text);
  if (text.name === '') {
    input.focus();
    return;
  }
  // 2. 새로운 item 생성(텍스트 + 삭제 버튼)
  const item = createItem(text);
  // 3. items 컨테이너안에 새로 만든 아이템 추가
  //items.appendChild(item);
  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: 'center' });
  // 5. input 초기화(input value 비우기, input focus)
  input.value = '';
  input.focus();
  // 로컬스토리지 저장
  saveLocalStorage();
}

// 로컬스토리지에서 값 받아옴
const getLocalStorage = localStorage.getItem('itemName');

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
  items.appendChild(itemRow);
  return itemRow;
}

// 로컬스토리지 저장
function saveLocalStorage() {
  const stringifyName = JSON.stringify(shoppingListArray);
  localStorage.setItem('itemName', stringifyName);
}

function itemStyle(state, element) {
  if (state) {
    element.classList.add('item__checked');
  } else {
    element.classList.remove('item__checked');
  }
}

items.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
    shoppingListArray = shoppingListArray.filter(
      (item) => item.id !== parseInt(id)
    );
    saveLocalStorage();
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
    saveLocalStorage();
    itemStyle(checkedItem, itemName);
  } else {
    macthData.checked = false;
    saveLocalStorage();
    itemStyle(checkedItem, itemName);
  }
});

if (getLocalStorage !== null) {
  const parseName = JSON.parse(getLocalStorage);
  shoppingListArray = parseName;
  parseName.forEach(createItem);

  shoppingListArray.map((item) => {
    const itemName = document.querySelector(
      `.item__name[data-key="${item.id}"]`
    );
    const checkBox = document.querySelector(
      `.item__checkbox[data-check="${item.id}"]`
    );
    if (item.checked) {
      itemStyle(item.checked, itemName);
      checkBox.checked = true;
    }
  });
}
