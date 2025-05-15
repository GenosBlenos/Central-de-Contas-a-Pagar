import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface Props {
  data: Array<{
    data: string;
    valor: number;
  }>;
}

export const GraficoLinhas: React.FC<Props> = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="data" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="valor"
        stroke="#8884d8"
        strokeWidth={2}
      />
    </LineChart>
  );
};