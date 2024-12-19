import React from "react";
import { Bar } from "react-chartjs-2";

type TPipelineData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    stack: string;
  }[];
};

export const PipelineByRole = ({
  pipelineData,
}: {
  pipelineData: TPipelineData;
}) => {
  return (
    <div className="bg-[#242424]  p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Pipeline by Stage and Role</h2>
      <Bar
        data={pipelineData}
        options={{
          responsive: true,
          scales: {
            x: { stacked: true },
            y: { stacked: true },
          },
          plugins: {
            legend: {
              position: "top",
              labels: { padding: 20 },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label ?? "";
                  const value = context.parsed.y ?? 0;
                  return `${label}: ${value} candidates`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};
