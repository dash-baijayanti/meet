import { useState, useEffect } from 'react';
import React from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', '#FF69B4', '#BA55D3', 
  '#00FA9A', '#FFD700', '#FF6347', '#4682B4', '#8A2BE2', '#5F9EA0', '#4B0082', 
  '#7FFF00', '#DC143C', '#00CED1'
];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const getRandomColor = () => {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
};

const TriangleBar = (props) => {
  const { x, y, width, height } = props;
  const fill = getRandomColor();

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// const data = [
//   { "city": "Dubai", "count": 2 },
//   { "city": "Toronto", "count": 2 },
//   { "city": "Santiago", "count": 3 },
//   { "city": "Tokyo", "count": 2 }
// ]

const CityEventsChart = ({ allLocations, events }) => {
 const [data, setData] = useState([]);

 useEffect(() => {
  const getData = () => {
    return allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length;
      const city = location.split((/, | - /))[0];
      return { city, count };
    });
  };
  //  getData();
  setData(getData());
}, [allLocations, events]);

  return (
    <ResponsiveContainer width="99%" height={400}>
      <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 40,
        right: 20,
        left: 10,
        bottom: 75,
      }}
       >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="category" dataKey="city" name="City" 
      angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}
      />
      <YAxis type="number" dataKey="count" name="Number of events" />
      <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
    </ResponsiveContainer>
    
  );
}

export default CityEventsChart;