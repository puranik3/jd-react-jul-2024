import Plot from 'react-plotly.js';

const GroupedBarChart = (props) => {
    const plot1 = {
        x: ["Microwave", "Washing Machine", "Tv", "Vacuum Cleaner", "Hair Dryer"],
        y: [4, 5, 6, 1, 4],
        name: "2016",
        type: "bar",
    };

    const plot2 = {
        x: ["Microwave", "Washing Machine", "Tv", "Vacuum Cleaner", "Hair Dryer"],
        y: [12, 3, 5, 6, 2],
        name: "2017",
        type: "bar",
    };

    const data = [plot1, plot2];

    return (
        <div>
            <Plot
                config={{ responsive: true }}
                data={data}
                layout={{ autosize: true, title: 'Electronics Prices 2016/2017', xaxis: { title: "Home Appliances" }, yaxis: { title: "Sales" }, scrollZoom: true }}
                useResizeHandler={true}
                style={{ width: "100%", height: '100%' }}
            />
        </div>
    );
};

export default GroupedBarChart;