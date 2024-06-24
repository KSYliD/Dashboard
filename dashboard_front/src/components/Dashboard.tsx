import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchAdData } from '../api';
import { AdData } from '../types';
import './css/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
    const [data, setData] = useState<AdData[]>([]);
    const [filterValue, setFilterValue] = useState<number | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchAdData();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch ad data:", error);
            }
        };

        (async () => {
            await getData();
        })();
    }, []);

    const handleSort = (order: string) => {
        const sortedData = [...data].sort((a, b) => order === 'asc' ? a.value - b.value : b.value - a.value);
        setData(sortedData);
    };

    const handleFilter = () => {
        if (filterValue !== null) {
            const filteredData = data.filter(item => item.value >= filterValue);
            setData(filteredData);
        } else {
            // Re-fetch data if filter value is cleared
            fetchAdData().then(setData);
        }
    };

    const chartData = {
        labels: data.map(item => item.label),
        datasets: [
            {
                label: 'Ad Performance',
                data: data.map(item => item.value),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="dashboard">
            <h2>Ad Performance Dashboard</h2>
            <div className="controls">
                <div>
                    <button onClick={() => handleSort('asc')}>Sort Ascending</button>
                    <button onClick={() => handleSort('desc')}>Sort Descending</button>
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Filter value"
                        value={filterValue ?? ''}
                        onChange={(e) => setFilterValue(e.target.value ? parseInt(e.target.value) : null)}
                    />
                    <button onClick={handleFilter}>Apply Filter</button>
                </div>
            </div>
            <Line data={chartData} />
        </div>
    );
};

export default Dashboard;
