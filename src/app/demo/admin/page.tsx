"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Shield,
  Users,
  MessageSquare,
  Phone,
  Calendar,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  ArrowLeft,
  Download,
  Filter,
  Menu,
  X,
  FileText,
  DollarSign,
} from "lucide-react";

// Mock data for policies
const mockPolicies = [
  {
    id: 1,
    holder: "Sarah Johnson",
    type: "Auto + Home Bundle",
    premium: 214,
    status: "active",
    renewalDate: "Mar 15, 2026",
    claims: 0,
  },
  {
    id: 2,
    holder: "Michael Chen",
    type: "Business Insurance",
    premium: 450,
    status: "active",
    renewalDate: "Apr 22, 2026",
    claims: 1,
  },
  {
    id: 3,
    holder: "Emily Davis",
    type: "Life Insurance",
    premium: 89,
    status: "pending",
    renewalDate: "Feb 28, 2026",
    claims: 0,
  },
  {
    id: 4,
    holder: "James Wilson",
    type: "Auto Insurance",
    premium: 125,
    status: "active",
    renewalDate: "May 10, 2026",
    claims: 2,
  },
];

// Mock data for leads
const mockLeads = [
  { id: 1, name: "Amanda Brown", email: "a.brown@email.com", phone: "(555) 123-4567", source: "Web Chat", status: "new", interest: "Auto Quote", date: "2 hours ago" },
  { id: 2, name: "Robert Kim", email: "r.kim@email.com", phone: "(555) 234-5678", source: "Quote Calculator", status: "contacted", interest: "Bundle", date: "5 hours ago" },
  { id: 3, name: "Lisa Thompson", email: "l.thompson@email.com", phone: "(555) 345-6789", source: "Contact Form", status: "qualified", interest: "Life Insurance", date: "1 day ago" },
  { id: 4, name: "David Martinez", email: "d.martinez@email.com", phone: "(555) 456-7890", source: "Phone Call", status: "new", interest: "Business", date: "1 day ago" },
  { id: 5, name: "Jennifer Lee", email: "j.lee@email.com", phone: "(555) 567-8901", source: "Web Chat", status: "converted", interest: "Home Insurance", date: "2 days ago" },
];

// Mock data for recent calls
const mockCalls = [
  { id: 1, caller: "Unknown", duration: "3:24", sentiment: "positive", summary: "Interested in auto insurance quote", date: "Today, 2:30 PM" },
  { id: 2, caller: "Amanda Brown", duration: "5:12", sentiment: "positive", summary: "Questions about bundling home + auto", date: "Today, 11:15 AM" },
  { id: 3, caller: "Unknown", duration: "1:45", sentiment: "neutral", summary: "General inquiry about life insurance", date: "Yesterday, 4:45 PM" },
];

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Policies", icon: Shield, count: 156 },
  { name: "Leads", icon: Users, count: 47 },
  { name: "Messages", icon: MessageSquare, count: 12 },
  { name: "Calls", icon: Phone, count: 8 },
  { name: "Consultations", icon: Calendar, count: 5 },
  { name: "Analytics", icon: TrendingUp },
  { name: "Settings", icon: Settings },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <span className="px-2 py-1 bg-trust-100 text-trust-700 text-xs font-medium rounded-full">Active</span>;
    case "pending":
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Pending</span>;
    case "expired":
      return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Expired</span>;
    default:
      return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{status}</span>;
  }
};

