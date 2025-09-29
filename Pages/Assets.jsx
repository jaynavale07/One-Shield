import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import AssetTable from "../components/assets/AssetTable";
import AssetDetails from "../components/assets/AssetDetails";

const assets = [
  { id: 'i-0123abcd', name: 'prod-web-server-01', type: 'EC2 Instance', region: 'us-east-1', status: 'Running', ip: '172.31.16.8', tags: ['web', 'prod'], vulnerabilities: 3, compliance: 'Failing' },
  { id: 's3-customer-data', name: 'customer-data-bucket-xyz', type: 'S3 Bucket', region: 'us-east-1', status: 'Running', ip: null, tags: ['data', 'pii'], vulnerabilities: 1, compliance: 'Failing' },
  { id: 'db-prod-main', name: 'prod-main-database', type: 'RDS Database', region: 'ap-south-1', status: 'Running', ip: 'rds.amazonaws.com', tags: ['database', 'prod'], vulnerabilities: 1, compliance: 'Passing' },
  { id: 'i-0456efgh', name: 'dev-test-instance', type: 'EC2 Instance', region: 'us-east-1', status: 'Stopped', ip: null, tags: ['dev', 'testing'], vulnerabilities: 0, compliance: 'Passing' },
  { id: 's3-app-logs', name: 'application-logs-bucket', type: 'S3 Bucket', region: 'us-west-2', status: 'Running', ip: null, tags: ['logs'], vulnerabilities: 0, compliance: 'Passing' },
];

export default function Assets() {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);

  const handleStartAudit = () => {
    navigate(createPageUrl("ScanResults"));
  };

  return (
    <div className="flex h-full">
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Asset Management</h2>
                <p className="text-slate-400">Discover, manage, and audit your cloud infrastructure assets.</p>
            </div>

            <AssetTable 
                assets={assets}
                onStartAudit={handleStartAudit}
                onAssetSelect={setSelectedAsset}
                selectedAsset={selectedAsset}
            />
        </div>
        <div className="w-1/3 min-w-[400px] border-l border-slate-700 bg-slate-800/50 p-6 overflow-y-auto">
            <AssetDetails asset={selectedAsset} />
        </div>
    </div>
  );
}