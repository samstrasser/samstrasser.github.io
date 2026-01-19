const styles = [
  'brutal.css',
  'twenty_tens.css',
  'nineties.css',
  'bootstrap.css',
  'garden.css'
];

const PAGE_LOAD_DELAY_MS = 60 * 1000;   // Delay before auto-transforming
const TRANSFORM_DELAY_MS = 1 * 1000;    // Delay before each countdown starts
const COUNTDOWN_DURATION_SECONDS = 15;

let countdownInterval;
let transformTimeout;

function swapTheme() {
  const linkElement = document.getElementById('theme-css');

  // Get current stylesheet filename
  const currentHref = linkElement.href;
  const currentStyle = currentHref.substring(currentHref.lastIndexOf('/') + 1);

  // Filter out the current style
  const availableStyles = styles.filter(style => style !== currentStyle);

  // Choose a random style from the remaining options
  const randomStyle = availableStyles[Math.floor(Math.random() * availableStyles.length)];
  linkElement.href = 'style/' + randomStyle;

  startTransformCountdown();
}

function startTransformCountdown() {

  // Reset button text
  const btn = document.getElementById('transform-btn');
  btn.textContent = 'transform';

  // Clear any existing timers
  clearTimeout(transformTimeout);
  clearInterval(countdownInterval);

  // Wait before starting countdown
  transformTimeout = setTimeout(function() {
    let countdown = COUNTDOWN_DURATION_SECONDS;
    btn.textContent = 'transform in ' + countdown;

    countdownInterval = setInterval(function() {
      countdown--;
      if (countdown > 0) {
        btn.textContent = 'transform in ' + countdown;
      } else {
        clearInterval(countdownInterval);
        swapTheme();
      }
    }, 1000);
  }, TRANSFORM_DELAY_MS);
}

// Wait after page load, then start transform countdown
window.addEventListener('load', function() {
  setTimeout(startTransformCountdown, PAGE_LOAD_DELAY_MS);

  // Add click handler to transform button
  document.getElementById('transform-btn').addEventListener('click', function() {
    clearTimeout(transformTimeout);
    clearInterval(countdownInterval);
    swapTheme();
  });
});
