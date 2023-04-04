mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuYThtdWhhbWFkIiwiYSI6ImNsMTBqZWNtdjAyMzIzY3FuOGdoaDMyanAifQ.1N_cADgTN_NfRUYLiOGdgg';

navigator.geolocation.getCurrentPosition(successLocation, 
    errorLocation,{
    enableHighAccuracy:true
})

function successLocation(position){
 console.log(position);
    setUpMap([position.coords.longitude , position.coords.latitude ]);
}
function errorLocation(){

}

function setUpMap(center){
const mapb = new mapboxgl.Map({
  container: 'mapBox',
  style: 'mapbox://styles/mapbox/streets-v11',
  center:center,
  zoom:14
}); 

const nav= new mapboxgl.NavigationControl();
mapb.addControl(nav);


var directions=new MapboxDirections({
    accessToken:mapboxgl.accessToken
});
mapb.addControl(directions,'top-left');


}

    