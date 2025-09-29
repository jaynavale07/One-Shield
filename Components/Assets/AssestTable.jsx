import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Loader2, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function AssetTable({ assets, onStartAudit, onAssetSelect, selectedAsset }) {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [assets, searchTerm]);

  const handleSelectRow = (assetId, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(assetId);
    } else {
      newSelected.delete(assetId);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(filteredAssets.map(asset => asset.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleStartAudit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onStartAudit();
    }, 3000);
  };

  return (
    <Card className="bg-slate-800 border-slate-700 shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                    placeholder="Search assets by name or ID..."
                    className="bg-slate-700 border-slate-600 pl-10 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-3">
                <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                </Button>
                <Button
                    onClick={handleStartAudit}
                    disabled={selectedRows.size === 0 || isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Auditing...
                    </>
                    ) : (
                    <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Audit ({selectedRows.size})
                    </>
                    )}
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-700/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.size > 0 && selectedRows.size === filteredAssets.length}
                    onCheckedChange={handleSelectAll}
                    className="border-slate-500 data-[state=checked]:bg-blue-600"
                  />
                </TableHead>
                <TableHead className="text-slate-400">Asset Name / ID</TableHead>
                <TableHead className="text-slate-400">Type</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Compliance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow
                  key={asset.id}
                  onClick={() => onAssetSelect(asset)}
                  className={`border-slate-700 cursor-pointer transition-colors duration-200 ${selectedAsset?.id === asset.id ? 'bg-blue-900/50' : 'hover:bg-slate-700/50'}`}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedRows.has(asset.id)}
                      onCheckedChange={(checked) => handleSelectRow(asset.id, checked)}
                      className="border-slate-500 data-[state=checked]:bg-blue-600"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-slate-200 font-medium">{asset.name}</p>
                      <p className="text-slate-500 text-sm font-mono">{asset.id}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{asset.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={asset.status === 'Running' ? 'default' : 'secondary'}
                      className={`capitalize ${asset.status === 'Running'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                      }`}
                    >
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={asset.compliance === 'Passing' ? 'default' : 'destructive'}
                      className={`capitalize ${asset.compliance === 'Passing'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                        {asset.compliance}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}