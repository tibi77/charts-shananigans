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
  );
};
