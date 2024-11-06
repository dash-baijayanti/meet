import { useState, useEffect } from 'react';
import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
 const [data, setData] = useState([]);

 useEffect(() => {
  const getData = () => {
    return allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length;
      const city = location.split(', ')[0];
      return { city, count };
    });
  };

  setData(getData());
}, [allLocations, events]);

  return (
    <div style={{ width: '99%', height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="category" dataKey="city" name="city" unit="cm" />
          <YAxis type="number" dataKey="count" name="Number of events"allowDecimals={false}  />
          <Tooltip cursor={{ strokeDasharray: '3 3' }}  />
          <Legend />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}


export default CityEventsChart;