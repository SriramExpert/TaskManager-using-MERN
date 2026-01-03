import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsChart = ({ stats }) => {
    const data = {
        labels: ['Todo', 'In Progress', 'Completed'],
        datasets: [
            {
                data: [stats.Todo, stats['In Progress'], stats.Completed],
                backgroundColor: [
                    'rgba(148, 163, 184, 0.2)',
                    'rgba(245, 158, 11, 0.2)',
                    'rgba(16, 185, 129, 0.2)',
                ],
                borderColor: [
                    '#94a3b8',
                    '#f59e0b',
                    '#10b981',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#f8fafc',
                    padding: 20,
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    }
                }
            }
        },
        cutout: '70%',
    };

    return (
        <div style={{ position: 'relative' }}>
            <Doughnut data={data} options={options} />
            <div style={{
                position: 'absolute',
                top: '44%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.Todo + stats['In Progress'] + stats.Completed}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</p>
            </div>
        </div>
    );
};

export default StatsChart;
