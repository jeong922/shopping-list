import Component from './component.js';

export default class ItemInput extends Component {
  template() {
    return `
		 <form class="new-form">
          <input type="text" class="footer__input" />
          <button type="submit" class="footer__button">
            <i class="fas fa-plus"></i>
          </button>
        </form>
    `;
  }

  mounted() {
    const input = this.target.querySelector('.footer__input');
    input.focus();
  }

  setEvent() {
    this.target.addEventListener('submit', (e) => {
      e.preventDefault();
      const { addItem } = this.props;
      const element = e.target;
      if (element[0].value === '') {
        element[0].focus();
        return;
      }
      addItem(element[0].value);
    });
  }
}
