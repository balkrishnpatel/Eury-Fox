// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import AdminHeader from './AdminHeader';

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Fixed Sidebar */}
//       <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
//         <Sidebar />
//       </div>

//       {/* Main Content Area */}
//       <div className="flex flex-col flex-1 lg:ml-0">
//         <AdminHeader 
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//         />
        
//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
//           <Outlet />
//         </main>
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default AdminLayout;



import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';

// Admin Header Component
const AdminHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center h-16 px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Page Title - Hidden on mobile when sidebar is open */}
        <div className={`flex items-center ${sidebarOpen ? 'lg:block hidden' : 'block'}`}>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        {/* User Info and Logout */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <User className="h-5 w-5" />
            <span className="text-sm font-medium hidden sm:block">
              {user?.name || user?.email}
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 mr-1" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

// Main AdminLayout Component
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 lg:ml-0">
        <AdminHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;