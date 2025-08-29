
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import AdminLayout from './components/layout/AdminLayout';
// // import PublicLayout from './components/layout/PublicLayout';
// import Dashboard from './pages/admin/Dashboard';
// import ProductCategory from './pages/admin/ProductCategory';
// import Products from './pages/admin/Products';
// import AddProduct from './pages/admin/AddProduct';
// import BlogCategory from './pages/admin/BlogCategory';
// import Blogs from './pages/admin/Blogs';
// import ContactAdmin from './pages/admin/ContactAdmin';
// import AddBlogs from './pages/admin/AddBlogs';
// import ProductUnits from './pages/admin/ProductUnits';
// import UnitQuantities from './pages/admin/UnitQuantities';
// import TeamMemberAdd from './pages/admin/TeamMemberAdd';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Root route redirect to admin */}
//           <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          
//           {/* Admin Routes */}
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route index element={<Navigate to="/admin/dashboard" replace />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="product-category" element={<ProductCategory />} />
//             <Route path="products" element={<Products />} />
//             <Route path="add-product" element={<AddProduct />} />
//             <Route path="blog-category" element={<BlogCategory />} />
//             <Route path="blogs" element={<Blogs />} />
//             <Route path="contact" element={<ContactAdmin />} />
//             <Route path="add-blog" element={<AddBlogs />} />
//             <Route path="product-units" element={<ProductUnits />} />
//           <Route path="unit-quantities" element={<UnitQuantities />} />
//           <Route path="team-member-add" element={<TeamMemberAdd/>}/>
//           </Route>

//           {/* Catch all unmatched routes and redirect to admin dashboard */}
//           <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import AdminLayout from './components/layout/AdminLayout';

import Dashboard from './pages/admin/Dashboard';
import ProductCategory from './pages/admin/ProductCategory';
import Products from './pages/admin/Products';
import AddProduct from './pages/admin/AddProduct';
import BlogCategory from './pages/admin/BlogCategory';
import Blogs from './pages/admin/Blogs';
import ContactAdmin from './pages/admin/ContactAdmin';
import AddBlogs from './pages/admin/AddBlogs';
import ProductUnits from './pages/admin/ProductUnits';
import UnitQuantities from './pages/admin/UnitQuantities';
import TeamMemberAdd from './pages/admin/TeamMemberAdd';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Root route redirect to admin */}
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="product-category" element={<ProductCategory />} />
              <Route path="products" element={<Products />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="blog-category" element={<BlogCategory />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="contact" element={<ContactAdmin />} />
              <Route path="add-blog" element={<AddBlogs />} />
              <Route path="product-units" element={<ProductUnits />} />
              <Route path="unit-quantities" element={<UnitQuantities />} />
              <Route path="team-member-add" element={<TeamMemberAdd />} />
            </Route>

            {/* Catch all unmatched routes and redirect to admin dashboard */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;