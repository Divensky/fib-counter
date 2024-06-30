// import translations from './I18n'; // todo: revert to this line if we want to keep translations in JS
import * as translations from './translations.json'; // use this line if we want to use JSON format
const DEFAULT_LANG = 'en';

const template = document.createElement('template');
template.innerHTML = `
<div>Please select the language</div>
<div>
  <select id="select">
    <option value="en" selected>English</option>
    <option value="ru">Russian</option>
    <option value="fr">French</option>
  </select>
</div>`;

export class LocalMessage extends HTMLElement {
  static get ObservedAttributes() {
    return ['message', 'locale'];
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.lang = DEFAULT_LANG;
  }

  connectedCallback() {
    const select = this.shadowRoot.querySelector('#select');
    select.addEventListener('change', (ev) => {
      this.lang = ev.target.value;
      const trn = (
        translations[this.lang] ??
        translations[DEFAULT_LANG] ??
        translations[en]
      ).hello;
      console.log(trn);
      wrapper.textContent = trn;
    });
    const wrapper = document.createElement('div');
    this.shadowRoot.appendChild(wrapper);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }
}

window.customElements.define('local-message', LocalMessage);
