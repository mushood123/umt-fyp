import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { getDatabase, ref, get } from "firebase/database";
import "./forecastChart.css";

const ForecastChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const chartTypes = ["bar"];
  const chartColors = ["#FF5733", "#33B5FF", "#28A745", "#FFC107", "#6F42C1"];

  useEffect(() => {
    const fetchJobTypesAndForecast = async () => {
      setLoading(true);
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, "workServices"));
        if (!snapshot.exists()) {
          setLoading(false);
          return;
        }

        const jobTypesData = snapshot.val();
        const jobTypes = Object.values(jobTypesData);

        const chartDataPromises = jobTypes.map(async (jobType, index) => {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_FORECASTING_URL}/v1/predict/requests`,
              {
                stepsToPredict: 5,
                predictionStartDate: new Date().toISOString().split("T")[0],
                job_type: jobType,
                frequency: "daily",
              }
            );

            const forecastData = response.data.forecast;
            if (!forecastData || forecastData.length === 0) return null;

            const values = forecastData.map((item) => item.forecast);
            const dates = forecastData.map((item) => item.date);

            return {
              jobType,
              series: [{ name: jobType, data: values }],
              categories: dates,
              type: chartTypes[index % chartTypes.length],
              color: chartColors[index % chartColors.length],
            };
          } catch (error) {
            console.error(`Error fetching data for ${jobType}`, error);
            return null;
          }
        });

        const results = await Promise.all(chartDataPromises);
        setChartData(results.filter((data) => data !== null));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchJobTypesAndForecast();
  }, []);

  return (
    <div className="forecast-container">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      ) : (
        chartData.map((chart, index) => {
          const options = {
            chart: {
              id: `${chart.jobType}-chart`,
              type: chart.type,
              animations: {
                enabled: true,
                easing: "easeinout",
                speed: 1000,
              },
              zoom: { enabled: false },
              toolbar: { show: false },
            },
            colors: [chart.color],
            xaxis: {
              categories: chart.categories,
              title: { text: "Date" },
            },
            yaxis: {
              title: { text: "Forecast Value" },
            },
            stroke: { curve: "smooth" },
            title: {
              text: `${chart.jobType} Forecast`,
              align: "center",
              style: { fontSize: "18px", fontWeight: "bold" },
            },
            dataLabels: {
              position: "top",
              enabled:
                chart.type === "pie" || chart.type === "line" ? false : true,
            },
          };

          return (
            <div key={index} className="chart-box">
              <Chart
                options={options}
                series={chart.series}
                type={chart.type}
                height={350}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default ForecastChart;
