const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{
            const {latitude, longitude} = position.coords;
            socket.emit("send-location",{latitude,longitude});
        },
        (error)=>{
            console.log(error);
        },
        {
            enableHighAccuracy:true,
            timeout:5000,
            maximumAge:0,
        }
    )
}

//the code below is used to target the div class=map by using query selector
// L.map(document.querySelector(".map")).setView([0,0],10);

//incase of div id = map, we can directly pass it.
const map = L.map("map").setView([0,0],12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribtion:"HIHIHAHA MAPS"
}).addTo(map)

const markers = {};

socket.on("receive-location",(data)=>{
    const {id, latitude, longitude} =data;
    map.setView([latitude,longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude])
    }
    else{
        markers[id]= L.marker([latitude,longitude]).addTo(map);
    }
})

socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id]
    }
})