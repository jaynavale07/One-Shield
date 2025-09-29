import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export default function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  trendDirection = "up",
  color = "blue"
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    red: "from-red-500 to-red-600", 
    green: "from-green-500 to-green-600",
    amber: "from-amber-500 to-amber-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            {trend && (
              <div className={`flex items-center gap-1 ${
                trendDirection === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {trendDirection === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{trend}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-slate-400 text-sm font-medium mb-2">{title}</h3>
            <p className="text-white text-3xl font-bold">{value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}