window.addEventListener('load', ()=> {
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector('.t-description');
    let temperatureDegree = document.querySelector('.t-degree');

    let locationTimezone = document.querySelector('.location');


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy ="https://cors-anywhere.herokuapp.com/"
            const api = 'http://api.weatherstack.com/current?access_key=8d6499ef522849c7027f39a5f33925a7&query=longitude,latitude';
    
        fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temperature, weather_descriptions, weather_icons} = data.current;
                const {country} = data.location;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = weather_descriptions;
                locationTimezone.textContent = country;
                // Set Icon
                setIcons(weather_icons, document.querySelector('.icon'));
            });
        });
    } 
    function setIcons(icon, iconID) {
        const skycons = new Skycons({colors: "white"});
        const currentIcon = Skycons[icon.replace(/-/g, "_")];
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});