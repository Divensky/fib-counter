import './style.css';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Fibonacci counter</h1>
    <p>Use navigation buttons to increase/decrease Fibonacci numbers:</p>
    <fib-counter></fib-counter>
    
    <h2>Language selector</h2>
    <local-message></local-message>
    <div></div>
    
  </div>
`;
