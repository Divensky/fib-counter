export class FibCounter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.seconds = 0;
  }

  connectedCallback() {
    const countdown = document.createElement('count-down');
    countdown.setAttribute('seconds', this.seconds);

    const fibpages = document.createElement('fib-pages');
    fibpages.addEventListener('buttonClick', (ev) => {
      this.seconds = ev.detail;
      countdown.setAttribute('seconds', this.seconds);
    });
    this.shadowRoot.appendChild(fibpages);
    this.shadowRoot.appendChild(countdown);
  }
}

window.customElements.define('fib-counter', FibCounter);
