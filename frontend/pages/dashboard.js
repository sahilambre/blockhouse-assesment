import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import axios from "axios";
import { Chart } from "react-google-charts";

const Dashboard = () => {
  const [candlestickData, setCandlestickData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candlestickResponse = await axios.get(
          "http://127.0.0.1:8000/api/candlestick-data/"
        );
        const fetchedCandlestickData = candlestickResponse.data.data;
        const formattedCandlestickData = [
          ["Date", "Low", "Open", "Close", "High"],
          ...fetchedCandlestickData.map((item) => [
            new Date(item.x),
            item.low,
            item.open,
            item.close,
            item.high,
          ]),
        ];
        setCandlestickData(formattedCandlestickData);

        const lineResponse = await axios.get(
          "http://127.0.0.1:8000/api/line-chart-data/"
        );
        const formattedLineData = lineResponse.data.labels.map(
          (label, index) => ({
            labels: label,
            data: lineResponse.data.data[index],
          })
        );
        setLineData(formattedLineData);

        const barResponse = await axios.get(
          "http://127.0.0.1:8000/api/bar-chart-data/"
        );
        const formattedBarData = barResponse.data.labels.map(
          (label, index) => ({
            labels: label,
            data: barResponse.data.data[index],
          })
        );
        setBarData(formattedBarData);

        const pieResponse = await axios.get(
          "http://127.0.0.1:8000/api/pie-chart-data/"
        );
        const formattedPieData = pieResponse.data.labels.map(
          (label, index) => ({
            labels: label,
            data: pieResponse.data.data[index],
          })
        );
        setPieData(formattedPieData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const candlestickChartOptions = {
    title: "Candlestick Chart",
    legend: { position: "none" },
    hAxis: {
      format: "M/d/yy",
    },
    vAxis: {
      title: "Price",
    },
  };

  return (
    <div className="dashboard-container bg-gray-100 min-h-screen p-8">
      <div className="header mb-16 mt-8">
        <h1 className="text-4xl font-semi text-center text-black">
          <span className="border border-none p-4 pr-8 pl-8 rounded-full bg-[#A1EAFB]">
            Dashboard
          </span>
        </h1>
      </div>

      <div className="charts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Line Chart */}
        <div className="chart-card p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-8">
            Line Chart
          </h2>
          <LineChart width={300} height={300} data={lineData}>
            <XAxis dataKey="labels" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="data" stroke="#8884d8" />
          </LineChart>
        </div>

        {/* Bar Chart */}
        <div className="chart-card p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-8">
            Bar Chart
          </h2>
          <BarChart width={310} height={300} data={barData}>
            <XAxis dataKey="labels" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="data" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="chart-card p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-8">
            Pie Chart
          </h2>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              dataKey="data"
              nameKey="labels"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Candlestick Chart */}
        <div className="chart-card p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-8">
            Candlestick Chart
          </h2>
          <Chart
            chartType="CandlestickChart"
            data={candlestickData}
            options={candlestickChartOptions}
            width="100%"
            height="400px"
            legendToggle
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
