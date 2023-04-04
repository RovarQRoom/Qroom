
let nav__searchForm = document.querySelector('.nav__search-form');

document.querySelector('#nav__search-btn').onclick = () =>{
    nav__searchForm.classList.toggle('nav__active');
    nav__loginForm.classList.remove('nav__active');
    nav__navbar.classList.remove('nav__active');
}


let nav__loginForm = document.querySelector('.login-form');

document.querySelector('#nav__login-btn').onclick = () =>{
    nav__loginForm.classList.toggle('nav__active');
    nav__searchForm.classList.remove('nav__active');
    nav__navbar.classList.remove('nav__active');
}

let nav__navbar = document.querySelector('.nav__navbar');

document.querySelector('#nav__menu-btn').onclick = () =>{
    nav__navbar.classList.toggle('nav__active');
    nav__searchForm.classList.remove('nav__active');
    nav__loginForm.classList.remove('nav__active');
}

window.onscroll = () =>{
    nav__searchForm.classList.remove('nav__active');
    nav__loginForm.classList.remove('nav__active');
    nav__navbar.classList.remove('nav__active');
}

let nav__slides = document.querySelectorAll('.home .slides-container .nav__slide');
let index = 0;

function next(){
    nav__slides[index].classList.remove('nav__active');
    index = (index + 1) % nav__slides.length;
    nav__slides[index].classList.add('nav__active');
}

function prev(){
    nav__slides[index].classList.remove('nav__active');
    index = (index - 1 + nav__slides.length) % nav__slides.length;
    nav__slides[index].classList.add('nav__active');
}