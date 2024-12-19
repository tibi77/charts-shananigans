import { AnnotationOptions } from "chartjs-plugin-annotation";
import { Bar } from "react-chartjs-2";
import React from "react";

export const Pipeline = ({
  stages,
  stageCounts,
  bottleneckMarkers,
}: {
  stages: string[];
  stageCounts: number[];
  bottleneckMarkers: (string | null)[];
}) => {
  return (
    <>
      <h2>Pipeline Stages</h2>
      <Bar
        data={{
          labels: stages,
          datasets: [
            {
              label: "Number of Candidates",
              data: stageCounts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        }}
        options={{
          plugins: {
            annotation: {
              annotations: bottleneckMarkers.map(
                (stage): AnnotationOptions<"line"> => ({
                  type: "line",
                  xMin: stages.indexOf(stage ?? "") - 0.5,
                  xMax: stages.indexOf(stage ?? "") + 0.5,
                  borderColor: "red",
                  borderWidth: 2,
                  label: {
                    content: "Bottleneck",
                    position: "center",
                  },
                })
              ),
            },
          },
        }}
      />
    </>
  );
};
