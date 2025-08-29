import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Upload, X, Eye, Users, UserCheck, UserX, Search, Filter } from 'lucide-react';

const TeamMemberAdd = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    image: null,
    isActive: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setFormData(prev => ({ ...prev, image: imageData }));
        setPreviewImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const openViewModal = (member) => {
    setViewingMember(member);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingMember(null);
  };

  const openModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        description: member.description,
        image: member.image,
        isActive: member.isActive
      });
      setPreviewImage(member.image);
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        role: '',
        description: '',
        image: null,
        isActive: true
      });
      setPreviewImage(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      description: '',
      image: null,
      isActive: true
    });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.role || !formData.description || !formData.image) {
      alert('Please fill all fields and upload an image');
      return;
    }

    const memberData = {
      ...formData,
      id: editingMember ? editingMember.id : Date.now(),
      createdAt: editingMember ? editingMember.createdAt : new Date().toISOString()
    };

    if (editingMember) {
      setTeamMembers(prev => 
        prev.map(member => member.id === editingMember.id ? memberData : member)
      );
    } else {
      setTeamMembers(prev => [...prev, memberData]);
    }

    closeModal();
  };

  const deleteMember = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setTeamMembers(prev => prev.filter(member => member.id !== id));
    }
  };

  // Filter team members based on search and status
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
                         (statusFilter === 'Active' && member.isActive) ||
                         (statusFilter === 'Inactive' && !member.isActive);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-600 mt-1">Manage your team members</p>
        </div>
        <button
          onClick={() => openModal()}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(m => m.isActive).length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Inactive Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(m => !m.isActive).length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Filtered Results</p>
              <p className="text-2xl font-bold text-gray-900">{filteredMembers.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Filter className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      {filteredMembers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
          <p className="text-gray-600 mb-4">
            {teamMembers.length === 0 
              ? "Get started by adding your first team member."
              : "No members match your search criteria."
            }
          </p>
          <button
            onClick={() => openModal()}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Add Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <div className="aspect-square overflow-hidden bg-gray-100 cursor-pointer" onClick={() => openViewModal(member)}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => openViewModal(member)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => deleteMember(member.id)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-semibold ${
                  member.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {member.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {member.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Since {new Date(member.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => openViewModal(member)}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Member Details Modal */}
      {isViewModalOpen && viewingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Team Member Details</h2>
              <button
                onClick={closeViewModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={viewingMember.image}
                      alt={viewingMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      viewingMember.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {viewingMember.isActive ? 'Active Member' : 'Inactive Member'}
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {viewingMember.name}
                    </h3>
                    <p className="text-xl text-purple-600 font-medium mb-4">
                      {viewingMember.role}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">About</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {viewingMember.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Member Since
                      </h5>
                      <p className="text-gray-900 font-medium">
                        {new Date(viewingMember.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Status
                      </h5>
                      <p className="text-gray-900 font-medium">
                        {viewingMember.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        closeViewModal();
                        openModal(viewingMember);
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Edit2 size={16} />
                      Edit Member
                    </button>
                    <button
                      onClick={() => {
                        closeViewModal();
                        deleteMember(viewingMember.id);
                      }}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete Member
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingMember ? 'Update Team Member' : 'Add New Team Member'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo *
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload size={32} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200 inline-flex items-center gap-2"
                      >
                        <Upload size={16} />
                        Choose Image
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        JPG, PNG or GIF (1MB to 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter member name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role/Position *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g: Developer, Designer, Manager"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tell us about this team member..."
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Member is active
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
                >
                  {editingMember ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberAdd;




















// import React, { useState, useEffect } from 'react';

// const TeamMembersComponent = () => {
//   // Step 1: State variables define
//   const [teamMembers, setTeamMembers] = useState([]); // API data store 
//   const [loading, setLoading] = useState(true); // Loading state track 
//   const [error, setError] = useState(null); // Error messages store 

//   // Step 2: API URL and Base URL define 
//   const API_URL = 'http://localhost:4000/eury/fox/team-members/getAll';
//   const BASE_URL = 'http://localhost:4000/eury/fox';

//   // Image URL helper function
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return null;
    
//     // Different path formats ko handle karte hai 
//     let cleanPath = imagePath;
    
//     // if path backslashes 
//     if (imagePath.includes('\\')) {
//       cleanPath = imagePath.replace(/\\/g, '/');
//     }
    
//     // if path forward slashes
//     if (imagePath.includes('/')) {
//       // Leading slash remove करते हैं
//       cleanPath = cleanPath.replace(/^\/+/, '');
//     }
    
//     const fullUrl = `${BASE_URL}/${cleanPath}`;
//     console.log('Final image URL:', fullUrl); // Debug 
    
//     return fullUrl;
//   };

//   // Step 3: Fetch function create
//   const fetchTeamMembers = async () => {
//     try {
//       // Step 3.1: Loading state को true करते हैं
//       setLoading(true);
//       setError(null); // Previous errors को clear करते हैं

//       // console.log('API call शुरू कर रहे हैं...'); // Debug के लिए

//       // Step 3.2: Fetch API call करते हैं
//       const response = await fetch(API_URL, {
//         method: 'GET', // GET request specify करते हैं
//         headers: {
//           'Content-Type': 'application/json', // JSON format specify करते हैं
//           'Accept': 'application/json' // JSON response expect करते हैं
//         }
//       });

//       // console.log('Response status:', response.status); // Debug के लिए

//       // Step 3.3: Response status check करते हैं
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Step 3.4: Response को JSON में parse करते हैं
//       const responseData = await response.json();
//       // console.log('API Response:', responseData); // Debug के लिए

//       // Step 3.5: API response structure check करते हैं
//       if (responseData.success && responseData.result) {
//         // Success case - data को state में set करते हैं
//         setTeamMembers(responseData.result);
//         console.log('Team members loaded successfully:', responseData.result.length);
//       } else {
//         // API success false है
//         throw new Error(responseData.message || 'Failed to fetch team members');
//       }

//     } catch (err) {
//       // Step 3.6: Error handling
//       console.error('API Error:', err);
//       setError(err.message);
//       setTeamMembers([]); // Empty array set करते हैं error के case में
//     } finally {
//       // Step 3.7: Loading को false करते हैं (success या error दोनों cases में)
//       setLoading(false);
//     }
//   };

//   // Step 4: useEffect hook - component mount on API call 
//   useEffect(() => {
//     fetchTeamMembers(); // Function call 
//   }, []); // Empty dependency array - call once

//   // Step 5: Retry function - error क
//   const handleRetry = () => {
//     fetchTeamMembers();
//   };

//   // Step 6: Loading state rendering
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Team members is loading</p>
//         </div>
//       </div>
//     );
//   }

//   // Step 7: Error state rendering
//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold text-red-700 mb-2">Error Occurred</h2>
//           <p className="text-red-600 mb-4">{error}</p>
//           <button 
//             onClick={handleRetry}
//             className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
//           >
//              Try Again 
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Step 8: Empty data handling
//   if (teamMembers.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-center">
//           <div className="text-gray-400 text-6xl mb-4">👥</div>
//           <h2 className="text-xl font-semibold text-gray-700 mb-2">No Team Members</h2>
//           <p className="text-gray-500 mb-4">No team members </p>
//           <button 
//             onClick={handleRetry}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Step 9: Main component rendering with data
//   return (
//     <div className="container mx-auto px-4 py-8">
     
    
//       {/* Team Members Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {teamMembers.map((member) => (
//           <div 
//             key={member._id} 
//             className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
//           >
//             {/* Member Image */}
//             <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-500">
//               {member.image ? (
//                 <img 
//                   src={getImageUrl(member.image)}
//                   alt={member.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     console.error('Image failed to load:', e.target.src);
//                     console.error('Original image path:', member.image);
//                     e.target.style.display = 'none';
//                   }}
//                   onLoad={() => {
//                     console.log('Image loaded successfully:', getImageUrl(member.image));
//                   }}
//                 />
//               ) : null}
              
//               {/* Fallback Avatar */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
//                   {member.name.charAt(0)}
//                 </div>
//               </div>
              
//               {/* Active Status Badge */}
//               {member.isActive && (
//                 <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
//                   Active
//                 </div>
//               )}
//             </div>

//             {/* Member Info */}
//             <div className="p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 {member.name}
//               </h3>
//               <p className="text-blue-600 font-medium mb-3">
//                 {member.role}
//               </p>
//               <p className="text-gray-600 text-sm leading-relaxed mb-4">
//                 {member.description}
//               </p>
              
//               {/* Member Details */}
//               <div className="border-t pt-4">
//                 <div className="flex justify-between text-xs text-gray-500 mb-2">
//                   <span>Created:</span>
//                   <span>{new Date(member.createdAt).toLocaleDateString('en-IN')}</span>
//                 </div>
//                 <div className="flex justify-between text-xs text-gray-500">
//                   <span>Updated:</span>
//                   <span>{new Date(member.updatedAt).toLocaleDateString('en-IN')}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Debug Information  */}
//       <div className="mt-12 bg-gray-100 p-4 rounded-lg">
//         <h3 className="text-lg font-semibold mb-2">Debug Information</h3>
//         <div className="text-sm text-gray-700 space-y-1">
//           {/* Image Paths Debug */}
//           <div className="mt-4 p-3 bg-white rounded border">
//             <p><strong>Image Paths Debug:</strong></p>
//             {teamMembers.slice(0, 2).map((member, index) => (
//               <div key={index} className="mt-2 text-xs">
//                 <p><strong>Member {index + 1}:</strong> {member.name}</p>
//                 <p><strong>Original Path:</strong> {member.image}</p>
//                 <p><strong>Generated URL:</strong> {getImageUrl(member.image)}</p>
//                 <p className="mb-2"><strong>Manual Test URL:</strong> 
//                   <a 
//                     href={getImageUrl(member.image)} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="text-blue-500 hover:underline ml-1"
//                   >
//                     Click to test
//                   </a>
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamMembersComponent;














