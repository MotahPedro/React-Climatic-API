import React, { useState, useEffect } from "react";

import "../assets/css/card.css"

const card = () => {
    const [city, setCity] = useState("")
    const [time, setTime] = useState<null | any>(null)
    const [lat, setLat] = useState<number | null>(null)
    const [lon, setLon] = useState<number | null>(null)

    const onChange = (inputcity: React.ChangeEvent<HTMLInputElement>) => {
      setCity(inputcity.target.value);
    };

    const geoResponse = async () => {
        try {
            const response = await fetch(
              `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=e121c22ed6689316d5aeea88b6d59880`
            );
            const data = await response.json()

            if (data.length > 0) {
                setLat(data[0].lat)
                setLon(data[0].lon)
            } else {
                throw new Error("City not found")
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    
    const weatherResponse = async () => {
        if (lat !== null && lon !== null){
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e121c22ed6689316d5aeea88b6d59880`
                )
                if (response.status === 200) {
                    const data = response.json();
                    setTime(data)
                } else {
                    throw new Error("City not found");
                }
            } catch (error) {
                
            }
        }
    }

    useEffect(() => {
        if(city) {
            geoResponse()
        }
    }, [city])


    return (
      <>
        {time ? (
          <div className="container">
            <div className={`card time ${time.current.is_day}`}>
              <div className="cardTop">
                <h2>
                  <i className="map"></i>
                  {time.name}
                </h2>

                <h1 className="temperature-icon">
                  <img src={time.weather.icon} alt="" />
                  °C
                </h1>
              </div>

              <div>
                <h2 className="condition">{time.weather.description}</h2>

                <ul>
                  <li>
                    <i className="humidity"></i>Humidity:{" "}
                    <span>{time.main.humidity}</span>%
                  </li>
                  <li>
                    <i className="wind"></i>Wind: <span>{time.wind.speed}</span>
                    Km
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}

        <div className="input-button">
          <input
            value={city}
            onChange={onChange}
            placeholder="Type your city here"
          ></input>
            <div className="button" onClick={weatherResponse}>
                Search
            </div>
        </div>
      </>
    );
}

export default card