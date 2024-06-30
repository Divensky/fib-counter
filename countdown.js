const label = `Click on a number to see countdown to this number`;

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
        this.container.textContent = label;
        return;
      }
      this.container.textContent = `Remaining seconds are ${counter}`;
    }, 1000);
  }
  connectedCallback() {
    this.container = document.createElement('div');
    this.container.textContent = label;
    this.shadowRoot.appendChild(this.container);
  }
}

window.customElements.define('count-down', Countdown);
