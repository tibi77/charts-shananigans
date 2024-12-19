import { useState, useMemo, useCallback } from "react";
import { AverageTTH } from "../components/AverageTTH";
import { DataSelectors } from "../components/DataSelectors";
import { InfoCard } from "../components/InfoCard";
import { KeyMetrics } from "../components/KeyMetrics";
import { PassThroughRate } from "../components/PassThroughRate";
import { Pipeline } from "../components/Pipeline";
import { PipelineByRole } from "../components/PipelineByRole";
import { useApplicants } from "../hooks/useApplicants";
import { useDashboard } from "../hooks/useDashboard";

export const Dashboard = () => {
  const { data } = useApplicants();
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const filteredCandidates = useMemo(
    () =>
      data.filter(
        (c) =>
          (selectedRole === "All Roles" || c.role === selectedRole) &&
          (selectedSource === "All Sources" || c.source === selectedSource)
      ),
    [data, selectedRole, selectedSource]
  );
  // Calculate pipeline data
  const getCandidatesByStageAndRole = useCallback(
    (stage: string, role: string) => {
      return filteredCandidates.filter(
        (c) => c.stage === stage && c.role === role
      ).length;
    },
    [filteredCandidates]
  );
  const {
    roles,
    sources,
    stages,
    metrics,
    pipelineData,
    timeToHireByStage,
    passThroughRates,
    bottleneckMarkers,
    stageCounts,
  } = useDashboard({
    data: data ?? [],
    selectedRole,
    selectedSource,
    getCandidatesByStageAndRole,
    filteredCandidates,
  });

  return (
    <div className="p-6 w-[100vw] self-center px-[30vw] py-20">
      <div className="self-center">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Recruiting Pipeline Dashboard</h1>
          <DataSelectors
            roles={roles}
            sources={sources}
            selectedRole={selectedRole}
            selectedSource={selectedSource}
            setSelectedRole={setSelectedRole}
            setSelectedSource={setSelectedSource}
          />
        </div>
        <KeyMetrics metrics={metrics} />

        <Pipeline
          stageCounts={stageCounts}
          stages={stages}
          bottleneckMarkers={bottleneckMarkers}
        />
        <AverageTTH
          timeToHireByStage={timeToHireByStage}
          stages={stages}
          bottleneckMarkers={bottleneckMarkers}
        />
        <PassThroughRate passThroughRates={passThroughRates} stages={stages} />
        <PipelineByRole pipelineData={pipelineData} />
        <InfoCard filteredCandidates={filteredCandidates} />
      </div>
    </div>
  );
};
