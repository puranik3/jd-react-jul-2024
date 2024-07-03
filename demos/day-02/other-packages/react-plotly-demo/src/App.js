import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import ScatterAndBar from "./components/ScatterAndBar";
import GroupedBarChart from "./components/GroupedBarCharts";
import PieChart from "./components/PieChart";

function App() {
  return (
    <BrowserRouter>
      <Link to="/chart1" style={{ marginRight: 32 }}>Chart 1</Link>
      <Link to="/chart2" style={{ marginRight: 32 }}>Chart 2</Link>
      <Link to="/chart3" style={{ marginRight: 32 }}>Chart 3</Link>

      <Routes>
        <Route path="chart1" element={<ScatterAndBar />} />
        <Route path="chart2" element={<GroupedBarChart />} />
        <Route path="chart3" element={<PieChart />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
