import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
} from "recharts";

function GetBookPieChart() {
  const data = [
    { name: "Books in Library", users: 1000, fill: '#e6bd32' },
    { name: "Borrowed Books", users: 600, fill: '#ca9d32' },
    { name: "Overdue Books", users: 50, fill: '#ad761c' },
  ];

  return (
    <div className="App">
      <PieChart width={600} height={400}>
        <Pie
          dataKey="users"
          isAnimationActive={true}
          data={data}
          cx={300}
          cy={150}
          outerRadius={100}
          label
        />
        <Tooltip/>
      </PieChart>
    </div>
  );
};

export default GetBookPieChart;