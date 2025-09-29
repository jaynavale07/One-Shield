import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings2, Bell, Shield, Users, Key, Slack, GitBranch } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
    { name: 'Security Admin', email: 'admin@company.com', role: 'Admin', avatar: 'https://github.com/shadcn.png' },
    { name: 'Dev Ops', email: 'devops@company.com', role: 'Editor', avatar: 'https://github.com/vercel.png' },
    { name: 'John Doe', email: 'john.doe@company.com', role: 'Viewer', avatar: 'https://github.com/styfle.png' },
];

export default function Settings() {
  return (
    <div className="p-6 space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-slate-400">Manage your organization's security and integration settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* General Settings */}
            <Card className="bg-slate-800 border-slate-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2"><Settings2 />General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-slate-300">Organization Name</Label>
                    <Input defaultValue="Acme Corporation" className="bg-slate-700 border-slate-600 text-white"/>
                </div>
              </CardContent>
            </Card>

            {/* User Management */}
            <Card className="bg-slate-800 border-slate-700 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2"><Users />User Management</CardTitle>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Invite User</Button>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableHeader>
                          <TableRow className="border-slate-700">
                              <TableHead className="text-slate-400">User</TableHead>
                              <TableHead className="text-slate-400">Role</TableHead>
                              <TableHead className="text-right text-slate-400">Actions</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {users.map(user => (
                              <TableRow key={user.email} className="border-slate-700">
                                  <TableCell>
                                      <div className="flex items-center gap-3">
                                          <Avatar>
                                              <AvatarImage src={user.avatar} />
                                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                          <div>
                                              <p className="font-medium text-slate-200">{user.name}</p>
                                              <p className="text-sm text-slate-500">{user.email}</p>
                                          </div>
                                      </div>
                                  </TableCell>
                                  <TableCell className="text-slate-300">{user.role}</TableCell>
                                  <TableCell className="text-right">
                                      <Button variant="ghost" size="sm">Edit</Button>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card className="bg-slate-800 border-slate-700 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2"><Key />API Keys</CardTitle>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Generate Key</Button>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-400">No API keys generated yet.</p>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            {/* Notification Settings */}
            <Card className="bg-slate-800 border-slate-700 shadow-lg">
              <CardHeader><CardTitle className="text-white flex items-center gap-2"><Bell />Notifications</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><Label className="text-slate-300">Critical Alerts</Label><Switch defaultChecked /></div>
                <div className="flex items-center justify-between"><Label className="text-slate-300">Scan Reports</Label><Switch defaultChecked /></div>
                <div className="flex items-center justify-between"><Label className="text-slate-300">Weekly Summaries</Label><Switch /></div>
              </CardContent>
            </Card>

             {/* Integrations */}
            <Card className="bg-slate-800 border-slate-700 shadow-lg">
              <CardHeader><CardTitle className="text-white flex items-center gap-2"><GitBranch />Integrations</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-3"><Slack className="w-6 h-6"/> <span className="font-medium text-slate-200">Slack</span></div>
                    <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-600">Connect</Button>
                </div>
                 <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-3"><Users className="w-6 h-6"/> <span className="font-medium text-slate-200">Jira</span></div>
                    <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-600">Connect</Button>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}