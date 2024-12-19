import React from "react";
import { Candidate } from "../hooks/useApplicants";

export const InfoCard = ({
  filteredCandidates,
}: {
  filteredCandidates: Candidate[];
}) => {
  return (
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
  );
};
