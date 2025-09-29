import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Server, Database } from "lucide-react";
import { motion } from "framer-motion";

const highRiskAssets = [
  { name: 'prod-web-server-01', type: 'EC2 Instance', vulnerabilities: 3, icon: Server },
  { name: 'db-prod-main', type: 'RDS Database', vulnerabilities: 1, icon: Database },
  { name: 'prod-login-api', type: 'EC2 Instance', vulnerabilities: 1, icon: Server },
];

export default function HighRiskAssets() {
  return (
    <Card className="bg-slate-800 border-slate-700 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertTriangle className="text-red-500" />
          High-Risk Assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {highRiskAssets.map((asset, index) => (
            <motion.div
              key={asset.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <asset.icon className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-200">{asset.name}</p>
                  <p className="text-xs text-slate-400">{asset.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-red-500">{asset.vulnerabilities}</p>
                <p className="text-xs text-slate-400">Critical</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}