import { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IncubatorState } from "@/types/incubator";

interface DataPoint extends Partial<IncubatorState> {
  timestamp: number;
}

interface IncubatorChartProps {
  currentState: IncubatorState;
}

export const IncubatorChart = ({ currentState }: IncubatorChartProps) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [timeRange, setTimeRange] = useState<number>(60); // minutes

  // Add new data point
  useEffect(() => {
    const now = Date.now();
    setData((prev) => {
      const newData = [
        ...prev,
        {
          timestamp: now,
          temperature: currentState.temperature,
          humidity: currentState.humidity,
          co2Level: currentState.co2Level,
          confluence: currentState.confluence,
        },
      ];

      // Keep only data points within the selected time range
      const cutoff = now - timeRange * 60 * 1000;
      return newData.filter((point) => point.timestamp >= cutoff);
    });
  }, [currentState, timeRange]);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const timeRangeButtons = [
    { label: "1h", value: 60 },
    { label: "6h", value: 360 },
    { label: "12h", value: 720 },
    { label: "24h", value: 1440 },
  ];

  return (
    <Card className="p-4 bg-black/20 border-incubator-accent1/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-incubator-accent1">
          Real-time Monitoring
        </h3>
        <div className="flex gap-2">
          {timeRangeButtons.map(({ label, value }) => (
            <Button
              key={value}
              variant={timeRange === value ? "default" : "secondary"}
              size="sm"
              onClick={() => setTimeRange(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              stroke="#666"
            />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0D1117",
                border: "1px solid #007AFF",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#007AFF"
              dot={false}
              name="Temperature (°C)"
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#FF2079"
              dot={false}
              name="Humidity (%)"
            />
            <Line
              type="monotone"
              dataKey="co2Level"
              stroke="#39FF14"
              dot={false}
              name="CO2 (%)"
            />
            <Line
              type="monotone"
              dataKey="confluence"
              stroke="#FF7E00"
              dot={false}
              name="Confluence (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
