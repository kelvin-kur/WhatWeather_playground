import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/search';
import WeatherCard from '../components/weatherCard/WeatherCard';
import getWeather from '../utils/dataSource';

function HomePage() {
  const [weathers, setWeathers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchParam, setSearchParam] = useSearchParams();
  const [cityKeyword, setCityKeyword] = React.useState(() => searchParam.get('city') || '');

  const onSearch = (cityKeyword) => {
    setCityKeyword(cityKeyword);
    setSearchParam({ city: cityKeyword });
  };

  const refreshWeather = async (city) => {
    const weathers = await getWeather(city);
    setWeathers(weathers);
  };

  React.useEffect(() => {
    const fetchWeather = async () => {
      const weathersResponse = await getWeather();
      setWeathers(weathersResponse);
    }

    fetchWeather().then(() => setLoading(false));
  }, []);

  const homepageContent = <section className='container pt-3'>
    <div className='home_header border-bottom'>
      <h1>WhatWeather</h1>
    </div>
    <div className='home_example mt-3'>
      <h5>Cara melakukan pencarian</h5>
      <small>
        Silahkan melakukan pencarian dengan menggunakan nama kota. Untuk hasil
        yang lebih tepat gunakan nama kota beri koma kemudian 2 kode negaranya.
        Sebagai contoh Jakarta, ID.
      </small>
    </div>
    <SearchBar defaultKeyword={cityKeyword} refreshWeather={refreshWeather} onSearch={onSearch} />
    <WeatherCard weathers={weathers} />
  </section>;

  return (
    loading ? null : homepageContent
  );
}

export default HomePage;