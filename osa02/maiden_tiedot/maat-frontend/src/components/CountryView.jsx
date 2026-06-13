import axios from "axios"
import { useEffect, useState } from "react"
const api_key = import.meta.env.VITE_WEATHER_KEY


const CountryView = ({showThis ,country}) => {

    const [weatherData, setWeatherData] = useState(null)


    const pStyle = {
        marginBottom: "0",
        marginTop: "0"
    }


    //Get weather data

    useEffect(() => {
        if (!country?.latlng) return;

        const [cityLatitude, cityLongitude] = country.latlng;

        axios
            .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&appid=${api_key}&units=metric`
            )
            .then(response => {
                console.log(response)
            setWeatherData(response.data);
            });
    }, [country]);

    
    if(!showThis) {
        return null
    }

    return (
    <>
        <h1>{country.name.common}</h1>
        <p style={pStyle}>Capital {country.capital}</p>
        <p style={pStyle}>Area {country.area}</p>

        <h2>Languages</h2>

        <ul>
            {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>

        <img style={{height:"150px", border:"solid 5px"}} src={country.flags.svg}/>

        <h2>Weather in {country.capital}</h2>  

        <p>Temperature {weatherData.main.temp} Celsius</p>
        <img 
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
        ></img>
        <p>Wind {weatherData.wind.speed} m/s</p>
    </>
    )
}

export default CountryView