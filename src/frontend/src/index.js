// import { backend } from "../../declarations/backend";
import './styles.css';

document.addEventListener("DOMContentLoaded", function() {
    function animateValue(id, start, end, duration) {
      const element = document.getElementById(id);
      const range = end - start;
      const increment = Math.ceil(range / (duration / 20)); // Faster updates
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        element.textContent = current.toLocaleString() + "+";
        if (current >= end) {
          clearInterval(timer);
          element.textContent = end.toLocaleString() + "+"; // Ensure the final value
        }
      }, 50); // Update every 50ms
    }
  
    animateValue("users", 0, 250000, 1100);  // 1.5s animation
    animateValue("documents", 0, 500000, 1100);
    animateValue("countries", 0, 195, 1000);
  });
  
// const container = document.getElementById("container");

// // Function to toggle visibility between two elements
// function toggleVisibility(showId, hideId) {
//   const showElement = elem(showId);
//   const hideElement = elem(hideId);

//   showElement.style.display = "block";
//   hideElement.style.display = "none";
// }

// // Function to manage button state (disable/enable)
// function setButtonState(buttonId, disabled) {
//   const button = elem(buttonId);

//   if (disabled) {
//     button.classList.add("opacity-50", "cursor-not-allowed");
//   } else {
//     button.classList.remove("opacity-50", "cursor-not-allowed");
//   }
//   button.disabled = disabled;
// }

// // Event listener for the "toggle" button
// elem("toggle").onclick = function () {
//   toggleVisibility("container", "verify");
//   setButtonState("toggle", true);
//   setButtonState("toggleVerify", false);
// };

// // Event listener for the "toggleVerify" button
// elem("toggleVerify").onclick = () => {
//   toggleVisibility("verify", "container");
//   setButtonState("toggleVerify", true);
//   setButtonState("toggle", false);
// };
