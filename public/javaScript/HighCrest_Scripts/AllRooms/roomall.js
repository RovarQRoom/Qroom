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



// blog

gsap.from('#blog h1', {opacity: 0, duration: 0.4, delay: 0.3, y: -30, scrollTrigger:"#blog h1"}) 
gsap.from('.left img', {opacity: 0, duration: 0.6, delay: 0.5, x: -30, scrollTrigger:".left img"}) 
gsap.from('.right img', {opacity: 0, duration: 0.6, delay: 0.5, x: 30, scrollTrigger:".right img"})
gsap.from('.left h2, .left p, .left a', {opacity: 0, duration: 0.7, delay: 0.6, x: -30, stagger: 0.2, scrollTrigger:".left h2, .left p, .left a"}) 
gsap.from('.right h2, .right p, .right a', {opacity: 0, duration: 0.7, delay: 0.6, x: 30, stagger: 0.2, scrollTrigger:".right h2, .right p, .right a"}) 





