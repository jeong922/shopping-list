'use strict';
import Component from './component.js';
import Item from './item.js';
import ItemInput from './item_input.js';
import Repository from './repository.js';

const repository = new Repository();

class App extends Component {
  setup() {
    this.state = {
      shoppingList: [],
    };

    if (repository.getLocalStorage()) {
      this.state.shoppingList = repository.getLocalStorage();
    }
  }

  template() {
    return `
      <section class="list">
        <header class="header">Shopping List</header>
        <ul class="items"></ul>
        <footer class="footer"></footer>
      </section>
    `;
  }

  mounted() {
    const items = this.target.querySelector('.items');
    const footer = this.target.querySelector('.footer');

    new ItemInput(footer, {
      list: this.state.shoppingList,
      addItem: (item) => this.addItem(item),
    });

    new Item(items, {
      list: this.state.shoppingList,
      deleteItem: (id) => this.deleteItem(id),
    });
  }

  addItem = (item) => {
    const { shoppingList } = this.state;
    this.setState({
      shoppingList: [
        ...shoppingList,
        { id: Date.now(), name: item, checked: false },
      ],
    });
    repository.setLocalStorage(this.state.shoppingList);
  };

  deleteItem = (id) => {
    const shoppingList = [...this.state.shoppingList];
    const index = shoppingList.findIndex((item) => item.id + '' === id);
    shoppingList.splice(index, 1);
    this.setState({ shoppingList });
    repository.setLocalStorage(this.state.shoppingList);
  };
}

new App(document.querySelector('.app'));
