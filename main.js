const addBtn = document.querySelector('.footer__button');
const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const form = document.querySelector('.new-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  onAdd();
});

function onAdd() {
  // 1. 입력한 텍스트 받아오기
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }
  // 2. 새로운 item 생성(텍스트 + 삭제 버튼)
  const item = createItem(text);
  // 3. items 컨테이너안에 새로 만든 아이템 추가
  items.appendChild(item);
  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: 'center' });
  // 5. input 초기화(input value 비우기, input focus)
  input.value = '';
  input.focus();
}
let id = 0; // UUID
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
          <div class="item">
            <span class="item__name">${text}</span>
            <button class="item__delete">
              <i class="fas fa-trash" data-id=${id}></i>
            </button>
          </div>
          <div class="item__divider"></div>
  `;
  id++;
  return itemRow;
}

items.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