const getLeadStatusBadge = (status: string) => {
  switch (status) {
    case "new":
      return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center"><Clock className="w-3 h-3 mr-1" />New</span>;
    case "contacted":
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Contacted</span>;
    case "qualified":
      return <span className="px-2 py-1 bg-trust-100 text-trust-700 text-xs font-medium rounded-full">Qualified</span>;
    case "converted":
      return <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full flex items-center"><CheckCircle className="w-3 h-3 mr-1" />Converted</span>;
    default:
      return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{status}</span>;
  }
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Site</span>
            </Link>
            <div className="hidden sm:block h-6 w-px bg-gray-200" />
            <h1 className="text-lg md:text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <span className="hidden sm:inline px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">Demo</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative hidden md:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-48 lg:w-64"
              />
            </div>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 lg:w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          lg:transform-none lg:min-h-[calc(100vh-73px)]
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between lg:hidden mb-4">
              <h2 className="font-bold text-gray-900">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {sidebarItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-1 transition-colors ${
                  item.active
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.count && (
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    item.active ? "bg-primary-200 text-primary-800" : "bg-gray-100 text-gray-600"
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-xl p-3 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary-100 flex items-center justify-center">
                  <Shield className="w-4 h-4 md:w-6 md:h-6 text-primary-700" />
                </div>
                <span className="text-trust-600 text-xs md:text-sm font-medium flex items-center">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-0.5 md:mr-1" /> +12%
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">156</h3>
              <p className="text-gray-500 text-xs md:text-sm">Active Policies</p>
            </div>

            <div className="bg-white rounded-xl p-3 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                </div>
                <span className="text-trust-600 text-xs md:text-sm font-medium flex items-center">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-0.5 md:mr-1" /> +28%
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">47</h3>
              <p className="text-gray-500 text-xs md:text-sm">New Leads</p>
            </div>

            <div className="bg-white rounded-xl p-3 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-accent-100 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-accent-600" />
                </div>
                <span className="text-trust-600 text-xs md:text-sm font-medium flex items-center">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-0.5 md:mr-1" /> +18%
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">$45.2K</h3>
              <p className="text-gray-500 text-xs md:text-sm">Monthly Premiums</p>
            </div>

            <div className="bg-white rounded-xl p-3 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-trust-100 flex items-center justify-center">
                  <Phone className="w-4 h-4 md:w-6 md:h-6 text-trust-600" />
                </div>
                <span className="text-trust-600 text-xs md:text-sm font-medium flex items-center">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-0.5 md:mr-1" /> +45%
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">89</h3>
              <p className="text-gray-500 text-xs md:text-sm">AI Calls</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Policies Table */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 md:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h2 className="text-base md:text-lg font-bold text-gray-900">Recent Policies</h2>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1.5 md:py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs md:text-sm">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary-700 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-primary-800 transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-gray-100">
                {mockPolicies.map((policy) => (
                  <div key={policy.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{policy.holder}</p>
                        <p className="text-xs text-gray-500">{policy.type}</p>
                      </div>
                      {getStatusBadge(policy.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 text-sm">{formatPrice(policy.premium)}/mo</span>
                      <span className="text-xs text-gray-500">Renews {policy.renewalDate}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policyholder</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Premium</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockPolicies.map((policy) => (
                      <tr key={policy.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{policy.holder}</p>
                            <p className="text-sm text-gray-500">Renews {policy.renewalDate}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900">{policy.type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">{formatPrice(policy.premium)}/mo</span>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(policy.status)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-primary-700 hover:bg-primary-50 rounded-lg">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-primary-700 hover:bg-primary-50 rounded-lg">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 md:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-base md:text-lg font-bold text-gray-900">Recent Leads</h2>
                  <button className="text-primary-700 text-xs md:text-sm font-medium hover:text-primary-800">View All</button>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {mockLeads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="p-3 md:p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-medium text-xs md:text-sm flex-shrink-0">
                          {lead.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">{lead.name}</p>
                          <p className="text-[10px] md:text-xs text-gray-500 truncate">{lead.interest} • {lead.date}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">{getLeadStatusBadge(lead.status)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent AI Calls */}
          <div className="mt-4 md:mt-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 md:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-trust-100 flex items-center justify-center">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-trust-600" />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-gray-900">Recent AI Calls</h2>
                    <p className="text-xs md:text-sm text-gray-500">Calls handled by ARIA</p>
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-3 py-1.5 md:py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs md:text-sm self-start sm:self-auto">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {mockCalls.map((call) => (
                <div key={call.id} className="p-3 md:p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start md:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{call.caller}</p>
                        <p className="text-xs text-gray-500">{call.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                      <span className="text-xs md:text-sm text-gray-600">{call.duration}</span>
                      <span className={`px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full ${
                        call.sentiment === "positive" ? "bg-trust-100 text-trust-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {call.sentiment}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs md:text-sm text-gray-600 ml-10 md:ml-14">{call.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
