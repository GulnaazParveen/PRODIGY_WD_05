import React, { useEffect, useState } from 'react';
import './css/style.css';

const Weather = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState('Mumbai');
    const [condition, setCondition] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=105d73d2ae361acbfc1ef28e20d9e61a`;
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                setCity(data.main);
                setCondition(data.weather[0].main);
            } catch (error) {
                console.error('Error fetching data:', error);
                setCity(null);
                setCondition(null);
            }
        };
        fetchApi();
    }, [search]);

    let weatherIcon;
    if (condition === 'Rainy') {
        weatherIcon = <i className="fa-solid fa-cloud-rain anim" style={{ color: '#a4b0be' }}></i>;
    } else if (condition === 'Sunny' || condition==='Haze') {
        weatherIcon = <i className="fa-solid fa-sun anim" style={{ color: '#eccc68' }}></i>;
    } else if (condition === 'Clouds') {
        weatherIcon = <i className="fa-solid fa-cloud anim" style={{ color: 'white' }}></i>;
    }

    return (
        <>
            <div className="box">
                <div className="inputdata">
                    <input
                        type="search"
                        className="inputfeild"
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                    />
                </div>
                <div className="weathercon">
                    {weatherIcon}
                </div>
                {!city ? (
                    <p>No data found</p>
                ) : (
                    <div>
                        <div className="info">
                            <h2 className="location">
                                <i className="fa-solid fa-street-view"></i>
                                {search}
                            </h2>
                            <h1 className="temp">{city.temp}° Cel</h1>
                            <h3 className=" tempmin_max">Min : {city.temp_min}°Cel</h3>
                        </div>
                        <div className="wave-one wave"></div>
                        <div className="wave-two wave"></div>
                        <div className="wave-three wave"></div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Weather;
