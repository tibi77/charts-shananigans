import { useState, useMemo, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

// Sample data - in real app would come from API
const generateSampleData = (numCandidates = 50) => ({
  candidates: Array.from({ length: numCandidates }, (_, index) => ({
    id: index + 1,
    name: `Candidate ${index + 1}`,
    stage: [
      "Applied",
      "Phone Screen",
      "Technical Interview",
      "Onsite",
      "Offer",
      "Hired",
    ][Math.floor(Math.random() * 6)],
    source: [
      "LinkedIn",
      "Internal Referral",
      "Indeed",
      "Stack Overflow",
      "Company Website",
    ][Math.floor(Math.random() * 5)],
    role: [
      "Frontend Engineer",
      "Backend Engineer",
      "Data Scientist",
      "Product Manager",
      "DevOps Engineer",
    ][Math.floor(Math.random() * 5)],
    salary_band: ["Junior", "Mid", "Senior"][Math.floor(Math.random() * 3)],
    timeInStage: Math.floor(Math.random() * 14) + 1, // Days in current stage
    totalTime: Math.floor(Math.random() * 45) + 5, // Total days in pipeline
    priority: Math.random() > 0.7 ? "High" : "Normal", // Some candidates marked high priority
  })),
});

const RecruitingDashboard = () => {
  const [data] = useState(generateSampleData());
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedSource, setSelectedSource] = useState("All Sources");

  const roles = useMemo(
    () => ["All Roles", ...new Set(data.candidates.map((c) => c.role))],
    [data]
  );

  const sources = useMemo(
    () => ["All Sources", ...new Set(data.candidates.map((c) => c.source))],
    [data]
  );

  const stages = useMemo(
    () => [
      "Applied",
      "Phone Screen",
      "Technical Interview",
      "Onsite",
      "Offer",
      "Hired",
    ],
    []
  );

  const filteredCandidates = useMemo(
    () =>
      data.candidates.filter(
        (c) =>
          (selectedRole === "All Roles" || c.role === selectedRole) &&
          (selectedSource === "All Sources" || c.source === selectedSource)
      ),
    [data.candidates, selectedRole, selectedSource]
  );

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

  // Calculate pipeline data
  const getCandidatesByStageAndRole = useCallback(
    (stage: string, role: string) => {
      return filteredCandidates.filter(
        (c) => c.stage === stage && c.role === role
      ).length;
    },
    [filteredCandidates]
  );

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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recruiting Pipeline Dashboard</h1>
        <div className="flex gap-4">
          <select
            className="p-2 border rounded"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-600">Total Candidates</div>
          <div className="text-2xl font-bold">{metrics.totalCandidates}</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-sm text-green-600">Active Offers</div>
          <div className="text-2xl font-bold">{metrics.activeOffers}</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="text-sm text-purple-600">Avg Time to Hire</div>
          <div className="text-2xl font-bold">{metrics.avgTimeToHire} days</div>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="text-sm text-orange-600">Offer Accept Rate</div>
          <div className="text-2xl font-bold">{metrics.offerAcceptRate}%</div>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Pipeline by Stage and Role
        </h2>
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

      {/* Priority Candidates Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Priority Candidates</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Stage
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Time in Stage
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Source
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCandidates
                .filter((c) => c.priority === "High")
                .map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="p-3">{candidate.name}</td>
                    <td className="p-3">{candidate.role}</td>
                    <td className="p-3">{candidate.stage}</td>
                    <td className="p-3">{candidate.timeInStage} days</td>
                    <td className="p-3">{candidate.source}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecruitingDashboard;
