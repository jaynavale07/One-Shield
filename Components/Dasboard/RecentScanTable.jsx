import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { motion } from "framer-motion";

const scans = [
  { id: 'scan-12345', date: '2025-01-15', targets: 3, status: 'Completed', findings: 27 },
  { id: 'scan-12344', date: '2025-01-14', targets: 1, status: 'Completed', findings: 5 },
  { id: 'scan-12343', date: '2025-01-14', targets: 15, status: 'In Progress', findings: 0 },
  { id: 'scan-12342', date: '2025-01-13', targets: 8, status: 'Completed', findings: 12 },
];

export default function RecentScansTable({ onViewResults }) {
  return (
    <Card className="bg-slate-800 border-slate-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white">Recent Scans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-700/50">
                <TableHead className="text-slate-400">Scan ID</TableHead>
                <TableHead className="text-slate-400">Date</TableHead>
                <TableHead className="text-slate-400">Targets</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Findings</TableHead>
                <TableHead className="text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scans.map((scan, index) => (
                <motion.tr
                  key={scan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-slate-700 hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <TableCell className="text-slate-300 font-mono text-sm">{scan.id}</TableCell>
                  <TableCell className="text-slate-300">{scan.date}</TableCell>
                  <TableCell className="text-slate-300">{scan.targets}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={scan.status === 'Completed' ? 'default' : 'secondary'}
                      className={scan.status === 'Completed' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                      }
                    >
                      {scan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      scan.findings > 20 ? 'text-red-400' : 
                      scan.findings > 10 ? 'text-orange-400' : 
                      scan.findings > 0 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {scan.findings}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                        onClick={() => onViewResults(scan.id)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      {scan.status === 'Completed' && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-slate-400 hover:text-white hover:bg-slate-700"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}