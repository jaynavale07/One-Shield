import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function ScanSummaryCharts({ data }) {
  const vulnerabilityData = [
    { name: 'Critical', value: data.vulnerabilities.critical, color: '#ef4444' },
    { name: 'High', value: data.vulnerabilities.high, color: '#f97316' },
    { name: 'Medium', value: data.vulnerabilities.medium, color: '#eab308' },
  ].filter(item => item.value > 0);

  const complianceData = [
    { name: 'Passed', value: data.compliance.passed, color: '#22c55e' },
    { name: 'Failed', value: data.compliance.failed, color: '#ef4444' },
  ];

  return (
    <div className="flex items-center gap-6">
      {/* Vulnerability Chart */}
      <div className="text-center">
        <div className="h-20 w-20">
          <ResponsiveContainer>
            <PieChart>
              <Pie 
                data={vulnerabilityData} 
                dataKey="value" 
                innerRadius={25} 
                outerRadius={40}
                startAngle={90}
                endAngle={450}
              >
                {vulnerabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-400 mt-1">Vulnerabilities</p>
      </div>

      {/* Compliance Chart */}
      <div className="text-center">
        <div className="h-20 w-20">
          <ResponsiveContainer>
            <PieChart>
              <Pie 
                data={complianceData} 
                dataKey="value" 
                innerRadius={25} 
                outerRadius={40}
                startAngle={90}
                endAngle={450}
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-400 mt-1">Compliance</p>
      </div>

      {/* Summary Text */}
      <div className="text-right">
        <p className="text-2xl font-bold text-white">
          {data.vulnerabilities.critical + data.vulnerabilities.high + data.vulnerabilities.medium}
        </p>
        <p className="text-sm text-slate-400">Total Issues</p>
      </div>
    </div>
  );
}