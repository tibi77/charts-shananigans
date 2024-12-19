import { AnnotationOptions } from "chartjs-plugin-annotation";
import { Line } from "react-chartjs-2";

export const AverageTTH = ({
  stages,
  timeToHireByStage,
  bottleneckMarkers,
}: {
  stages: string[];
  timeToHireByStage: number[];
  bottleneckMarkers: (string | null)[];
}) => {
  return (
    <>
      <h2>Time to Hire Trends</h2>
      <Line
        data={{
          labels: stages,
          datasets: [
            {
              label: "Average Time to Hire (days)",
              data: timeToHireByStage,
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.4)",
            },
          ],
        }}
        options={{
          plugins: {
            annotation: {
              annotations: bottleneckMarkers.map(
                (stage): AnnotationOptions<"point"> => ({
                  type: "point",
                  xValue: stages.indexOf(stage ?? ""),
                  yValue: timeToHireByStage[stages.indexOf(stage ?? "")],
                  backgroundColor: "red",
                  radius: 5,
                })
              ),
            },
          },
        }}
      />
    </>
  );
};
