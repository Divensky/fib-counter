// for any given n - Fib is the sum of previous 2 numbers, fib(0) = 0, fib(1) = 1; fib(2) = 1, fib(3) = 2; fib(4) = 3; 5...

export class FibPages extends HTMLElement {
  constructor() {
    super();
    this.fib = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
    this.attachShadow({ mode: 'open' });
    this.left = 0;
    this.right = 10;
  }

  connectedCallback() {
    this.leftButton = document.createElement('button');
    this.leftButton.textContent = '<';
    if (this.left === 0) {
      this.leftButton.setAttribute('disabled', 'true');
    } else {
      this.leftButton.removeAttribute('disabled');
    }
    this.leftButton.addEventListener('click', () => this.update(-5));
    const rightButton = document.createElement('button');
    // todo: clean up events
    rightButton.textContent = '>';
    rightButton.addEventListener('click', () => this.update(5));
    this.shadowRoot.appendChild(this.leftButton);
    this.shadowRoot.appendChild(rightButton);
    this.wrapper = document.createElement('span');
    this.wrapper.addEventListener('click', (ev) => {
      this.dispatchEvent(
        new CustomEvent('buttonClick', {
          detail: parseInt(ev.target.textContent),
          composed: true,
        })
      );
    });
    this.shadowRoot.appendChild(this.wrapper);
    this.createButtons();
  }

  createButtons() {
    for (let i = this.left; i < this.right; i++) {
      const button = document.createElement('button');
      button.textContent = `${this.fib[i]}`;
      this.wrapper.appendChild(button);
    }
  }

  update(step) {
    if (this.left + step < 0) {
      return;
    }
    this.left += step;
    this.right += step;
    if (this.left === 0) {
      this.leftButton.setAttribute('disabled', 'true');
    } else {
      this.leftButton.removeAttribute('disabled');
    }
    this.createFib(this.right);
    this.wrapper.innerHTML = ``;
    this.createButtons();
  }

  createFib(n) {
    if (n <= 9) {
      return;
    }
    for (let i = 10; i < n; i++) {
      this.fib[i] = this.fib[i - 1] + this.fib[i - 2];
    }
  }
}

window.customElements.define('fib-pages', FibPages);
