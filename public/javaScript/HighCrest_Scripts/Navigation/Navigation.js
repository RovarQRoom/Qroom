var bar = document.getElementById("bars");
    var navbar = document.getElementById("navbar");

    bar.addEventListener('click' , ()=>{
        bar.classList.toggle('bars_mardinn');
        navbar.classList.toggle('display');
    })