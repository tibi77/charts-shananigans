import { useMemo } from "react";
import { Candidate, STAGES } from "./useApplicants";

export const useDashboard = ({
  data,
  selectedRole,
  selectedSource,
  getCandidatesByStageAndRole,
  filteredCandidates,
}: {
  data: Candidate[];
  selectedRole: string;
  selectedSource: string;
  getCandidatesByStageAndRole: (stage: string, role: string) => number;
  filteredCandidates: Candidate[];
}) => {
  const roles = useMemo(
    () => ["All Roles", ...new Set(data.map((c) => c.role))],
    [data]
  );

  const sources = useMemo(
    () => ["All Sources", ...new Set(data.map((c) => c.source))],
    [data]
  );

  const stages = STAGES;

  // Metrics calculations
  const metrics = useMemo(() => {
    const totalCandidates = filteredCandidates.length;
    const activeOffers = filteredCandidates.filter(
      (c) => c.stage === "Offer"
    ).length;
    const avgTimeToHire =
      filteredCandidates
        .filter((c) => c.stage === "Hired")
        .reduce((acc, c) => acc + c.totalTime, 0) /
        filteredCandidates.filter((c) => c.stage === "Hired").length || 0;

    return {
      totalCandidates,
      activeOffers,
      avgTimeToHire: Math.round(avgTimeToHire),
      offerAcceptRate: Math.round(
        (filteredCandidates.filter((c) => c.stage === "Hired").length /
          (filteredCandidates.filter((c) =>
            ["Hired", "Offer"].includes(c.stage)
          ).length || 1)) *
          100
      ),
    };
  }, [filteredCandidates]);

  const pipelineData = useMemo(() => {
    return {
      labels: stages,
      datasets: roles
        .filter((role) => role !== "All Roles")
        .map((role, index) => {
          const data = stages.map((stage) =>
            getCandidatesByStageAndRole(stage, role)
          );
          return {
            label: role,
            data,
            backgroundColor: `hsla(${
              index * (360 / roles.length)
            }, 70%, 50%, 0.6)`,
            stack: "stack1",
          };
        }),
    };
  }, [getCandidatesByStageAndRole, roles, stages]);
  const filteredData = useMemo(
    () =>
      data.filter((candidate) => {
        return (
          (selectedRole === "All Roles" || candidate.role === selectedRole) &&
          (selectedSource === "All Sources" ||
            candidate.source === selectedSource)
        );
      }),
    [data, selectedRole, selectedSource]
  );
  const stageCounts = useMemo(
    () =>
      stages.map(
        (stage) =>
          filteredData.filter((candidate) => candidate.stage === stage).length
      ),
    [filteredData, stages]
  );

  const bottleneckMarkers = useMemo(
    () =>
      stageCounts
        .map((count, index) => {
          const prevCount = index > 0 ? stageCounts[index - 1] : count;
          return count < prevCount ? stages[index] : null;
        })
        .filter(Boolean),
    [stageCounts, stages]
  );
  const timeToHireByStage = useMemo(
    () =>
      stages.map((stage) => {
        const stageData = filteredData.filter(
          (candidate) => candidate.stage === stage
        );
        return stageData.length > 0
          ? stageData.reduce(
              (sum, candidate) => sum + candidate.timeToHire,
              0
            ) / stageData.length
          : 0;
      }),
    [filteredData, stages]
  );

  const passThroughRates = useMemo(
    () =>
      stages.map((stage, index) => {
        if (index === 0) return 100; // Initial stage is 100%
        const prevStageCount = filteredData.filter(
          (candidate) => candidate.stage === stages[index - 1]
        ).length;
        const currStageCount = filteredData.filter(
          (candidate) => candidate.stage === stage
        ).length;
        return prevStageCount > 0 ? (currStageCount / prevStageCount) * 100 : 0;
      }),
    [filteredData, stages]
  );

  return {
    roles,
    stageCounts,
    sources,
    stages,
    metrics,
    pipelineData,
    bottleneckMarkers,
    timeToHireByStage,
    passThroughRates,
  };
};
