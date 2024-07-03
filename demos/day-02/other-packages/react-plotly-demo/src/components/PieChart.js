import { useState } from 'react';
import Plot from 'react-plotly.js';

const PieChart = (props) => {
    const [values, setValues] = useState([112, 454, 65, 544]);

    const candidates = ["Virat", "Dhoni", "Sachin", "Dravid"];
    const moreCandidates = ["Rohit", "Anil", "Sehwag"]

    const [labels, setLabels] = useState(candidates);

    const setRandomValues = (numCandidates = 4) => {
        const values = [];

        for (let i = 0; i < numCandidates; ++i) {
            values.push(101 + Math.floor(Math.random() * 900));
        }

        setValues(values);

        if (numCandidates > 4) {
            const newLabels = candidates.concat(moreCandidates.slice(0, numCandidates - 4))
            console.log(newLabels);
            setLabels(newLabels);
        }

    };

    const setMoreCandidates = () => {
        const numCandidates = 5 + Math.random(Math.floor(Math.random() * 3));
        setRandomValues(numCandidates)
    };

    var data = [
        {
            values: values,
            labels: labels,
            type: "pie",
        },
    ];

    return (
        <div>
            <button onClick={() => setRandomValues()}>Set new data</button>
            <button onClick={() => setMoreCandidates()}>Set 5, 6, or 7 candidates</button>
            <div>Data is generated randomly here, but you generally would get the data from an API call.</div>
            <Plot
                data={data}
                layout={{ font: { size: 18 }, width: 500, height: 500, title: 'Percentage of votes for favorite cricketer of last 25 years' }}
            />
        </div>
    )
}

export default PieChart;