window.addEventListener('load', ()=> {
    let country;
    let temperatureDescription = document.querySelector('.t-description');
    let temperatureDegree = document.querySelector('.t-degree');
    let locationTimezone = document.querySelector('.location');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.temperature span');

    const searchbox = document.querySelector('.search-box');
    searchbox.addEventListener('keypress', setQuery);

      function setQuery(evt) {
        if (evt.keyCode == 13) {
            country = searchbox.value;
            console.log(country);
            const api = `http://api.weatherstack.com/current?access_key=8d6499ef522849c7027f39a5f33925a7&query=${country}`;
            search(api);
        }
            
        function search(api){
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temperature, weather_descriptions} = data.current;
                    const {country, name} = data.location;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = weather_descriptions;
                    locationTimezone.textContent = name + ", " + country;
                    temperatureSpan.textContent = 'C';

                    // Formula to change from F to C
                    let farenheit = Math.floor((temperature/5) * 9 + 32);

                    // Set Icon
                    // setIcons(weather_icons, document.querySelector('.icon'));
                    if(temperature > 25) {
                        document.body.style.background = "linear-gradient(to right, #f12711, #f5af19)";
                    } else if(temperature >= 10  && temperature <= 25) {
                        document.body.style.background = "linear-gradient(to right, #22c1c3, #fdbb2d)";
                    } else {
                        document.body.style.background = "llinear-gradient(to right, #43c6ac, #191654)";
                    }

                    // Change temperature to Celsius/F
                    temperatureSection.addEventListener('click', () =>{
                        if(temperatureSpan.textContent === 'C') {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = farenheit;
                            console.log(temperatureDegree);
                        } else {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        }
}

    function setIcons(icon, iconID) {
        const skycons = new Skycons({colors: "white"});
        const currentIcon = icon.replace(weather, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});