import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";

import MetricCard from "../components/dashboard/MetricCard";
import VulnerabilityChart from "../components/dashboard/VulnerabilityChart";
import ComplianceChart from "../components/dashboard/ComplianceChart";
import RecentScansTable from "../components/dashboard/RecentScansTable";
import HighRiskAssets from "../components/dashboard/HighRiskAssets";
import ActivityFeed from "../components/dashboard/ActivityFeed";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleViewResults = (scanId) => {
    navigate(createPageUrl(`ScanResults?id=${scanId}`));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Assets Monitored"
          value="142"
          icon={Shield}
          trend="+12%"
          trendDirection="up"
          color="blue"
        />
        <MetricCard
          title="Critical Vulnerabilities"
          value="12"
          icon={AlertTriangle}
          trend="-3%"
          trendDirection="down"
          color="red"
        />
        <MetricCard
          title="Compliance Score"
          value="85%"
          icon={CheckCircle}
          trend="+5%"
          trendDirection="up"
          color="green"
        />
        <MetricCard
          title="Last Scan"
          value="2 hours ago"
          icon={Clock}
          color="amber"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <VulnerabilityChart />
        </div>
        <div className="lg:col-span-2">
           <ComplianceChart />
        </div>
      </div>

      {/* Tables and Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <RecentScansTable onViewResults={handleViewResults} />
        </div>
        <div className="space-y-6">
            <HighRiskAssets />
            <ActivityFeed />
        </div>
      </div>
    </div>
  );
}