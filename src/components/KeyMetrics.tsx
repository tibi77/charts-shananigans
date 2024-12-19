import React from "react";

type KeyMetricsProps = {
  metrics: {
    totalCandidates: number;
    activeOffers: number;
    avgTimeToHire: number;
    offerAcceptRate: number;
  };
};
export const KeyMetrics = ({ metrics }: KeyMetricsProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-800/50">
        <div className="text-sm text-blue-400">Total Candidates</div>
        <div className="text-2xl font-bold text-blue-200">
          {metrics.totalCandidates}
        </div>
      </div>
      <div className="p-4 bg-green-900/30 rounded-lg border border-green-800/50">
        <div className="text-sm text-green-400">Active Offers</div>
        <div className="text-2xl font-bold text-green-200">
          {metrics.activeOffers}
        </div>
      </div>
      <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-800/50">
        <div className="text-sm text-purple-400">Avg Time to Hire</div>
        <div className="text-2xl font-bold text-purple-200">
          {metrics.avgTimeToHire} days
        </div>
      </div>
      <div className="p-4 bg-orange-900/30 rounded-lg border border-orange-800/50">
        <div className="text-sm text-orange-400">Offer Accept Rate</div>
        <div className="text-2xl font-bold text-orange-200">
          {metrics.offerAcceptRate}%
        </div>
      </div>
    </div>
  );
};
