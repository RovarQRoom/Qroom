let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search icon
  sidebar.classList.toggle("open");
});
