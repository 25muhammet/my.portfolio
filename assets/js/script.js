// Get current language from localStorage or default to English
let currentLanguage = localStorage.getItem('language') || 'en';

// Language toggle function
function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  localStorage.setItem('language', currentLanguage);
  updatePageLanguage();
}

// Update page language
function updatePageLanguage() {
  const html = document.documentElement;
  html.lang = currentLanguage;
  
  const trans = translations[currentLanguage];
  
  // Update all text elements
  updateTextContent('aboutTitle', trans.aboutTitle);
  updateTextContent('aboutText1', trans.aboutText1);
  updateTextContent('aboutText2', trans.aboutText2);
  updateTextContent('servicesTitle', trans.servicesTitle);
  updateTextContent('service1Title', trans.service1Title);
  updateTextContent('service1Text', trans.service1Text);
  updateTextContent('service2Title', trans.service2Title);
  updateTextContent('service2Text', trans.service2Text);
  updateTextContent('service3Title', trans.service3Title);
  updateTextContent('service3Text', trans.service3Text);
  updateTextContent('service4Title', trans.service4Title);
  updateTextContent('service4Text', trans.service4Text);
  updateTextContent('resumeTitle', trans.resumeTitle);
  updateTextContent('educationTitle', trans.educationTitle);
  updateTextContent('experienceTitle', trans.experienceTitle);
  updateTextContent('skillsTitle', trans.skillsTitle);
  updateTextContent('portfolioTitle', trans.portfolioTitle);
  updateTextContent('researchTitle', trans.researchTitle);
  updateTextContent('blogTitle', trans.blogTitle);
  updateTextContent('contactTitle', trans.contactTitle);
  updateTextContent('contactFormTitle', trans.contactFormTitle);
  updateTextContent('sendBtnText', trans.sendBtnText);
  updateTextContent('navAbout', trans.navAbout);
  updateTextContent('navResume', trans.navResume);
  updateTextContent('navPortfolio', trans.navPortfolio);
  updateTextContent('navBlog', trans.navBlog);
  updateTextContent('navContact', trans.navContact);
  updateTextContent('emailLabel', trans.emailLabel);
  updateTextContent('phoneLabel', trans.phoneLabel);
  updateTextContent('locationLabel', trans.locationLabel);
  updateTextContent('contactText', trans.contactText);
}

// Helper function to update text content
function updateTextContent(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = text;
  }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
  updatePageLanguage();
  
  // Set initial active state if needed
  const aboutBtn = document.getElementById('navAbout');
  if (aboutBtn && !aboutBtn.classList.contains('active')) {
    aboutBtn.classList.add('active');
  }
});

// Language toggle button event listener
const langToggle = document.getElementById('langToggle');
if (langToggle) {
  langToggle.addEventListener('click', function(e) {
    e.preventDefault();
    toggleLanguage();
  });
}


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// Ensure navigation links work correctly
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    // Remove active class from all links and pages
    navigationLinks.forEach(nav => nav.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));

    // Add active class to the clicked link and corresponding page
    link.classList.add("active");
    const targetPage = link.getAttribute("data-nav-link");
    const page = document.querySelector(`[data-page="${targetPage}"]`);
    if (page) {
      page.classList.add("active");
    }
  });
});