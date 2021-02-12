'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
