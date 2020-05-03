import React, { useState, useEffect } from 'react';

import Cards from './components/Cards/Cards'
import Chart from './components/Chart/Chart'
import CountryPicker from './components/CountryPicker/CountryPicker'
import { fetchData } from './api'

import styles from './App.module.css'

function App() {

  const [data, setData] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData(country));
    }
    fetchAPI(country);
    console.log(data)
  }, [country]);

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    }
    fetchAPI();
  }, []);


  const handleCountryChange = async (country) => {
    setCountry(country)
  }

  return (
    <div className={styles.container}>
      <h1>Covid-19 Tracker</h1>
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />

    </div>
  );
}

export default App;
