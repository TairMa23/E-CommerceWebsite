import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const AverageRatingsChart: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/admin/average-ratings"
        );

        // הסר את ה-_id מהנתונים
        const { _id, ...ratingsData } = response.data;
        setData(ratingsData);
      } catch (error) {
        console.error("Error fetching average ratings:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Average Ratings",
        data: Object.values(data),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 5, // קובע את המקסימום ל-5
      },
    },
  };

  return (
    <div>
      <h2>Average Ratings Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AverageRatingsChart;
