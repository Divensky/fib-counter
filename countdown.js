export class Countdown extends HTMLElement {
  static get observedAttributes() {
    return ['seconds'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.seconds = this.getAttribute('seconds');
    this.intervalId = null;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // todo: error handling
    clearInterval(this.intervalId);
    let counter = newValue;
    this.intervalId = setInterval(() => {
      counter--;
      if (counter <= 0) {
        clearInterval(this.intervalId);
        this.container.textContent = '';
        return;
      }
      this.container.textContent = counter;
    }, 1000);
  }
  connectedCallback() {
    this.container = document.createElement('div');
    this.shadowRoot.appendChild(this.container);
  }
}

window.customElements.define('count-down', Countdown);
