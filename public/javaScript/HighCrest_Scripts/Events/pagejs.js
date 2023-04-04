$(window).on("load",function(){

// home section slide show
let slideindex=$(".slide.active").index();
 const slidelen=$(".slide").length;



 function slideshow(){
     console.log(slideindex);
$(".slide").removedClass("active").eq(slideindex).addClass("active");
if(slideindex==slidelen-1){

slideindex=0;

}

else{
    slideindex++;
}
setTimeout(slideshow,5000);

 }
slideshow();
});