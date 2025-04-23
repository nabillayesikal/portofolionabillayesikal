// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Current page tracking
let currentPage = 1;
const totalPages = 4;

// Function to show a specific portfolio page
function showPortfolioPage(pageNumber) {
  // Hide all portfolio pages
  const portfolioPages = document.querySelectorAll('.portfolio-page');
  portfolioPages.forEach(page => {
    page.style.display = 'none';
  });
  
  // Show the selected page
  document.getElementById(`portfolioPage${pageNumber}`).style.display = 'block';
  
  // Update active page indicator
  const pageButtons = document.querySelectorAll('.pagination-page');
  pageButtons.forEach(button => {
    if (parseInt(button.getAttribute('data-page')) === pageNumber) {
      button.classList.add('w3-black');
    } else {
      button.classList.remove('w3-black');
    }
  });
  
  // Update current page
  currentPage = pageNumber;
  
  // Scroll to top of portfolio section
  document.getElementById('portfolio').scrollIntoView();
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set first page as active by default
  showPortfolioPage(1);
  
  // Pagination functionality
  const pageButtons = document.querySelectorAll('.pagination-page');
  pageButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const pageNum = parseInt(this.getAttribute('data-page'));
      showPortfolioPage(pageNum);
    });
  });
  
  // Previous page button
  document.querySelector('.pagination-prev').addEventListener('click', function(e) {
    e.preventDefault();
    if (currentPage > 1) {
      showPortfolioPage(currentPage - 1);
    }
  });
  
  // Next page button
  document.querySelector('.pagination-next').addEventListener('click', function(e) {
    e.preventDefault();
    if (currentPage < totalPages) {
      showPortfolioPage(currentPage + 1);
    }
  });
  
  // Form validation
  const contactForm = document.querySelector('form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      const nameInput = document.querySelector('input[name="Name"]');
      const emailInput = document.querySelector('input[name="Email"]');
      const messageInput = document.querySelector('input[name="Message"]');
      
      let isValid = true;
      
      // Basic validation
      if (!nameInput.value.trim()) {
        alert('Please enter your name');
        isValid = false;
      }
      
      if (!emailInput.value.trim()) {
        alert('Please enter your email');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        alert('Please enter a valid email address');
        isValid = false;
      }
      
      if (!messageInput.value.trim()) {
        alert('Please enter your message');
        isValid = false;
      }
      
      // Prevent form submission if validation fails
      if (!isValid) {
        event.preventDefault();
      }
    });
  }
});

// Email validation helper function
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}