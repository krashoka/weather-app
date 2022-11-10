
function getData(){

    let city = document.getElementById("city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e2d3370a1dab589131b8caedad81a650`;

    fetch(url)
        .then(function(res){
            return res.json();
        })
        .then(function(res){
            appendData(res);
            console.log(res);
        })
        .catch(function(err){
            console.log(err);
        })

}

/////////////// Event triggered on Enter press with keyCode===13(for Enter) /////////////////////////////
document.getElementById("city").addEventListener('keyup', function(event){
    if(event.keyCode===13){
        document.getElementById("myButton").click();
    }
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////


//src="https://maps.google.com/maps?q=Patna,%20Bihar&t=&z=13&ie=UTF8&iwloc=&output=embed"

function appendData(data){
    let container = document.getElementById("container");
    let cityInput = document.getElementById("city");
    let map = document.getElementById("gmap_canvas");

    let city = document.createElement("h2");
    city.innerText = `City: ${data.name}`;
    city.style.textAlign="center";
    city.style.padding="10px";
    city.style.backgroundColor="#007aff";
    city.style.color="#fff";
    city.style.fontWeight="400";
    city.style.letterSpacing="1.5px";

    map.src = `https://maps.google.com/maps?q=${data.name}t=&z=13&ie=UTF8&iwloc=&output=embed`;

    let coord = document.createElement("p");
    coord.innerHTML = `Coordinates: <span style="color:gray; font-weight:400">"lat": ${data.coord.lat} | "lon": ${data.coord.lon}</span>`;
    coord.style.fontWeight="600";
    coord.style.fontSize="18px";
    coord.style.paddingBottom="10px";    
    coord.style.borderBottom = "2px solid #dadcdf";
    coord.style.color="#1c2938";

    let temp = document.createElement("p");
    temp.innerHTML = `Temperature: <span style="color:gray; font-weight:400; margin-left: 20px"> ${Math.floor(data.main.temp - 273)}<sup style="font-size:10px">o</sup>C | ${(Math.floor(data.main.temp - 273)*9)/5 + 32}<sup style="font-size:10px">o</sup>F</span>`;
    temp.style.fontWeight="600";
    temp.style.fontSize="18px";
    temp.style.paddingBottom="10px";    
    temp.style.borderBottom = "2px solid #dadcdf"
    temp.style.color="#1c2938";

    let humidity = document.createElement("p");
    humidity.innerHTML = `Humidity: <span style="color:gray; font-weight:400; margin-left: 20px">${data.main.humidity}%</span>`;
    humidity.style.fontWeight="600";
    humidity.style.fontSize="18px";
    humidity.style.paddingBottom="10px";    
    humidity.style.borderBottom = "2px solid #dadcdf"
    humidity.style.color="#1c2938";

    let weather = document.createElement("p");
    weather.innerHTML = `Weather: <span style="color:gray; font-weight:400; margin-left: 20px">${data.weather[0].main}</span>`;
    weather.style.fontWeight="600";
    weather.style.fontSize="18px";
    weather.style.paddingBottom="10px";    
    weather.style.borderBottom = "2px solid #dadcdf"
    weather.style.color="#1c2938";

    container.innerHTML=null;
    cityInput.value = null;
    
    container.append(city, coord, temp, humidity, weather);
}


function getCurrentLocation(lat, lon){

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e2d3370a1dab589131b8caedad81a650`;

    fetch(url)
        .then(function(res){
            return res.json();
        })
        .then(function(res){
            appendData(res);
            console.log(res);
        })
        .catch(function(err){
            console.log(err);
        })

}


function getWeather(){
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
        let crd = pos.coords;
      
        // console.log('Your current position is:');
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
    
        getCurrentLocation(crd.latitude, crd.longitude);
    }
}


getWeather();