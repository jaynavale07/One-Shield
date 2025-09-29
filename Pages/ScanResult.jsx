
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Target, Filter, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import VulnerabilitiesTable from "../components/scan/VulnerabilitiesTable";
import ComplianceTable from "../components/scan/ComplianceTable";
import ScanSummaryCharts from "../components/scan/ScanSummaryCharts";
import { motion } from "framer-motion";

export default function ScanResults() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("vulnerabilities");
  const [searchFilter, setSearchFilter] = useState("");
  
  // Parse scan ID from URL params
  const searchParams = new URLSearchParams(location.search);
  const scanId = searchParams.get('id') || 'scan-12345';

  const scanData = {
    id: scanId,
    date: "January 15, 2025",
    startTime: "14:30 UTC",
    duration: "4m 32s",
    status: "Completed",
    assetsScanned: 3,
    totalFindings: 27,
    summary: {
      vulnerabilities: {
        critical: 4,
        high: 8,
        medium: 15,
        low: 0
      },
      compliance: {
        passed: 210,
        failed: 38
      }
    }
  };

  const handleExportPDF = () => {
    // Simulate PDF export
    alert("PDF report would be generated and downloaded");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Scan Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-slate-800 border-slate-700 shadow-lg">
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-green-600 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {scanData.status}
                  </Badge>
                  <Badge variant="outline" className="border-slate-500 text-slate-300">
                    {scanData.duration}
                  </Badge>
                </div>
                <CardTitle className="text-white text-2xl mb-3">
                  Scan Report: {scanData.id}
                </CardTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span>{scanData.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>{scanData.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Target className="w-4 h-4" />
                    <span>{scanData.assetsScanned} assets</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{scanData.totalFindings} findings</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <ScanSummaryCharts data={scanData.summary} />
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleExportPDF}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    Schedule Rescan
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-red-900/20 border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{scanData.summary.vulnerabilities.critical}</div>
            <div className="text-sm text-red-300">Critical</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-900/20 border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{scanData.summary.vulnerabilities.high}</div>
            <div className="text-sm text-orange-300">High</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-900/20 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{scanData.summary.vulnerabilities.medium}</div>
            <div className="text-sm text-yellow-300">Medium</div>
          </CardContent>
        </Card>
        <Card className="bg-green-900/20 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{scanData.summary.compliance.passed}</div>
            <div className="text-sm text-green-300">Compliance Passed</div>
          </CardContent>
        </Card>
      </div>

      {/* Results Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-slate-800 border-slate-700 shadow-lg">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <TabsList className="bg-slate-700">
                  <TabsTrigger 
                    value="vulnerabilities"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Vulnerabilities ({scanData.summary.vulnerabilities.critical + scanData.summary.vulnerabilities.high + scanData.summary.vulnerabilities.medium})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="compliance"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Compliance ({scanData.summary.compliance.failed})
                  </TabsTrigger>
                </TabsList>
                 <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Filter findings..." 
                      className="bg-slate-700 border-slate-600 text-white w-64"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                    />
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                        <Filter className="w-4 h-4 mr-2"/>
                        Filter
                    </Button>
                 </div>
              </div>
            </CardHeader>
            <CardContent>
                <TabsContent value="vulnerabilities">
                  <VulnerabilitiesTable searchFilter={searchFilter} />
                </TabsContent>
                <TabsContent value="compliance">
                  <ComplianceTable searchFilter={searchFilter} />
                </TabsContent>
            </CardContent>
          </Card>
        </motion.div>
      </Tabs>
    </div>
  );
}
