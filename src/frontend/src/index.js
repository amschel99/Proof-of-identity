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


  document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu-2');
    const openIcon = mobileMenuButton.querySelector('svg:not(.hidden)');
    const closeIcon = mobileMenuButton.querySelector('svg.hidden');
    
    function toggleIcons(show) {
        if (show) {
            openIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            openIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        toggleIcons(false);
    }

    function toggleMobileMenu() {
        const isExpanded = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        toggleIcons(!isExpanded);
    }

    mobileMenuButton.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking on a menu item
    const menuItems = mobileMenu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnMenuButton = mobileMenuButton.contains(event.target);
        if (!isClickInsideMenu && !isClickOnMenuButton && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });
});

