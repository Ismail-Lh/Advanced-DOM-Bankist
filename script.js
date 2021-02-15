'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsBtn = document.querySelectorAll('.operations__tab');
const TabContainer = document.querySelector('.operations__tab-container');
const operContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const header = document.querySelector('.header');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Implementing smooth scrolling

btnScrollTo.addEventListener('click', e => {
  // --------------> Get the coords (x, y)
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // --------------> Get the page X offset
  // console.log('curr scroll X :', window.pageXOffset);
  // console.log('curr scroll Y :', window.pageYOffset);

  // --------------> Get the page Y offset
  // console.log('width :', document.documentElement.clientWidth);
  // console.log('height :', document.documentElement.clientHeight);

  // --------------> Scrolling without smooth effect old way
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // --------------> Scrolling with smooth effect old way
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // --------------> Scrolling with smooth effect modern option
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Implementing Page navigation

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', e => {
//     e.preventDefault();

//     const id = e.currentTarget.getAttribute('href');
//     const sectionId = document.querySelector(id);

//     sectionId.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event Delegation Method
// 1- Add event listener to common parent element
navLinks.addEventListener('click', e => {
  e.preventDefault();

  // 2- Determine wath element originated the event
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const sectionId = document.querySelector(id);

    sectionId.scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////////////////////
// Tabbed Component
TabContainer.addEventListener('click', e => {
  const clickedBtn = e.target.closest('.operations__tab');

  if (!clickedBtn) return;

  // Remove active classes
  tabsBtn.forEach(t => t.classList.remove('operations__tab--active'));
  operContent.forEach(c => c.classList.remove('operations__content--active'));

  // Add active classes to the clicked El
  clickedBtn.classList.add('operations__tab--active');

  const id = clickedBtn.dataset.tab;

  // Activate content area was clicked
  const content = document.querySelector(`.operations__content--${id}`);
  content.classList.add('operations__content--active');
});

/////////////////////////////////////////
// Menu fade animation
const fadeAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const clickedLink = e.target;
    const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = clickedLink.closest('nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== clickedLink) {
        el.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', fadeAnimation.bind(0.5));

nav.addEventListener('mouseout', fadeAnimation.bind(1));

/////////////////////////////////////////
// Implementing the Sticky Navigation
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Implementing the Sticky Navigation with The Intersection Observer API
const stickyNav = entries => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

/////////////////////////////////////////

// const randInt = (max, min = 0) => Math.floor(Math.random() * (max - min));

// const randColor = () => `rgb(${randInt(255)},${randInt(255)},${randInt(255)})`;

// const nav = document.querySelector('.nav');
// const navLinks = document.querySelector('.nav__links');
// const navLink = document.querySelector('.nav__link');

// navLink.addEventListener('click', function (e) {
//   this.style.backgroundColor = randColor();

//   console.log('navLink', e.target, e.currentTarget);

//   // TRUE
//   console.log(e.currentTarget === this);

//   // STOP Propagation (NOT THE GOOD WAY)
//   e.stopPropagation();
// });

// navLinks.addEventListener('click', function (e) {
//   this.style.backgroundColor = randColor();

//   console.log('navLinks', e.target, e.currentTarget);

//   // e.stopImmediatePropagation();
// });

// nav.addEventListener('click', function (e) {
//   this.style.backgroundColor = randColor();

//   console.log('nav', e.target, e.currentTarget);
// });
