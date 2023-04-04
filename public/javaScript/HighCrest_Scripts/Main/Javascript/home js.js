$(document).ready(function(){

    const swiper = new Swiper('.swiper', {
          loop: true,
      effect:'fada',
      speed:1500,
        
      
         navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
     
      });
    
}




);






// amayan bo client

const clientTabItems = document.querySelectorAll('.client-item');
const showDiv = document.querySelector('.show-info');

clientTabItems.forEach((item) => {
    item.addEventListener('click', () => {
        showInfo(item);
    });
});

function showInfo(item){
    showDiv.querySelector('.show-img img').src = item.querySelector('.client-thumbnail img').src;
    showDiv.querySelector('.show-name').innerHTML = item.querySelector('.client-name').innerHTML;
    showDiv.querySelector('.show-designation').innerHTML = item.querySelector('.client-designation').innerHTML;
    showDiv.querySelector('.show-description').innerHTML = item.querySelector('.client-description').innerHTML;
    setActiveTab(item);
}

function setActiveTab(item){
    clientTabItems.forEach((item) => {
        item.classList.remove('active'); // resetting active tab
    });
    item.classList.add('active');
}

showInfo(clientTabItems[0]); // default active tab


