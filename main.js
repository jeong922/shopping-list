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
  const text = { id: Date.now(), name: input.value };
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

// 로컬스토리지 저장
function saveLocalStorage() {
  const stringifyName = JSON.stringify(shoppingListArray);
  localStorage.setItem('itemName', stringifyName);
}

// 로컬스토리지에서 값 받아옴
const getLocalStorage = localStorage.getItem('itemName');

function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', text.id);
  itemRow.innerHTML = `
          <div class="item">
            <span class="item__name">${text.name}</span>
            <button class="item__delete">
              <i class="fas fa-trash" data-id=${text.id}></i>
            </button>
          </div>
          <div class="item__divider"></div>
  `;
  items.appendChild(itemRow);
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
    saveLocalStorage();
  }
});

if (getLocalStorage !== null) {
  const parseName = JSON.parse(getLocalStorage);
  shoppingListArray = parseName;
  parseName.forEach(createItem);
}
