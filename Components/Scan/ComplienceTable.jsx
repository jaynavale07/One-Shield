import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, ExternalLink, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const compliance = [
  { 
    id: 1,
    status: 'Fail', 
    checkId: 'CIS-AWS-2.8', 
    description: 'Ensure S3 bucket access logging is enabled', 
    asset: 'customer-data-bucket-xyz',
    framework: 'CIS AWS',
    severity: 'High',
    remediation: 'Enable S3 server access logging for all S3 buckets containing sensitive data.',
    impact: 'Without access logging, security incidents involving S3 buckets cannot be properly investigated.'
  },
  { 
    id: 2,
    status: 'Fail', 
    checkId: 'CIS-AWS-1.1', 
    description: 'IAM root user access key should not exist', 
    asset: 'AWS Account',
    framework: 'CIS AWS',
    severity: 'Critical',
    remediation: 'Remove all access keys associated with the root user account and use IAM users instead.',
    impact: 'Root user access keys provide unrestricted access to all AWS resources and services.'
  },
  { 
    id: 3,
    status: 'Pass', 
    checkId: 'CIS-AWS-4.1', 
    description: 'Ensure no security groups allow ingress from 0.0.0.0/0 to port 22', 
    asset: 'sg-prod-main',
    framework: 'CIS AWS',
    severity: 'High',
    remediation: 'This check is already compliant.',
    impact: 'SSH access is properly restricted to specific IP ranges.'
  },
  { 
    id: 4,
    status: 'Pass', 
    checkId: 'CIS-AWS-2.1', 
    description: 'Ensure CloudTrail is enabled in all regions', 
    asset: 'AWS Account',
    framework: 'CIS AWS',
    severity: 'Medium',
    remediation: 'This check is already compliant.',
    impact: 'CloudTrail provides comprehensive logging of API calls across all regions.'
  },
];

export default function ComplianceTable({ searchFilter = '' }) {
  const [selectedCheck, setSelectedCheck] = useState(null);

  const filteredChecks = useMemo(() => {
    return compliance.filter(check => 
      check.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      check.checkId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      check.asset.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [searchFilter]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-700/50">
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-slate-400">Check ID</TableHead>
              <TableHead className="text-slate-400">Description</TableHead>
              <TableHead className="text-slate-400">Asset</TableHead>
              <TableHead className="text-slate-400">Severity</TableHead>
              <TableHead className="text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChecks.map((check, index) => (
              <motion.tr
                key={check.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-slate-700 hover:bg-slate-700/50 transition-colors duration-200"
              >
                <TableCell>
                  <Badge
                    className={check.status === 'Pass' 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                    }
                  >
                    {check.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-300 font-mono text-sm">{check.checkId}</TableCell>
                <TableCell className="text-slate-300 max-w-md">
                  <div className="truncate" title={check.description}>
                    {check.description}
                  </div>
                </TableCell>
                <TableCell className="text-slate-400 font-mono text-sm">{check.asset}</TableCell>
                <TableCell>
                  <span className={`font-medium ${getSeverityColor(check.severity)}`}>
                    {check.severity}
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
                          onClick={() => setSelectedCheck(check)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Badge className={check.status === 'Pass' ? 'bg-green-600' : 'bg-red-600'}>
                              {check.status}
                            </Badge>
                            {check.checkId}
                          </DialogTitle>
                        </DialogHeader>
                        {selectedCheck && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-slate-400">Framework</label>
                                <p className="text-slate-200">{selectedCheck.framework}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-400">Severity</label>
                                <p className={`font-medium ${getSeverityColor(selectedCheck.severity)}`}>
                                  {selectedCheck.severity}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <label className="text-sm font-medium text-slate-400">Asset</label>
                                <p className="text-slate-200 font-mono">{selectedCheck.asset}</p>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-slate-400">Description</label>
                              <p className="text-slate-200 mt-1">{selectedCheck.description}</p>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-slate-400">Business Impact</label>
                              <p className="text-slate-200 mt-1">{selectedCheck.impact}</p>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-slate-400">Remediation</label>
                              <Card className="mt-2 bg-slate-700/50 border-slate-600">
                                <CardContent className="p-3">
                                  <p className="text-slate-200">{selectedCheck.remediation}</p>
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
                      <BookOpen className="w-3 h-3 mr-1" />
                      Guide
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