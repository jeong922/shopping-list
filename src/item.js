'use strict';

import Component from './component.js';
import Repository from './repository.js';

const repository = new Repository();

export default class Item extends Component {
  template() {
    const { list } = this.props;
    return `${list
      .map(
        (item) => `
					<li class="item__row">
						<div class="item">
							<div class="item__wrapper">
								<input
									type="checkbox"
									data-check="${item.id}"
									class="item__checkbox"
								/>
								<span data-key="${item.id}" class="item__name">${item.name}</span>
							</div>
							<button class="item__delete">
								<i class="fas fa-minus-circle" data-id="${item.id}"></i>
							</button>
						</div>
							<div class="item__divider"></div>
					</li>
		`
      )
      .join('')}
    `;
  }

  mounted() {
    const { list } = this.props;
    list.map((item) => {
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

  setEvent() {
    const { deleteItem } = this.props;
    const { list } = this.props;
    this.target.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      if (id) {
        deleteItem(id);
      }
    });

    this.target.addEventListener('change', (event) => {
      const dataCheck = event.target.dataset.check;
      const checkedItem = event.target.checked;
      const itemName = document.querySelector(
        `.item__name[data-key="${dataCheck}"]`
      );
      const macthData = list.find((data) => data.id == dataCheck);
      if (checkedItem) {
        macthData.checked = true;
        repository.setLocalStorage(list);
        itemName.classList.toggle('item__checked');
      } else {
        macthData.checked = false;
        repository.setLocalStorage(list);
        itemName.classList.toggle('item__checked');
      }
    });
  }
}
