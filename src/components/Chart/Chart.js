import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'

import { fetchDailyData } from '../../api'

import styles from './Chart.module.css'

export default function Chart({ data: { confirmed, recovered, deaths }, country }) {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, [])


    const lineChart = (
        dailyData
            ? (<Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }]
                }}
            />) : null
    )
    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['rgb(118, 118, 238)', 'rgb(110, 211, 110)', 'rgb(241, 104, 104)'],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }],

                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `${country}` }
                    }} />
            ) : null

    )
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}
