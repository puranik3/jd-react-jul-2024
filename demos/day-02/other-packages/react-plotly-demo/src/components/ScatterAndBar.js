import Plot from 'react-plotly.js';

const ScatterAndBar = () => {
    return (
        <div>
            <Plot
                data={[
                    {
                        type: 'scatter',
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                    {
                        type: 'bar',
                        x: [1, 2, 3],
                        y: [2, 5, 3]
                    },
                ]}
                layout={{ width: 640, height: 480, title: 'A Fancy Plot' }}
            />
        </div>
    );
}

export default ScatterAndBar;