
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Grid3X3, 
  FileText, 
  Layers,
  BookOpen,
  Phone,
   Ruler,
   UserPlus,
  Scale
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/product-category', icon: Grid3X3, label: 'Product Category' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/blog-category', icon: Layers, label: 'Blog Category' },
    { path: '/admin/blogs', icon: BookOpen, label: 'Blogs' },
  
    { path: '/admin/product-units', icon: Ruler, label: 'Product Units' },
    { path: '/admin/unit-quantities', icon: Scale, label: 'Unit Quantities' },
    { path: '/admin/contact', icon: Phone, label: 'Contact' },
    { path: '/admin/team-member-add', icon: UserPlus, label: 'Team Member Add' },

  ];

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-full">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">EF</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Eury Fox</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </div>

        {/* Statistics in Sidebar */}
        <div className="px-3 mt-8">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Grid3X3 className="w-4 h-4 text-purple-500" />
                  <span className="text-xs text-gray-600">Categories</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-600">Products</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-600">Blogs</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">45</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@euryfox.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;