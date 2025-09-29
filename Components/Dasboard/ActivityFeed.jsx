import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Scan, ShieldCheck, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  { icon: Scan, text: 'Scan completed on "prod-web-server-01"', time: '2m ago' },
  { icon: ShieldCheck, text: 'Compliance check passed for CIS-AWS-4.1', time: '15m ago' },
  { icon: UserPlus, text: 'New user "John Doe" added to the team', time: '1h ago' },
  { icon: Scan, text: 'Scheduled scan started for 15 assets', time: '3h ago' },
];

export default function ActivityFeed() {
  return (
    <Card className="bg-slate-800 border-slate-700 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bell />
          Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="p-2 bg-slate-700 rounded-full mt-1">
                <activity.icon className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-300">{activity.text}</p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}