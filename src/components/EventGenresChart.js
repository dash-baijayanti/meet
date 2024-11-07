import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Genre categories and colors
const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347'];

const EventGenresChart = ({ events }) => {
  // Local state to hold the chart data
  const [data, setData] = useState([]);

  // useEffect hook to update data state when the component mounts or events change
  useEffect(() => {
    const getData = () => {
      return genres.map((genre) => {
        // Filter events that include the current genre in their summary
        const filteredEvents = events.filter((event) => event.summary.includes(genre));
        
        // Return an object for each genre with its name and the number of events
        return {
          name: genre,
          value: filteredEvents.length,
        };
      });
    };

    setData(getData());
  }, [events]); // Only re-run this effect if `events` changes

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={80}
        outerRadius={100}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;