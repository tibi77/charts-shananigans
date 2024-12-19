import { Bar } from "react-chartjs-2";

export const PassThroughRate = ({
  stages,
  passThroughRates,
}: {
  stages: string[];
  passThroughRates: number[];
}) => {
  return (
    <>
      <h2>Pass-Through Rates</h2>
      <Bar
        data={{
          labels: stages,
          datasets: [
            {
              label: "Pass-Through Rate (%)",
              data: passThroughRates,
              backgroundColor: "rgba(255, 159, 64, 0.6)",
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        }}
      />
    </>
  );
};
