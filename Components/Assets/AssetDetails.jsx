import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, MapPin, Tag, ShieldAlert, CheckCircle, Network, Eye, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const mockLogs = [
  { timestamp: '2025-01-15 14:32:18', level: 'INFO', message: 'Security scan completed successfully' },
  { timestamp: '2025-01-15 14:30:01', level: 'WARN', message: 'Vulnerability detected: SQL Injection in login.php' },
  { timestamp: '2025-01-15 14:25:45', level: 'INFO', message: 'Asset scan initiated' },
  { timestamp: '2025-01-15 12:15:22', level: 'INFO', message: 'Compliance check passed: CIS-AWS-4.1' },
];

const mockMetrics = [
  { name: 'CPU Usage', value: '45%', status: 'normal' },
  { name: 'Memory Usage', value: '62%', status: 'normal' },
  { name: 'Disk Usage', value: '78%', status: 'warning' },
  { name: 'Network In', value: '125 MB/s', status: 'normal' },
];

export default function AssetDetails({ asset }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!asset) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
            <Server className="w-12 h-12 mb-4" />
            <h3 className="text-lg font-semibold text-slate-300">Select an Asset</h3>
            <p className="text-sm">Click on an asset from the list to view its details here.</p>
        </div>
    );
  }

  return (
    <div className="space-y-6">
        <div>
            <div className="flex items-center gap-3 mb-2">
                <Server className="w-6 h-6 text-blue-400"/>
                <h2 className="text-xl font-bold text-white">{asset.name}</h2>
            </div>
            <p className="text-sm text-slate-400 font-mono ml-9">{asset.id}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-slate-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card className="bg-slate-700/50 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white text-sm">Asset Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Type:</span>
                    <span className="ml-2 text-slate-200">{asset.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Status:</span>
                    <Badge className={asset.status === 'Running' ? 'ml-2 bg-green-600' : 'ml-2 bg-slate-600'}>
                      {asset.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-slate-400">Region:</span>
                    <span className="ml-2 text-slate-200">{asset.region}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">IP:</span>
                    <span className="ml-2 text-slate-200 font-mono">{asset.ip || 'N/A'}</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-slate-400 text-sm">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {asset.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-slate-600 text-slate-300">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card className="bg-slate-700/50 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white text-sm">Security Posture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className={`w-5 h-5 ${asset.vulnerabilities > 0 ? 'text-red-500' : 'text-green-500'}`} />
                    <span className="text-slate-300">Vulnerabilities</span>
                  </div>
                  <span className={`font-bold ${asset.vulnerabilities > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {asset.vulnerabilities} Critical
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-5 h-5 ${asset.compliance === 'Passing' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="text-slate-300">Compliance</span>
                  </div>
                  <Badge className={asset.compliance === 'Passing' ? 'bg-green-600' : 'bg-red-600'}>
                    {asset.compliance}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monitoring" className="space-y-4">
            <Card className="bg-slate-700/50 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white text-sm">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {mockMetrics.map(metric => (
                    <div key={metric.name} className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">{metric.name}:</span>
                      <span className={`font-medium ${
                        metric.status === 'warning' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Activity className="w-4 h-4 mr-2" />
            Rescan Asset
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                <Eye className="w-4 h-4 mr-2" />
                View Logs
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-3xl">
              <DialogHeader>
                <DialogTitle>Asset Logs - {asset.name}</DialogTitle>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {mockLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded bg-slate-700/50">
                      <span className="text-slate-500 text-xs font-mono">{log.timestamp}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          log.level === 'WARN' ? 'border-yellow-500 text-yellow-400' : 'border-slate-500 text-slate-400'
                        }`}
                      >
                        {log.level}
                      </Badge>
                      <span className="text-slate-300 text-sm">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
    </div>
  );
}