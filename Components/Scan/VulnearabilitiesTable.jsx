import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, FileText, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const vulnerabilities = [
  { 
    id: 1,
    severity: 'Critical', 
    finding: 'SQL Injection in login.php', 
    asset: 'prod-web-server-01', 
    remediation: 'Use parameterized queries and input validation.',
    cvss: 9.8,
    cve: 'CVE-2023-1234',
    description: 'The application is vulnerable to SQL injection attacks through the login form. An attacker could bypass authentication or extract sensitive data.',
    recommendation: 'Implement prepared statements, input validation, and web application firewall rules.'
  },
  { 
    id: 2,
    severity: 'High', 
    finding: 'Open Port: 3306 (MySQL)', 
    asset: 'db-prod-main', 
    remediation: 'Restrict access via security groups.',
    cvss: 7.5,
    cve: null,
    description: 'MySQL port 3306 is exposed to the internet, allowing potential brute force attacks against the database.',
    recommendation: 'Configure security groups to allow access only from application servers.'
  },
  { 
    id: 3,
    severity: 'Medium', 
    finding: 'Cross-Site Scripting (XSS)', 
    asset: 'prod-web-server-01', 
    remediation: 'Sanitize user inputs and implement CSP.',
    cvss: 6.1,
    cve: 'CVE-2023-5678',
    description: 'Reflected XSS vulnerability in the search functionality allows execution of malicious scripts.',
    recommendation: 'Implement proper input sanitization and Content Security Policy headers.'
  },
  { 
    id: 4,
    severity: 'Low', 
    finding: 'Outdated Apache Version (2.4.41)', 
    asset: 'prod-web-server-01', 
    remediation: 'Upgrade to the latest stable version.',
    cvss: 3.7,
    cve: null,
    description: 'The web server is running an outdated version of Apache with known security vulnerabilities.',
    recommendation: 'Update Apache to version 2.4.54 or later and review security configurations.'
  },
];

const severityColors = {
  Critical: 'bg-red-600 hover:bg-red-700 text-white',
  High: 'bg-orange-600 hover:bg-orange-700 text-white',
  Medium: 'bg-yellow-600 hover:bg-yellow-700 text-white',
  Low: 'bg-blue-600 hover:bg-blue-700 text-white'
};

const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };

export default function VulnerabilitiesTable({ searchFilter = '' }) {
  const [selectedVuln, setSelectedVuln] = useState(null);

  const filteredVulns = useMemo(() => {
    return vulnerabilities
      .filter(vuln => 
        vuln.finding.toLowerCase().includes(searchFilter.toLowerCase()) ||
        vuln.asset.toLowerCase().includes(searchFilter.toLowerCase()) ||
        vuln.severity.toLowerCase().includes(searchFilter.toLowerCase())
      )
      .sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
  }, [searchFilter]);

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-700/50">
              <TableHead className="text-slate-400">Severity</TableHead>
              <TableHead className="text-slate-400">Finding</TableHead>
              <TableHead className="text-slate-400">Asset</TableHead>
              <TableHead className="text-slate-400">CVSS</TableHead>
              <TableHead className="text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVulns.map((vuln, index) => (
              <motion.tr
                key={vuln.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-slate-700 hover:bg-slate-700/50 transition-colors duration-200"
              >
                <TableCell>
                  <Badge className={severityColors[vuln.severity]}>
                    {vuln.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-slate-300 font-medium">{vuln.finding}</p>
                    {vuln.cve && (
                      <p className="text-slate-500 text-xs mt-1">{vuln.cve}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-slate-300 font-mono text-sm">{vuln.asset}</TableCell>
                <TableCell>
                  <span className={`font-bold ${
                    vuln.cvss >= 9 ? 'text-red-400' :
                    vuln.cvss >= 7 ? 'text-orange-400' :
                    vuln.cvss >= 4 ? 'text-yellow-400' : 'text-blue-400'
                  }`}>
                    {vuln.cvss}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          onClick={() => setSelectedVuln(vuln)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Badge className={severityColors[vuln.severity]}>
                              {vuln.severity}
                            </Badge>
                            {vuln.finding}
                          </DialogTitle>
                        </DialogHeader>
                        {selectedVuln && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-slate-400">Asset</label>
                                <p className="text-slate-200">{selectedVuln.asset}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-400">CVSS Score</label>
                                <p className="text-slate-200">{selectedVuln.cvss}/10</p>
                              </div>
                              {selectedVuln.cve && (
                                <div>
                                  <label className="text-sm font-medium text-slate-400">CVE ID</label>
                                  <p className="text-slate-200">{selectedVuln.cve}</p>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-slate-400">Description</label>
                              <p className="text-slate-200 mt-1">{selectedVuln.description}</p>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-slate-400">Recommendation</label>
                              <Card className="mt-2 bg-slate-700/50 border-slate-600">
                                <CardContent className="p-3">
                                  <p className="text-slate-200">{selectedVuln.recommendation}</p>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Report
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}