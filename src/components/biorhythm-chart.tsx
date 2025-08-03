'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { addDays, format } from 'date-fns';
import { calculateBiorhythm } from '@/lib/biorhythm';

type BiorhythmChartProps = {
  birthDate: Date;
};

export function BiorhythmChart({ birthDate }: BiorhythmChartProps) {

  const chartData = React.useMemo(() => {
    if (!birthDate) {
     //console.log('[BiorhythmChart] birthDate falsy:', birthDate);
      return [];
    }
    const today = new Date();
    const data = [];
    for (let i = -14; i <= 14; i++) {
      const date = addDays(today, i);
      const rhythms = calculateBiorhythm(birthDate, date);
      data.push({
        date: format(date, 'MM/dd'),
        '신체': rhythms.physical,
        '감성': rhythms.emotional,
        '지성': rhythms.intellectual,
        '지각': rhythms.perceptual,
      });
    }
  //console.log('[BiorhythmChart] chartData:', data);
    return data;
  }, [birthDate]);

  if (!birthDate) return null;

  return (
    <motion.div
      className="w-full h-[300px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.7} />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis domain={[-1.1, 1.1]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            formatter={(value: number) => value.toFixed(2)}
          />
          <Legend wrapperStyle={{fontSize: "14px"}}/>
          <ReferenceLine x={format(new Date(), 'MM/dd')} label={{ value: "오늘", position: "insideTopLeft", fill: "hsl(var(--primary))"}} stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="3 3" />
          <Line type="monotone" dataKey="신체" stroke="hsl(var(--chart-1))" dot={false} strokeWidth={2.5} />
          <Line type="monotone" dataKey="감성" stroke="hsl(var(--chart-2))" dot={false} strokeWidth={2.5} />
          <Line type="monotone" dataKey="지성" stroke="hsl(var(--chart-3))" dot={false} strokeWidth={2.5} />
          <Line type="monotone" dataKey="지각" stroke="hsl(var(--chart-4))" dot={false} strokeWidth={2.5} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}