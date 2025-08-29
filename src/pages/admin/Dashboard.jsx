import React from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Users,
  BarChart3,
  Globe,
  Clock
} from 'lucide-react';
import StatsCard from '../../components/ui/StatsCard';
import Chart from '../../components/ui/Chart';

const Dashboard = () => {
  const stats = [
    {
      title: 'Revenue',
      value: '$13,456.5',
      subtitle: 'Shipping fees are not included',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Orders',
      value: '53,668',
      subtitle: 'Excluding orders in transit',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Products',
      value: '9,856',
      subtitle: 'In 19 Categories',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Monthly Earning',
      value: '$6,982',
      subtitle: 'Based in your local time',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const salesData = [
    { name: 'Jan', sales: 20, visitors: 15, products: 10 },
    { name: 'Feb', sales: 18, visitors: 20, products: 15 },
    { name: 'Mar', sales: 8, visitors: 10, products: 20 },
    { name: 'Apr', sales: 15, visitors: 25, products: 18 },
    { name: 'May', sales: 35, visitors: 40, products: 25 },
    { name: 'Jun', sales: 30, visitors: 35, products: 30 },
    { name: 'Jul', sales: 25, visitors: 30, products: 35 },
    { name: 'Aug', sales: 20, visitors: 25, products: 28 }
  ];

  const revenueData = [
    { name: 'US', value: 800, color: '#3B82F6' },
    { name: 'Europe', value: 600, color: '#10B981' },
    { name: 'Asia', value: 550, color: '#F59E0B' },
    { name: 'Africa', value: 300, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Whole data about your business here</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
          <BarChart3 className="w-4 h-4" />
          <span>Create report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sale statistics</h3>
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Sales</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Visitors</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600">Products</span>
            </div>
          </div>
          <Chart data={salesData} type="line" />
        </div>

        {/* Revenue Base on Area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Base on Area</h3>
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">US</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Europe</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-600">Asia</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600">Africa</span>
            </div>
          </div>
          <Chart data={revenueData} type="bar" />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((order) => (
              <div key={order} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">#{order}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{1000 + order}</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-green-600">$125.50</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {['Organic Almonds', 'Quinoa Energy Bars', 'Premium Saffron', 'Mixed Nuts'].map((product, index) => (
              <div key={product} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product}</p>
                    <p className="text-xs text-gray-500">{125 - (index * 25)} sold</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-purple-600">#{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Website Status</span>
              </div>
              <span className="text-sm font-semibold text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-700">Active Users</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-700">Server Response</span>
              </div>
              <span className="text-sm font-semibold text-orange-600">245ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;