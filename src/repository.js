'use strict';
export default class Repository {
  setLocalStorage(item) {
    localStorage.setItem('shoppingList', JSON.stringify(item));
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('shoppingList'));
  }
}
