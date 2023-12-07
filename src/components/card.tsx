import React from "react";
import { useState } from "react";

import "../assets/css/card.css";

const Card = () => {
  const [city, setCity] = useState("");
  const [time, setTime] = useState<null | any>(null)

  const onChange = (inputCity: React.ChangeEvent<HTMLInputElement>) => {
    setCity(inputCity.target.value);
  }
  const onClick = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=bb36b42150f244a7a3b142301221205&q=${city}&aqi=no&lang=pt`
      )
      
      if (response.status === 200) {
        const data = await response.json()
        setTime(data)
      } else {
        throw new Error("City not found")
      }

    } catch (error) {
      console.error(error)
      setTime(null)
    }
  }

  return (
    <>
      {time ? (
        <div className="container">
          <div className={`card horario${time.current.is_day}`}>
            <div className="cardTop">
              <h2>
                <i className="location"></i>
                {time.location.name}
              </h2>

              <h1 className="temperature-icon">
                <img src={time.current.condition.icon} alt=""></img>
                <span className="celsius">{time.current.temp_c}</span>°C
              </h1>
            </div>
            <div>
              <h2 className="condition">{time.current.condition.text}</h2>

              <ul>
                <li>
                  <i className="humidity"></i>Umidade:{" "}
                  <span>{time.current.humidity}</span>%
                </li>
                <li>
                  <i className="wind"></i>Vento:{" "}
                  <span>{time.current.wind_kph}</span>Km
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
        <div className="button" onClick={onClick}>
          Search
        </div>
      </div>
    </>
  );
}

export default Card;
