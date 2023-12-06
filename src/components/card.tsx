import React from "react";
import { useState } from 'react'

import "../assets/css/card.css"

const card = () => {
    const [city, setCity] = useState("")
    const [time, setTime] = useState<null | any>(null)

    const onChange = (inputcity: React.ChangeEvent<HTMLInputElement>) => {
      setCity(inputcity.target.value);
    };

    const weatherResponse = () => {
        fetch(
          `https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=e121c22ed6689316d5aeea88b6d59880`
        )
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              throw new Error("City not found");
            }
          })
          .then((data) => {
            setTime(data);
          })
          .catch((error) => {
            console.error(error);
            setTime(null);
          });
    }

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
                  
                </ul>
              </div>
            </div>
          </div>
        ) : null}

        <div className="input-botao">
          <input
            value={city}
            onChange={onChange}
            placeholder="Type your city here :)"
          ></input>
          <div className="button" onClick={weatherResponse}>
            Search
          </div>
        </div>
      </>
    );
}

export default card