import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Ruler, Filter } from 'lucide-react';
import ProductUnitModal from '../../components/modals/ProductUnitModal';

const ProductUnits = () => {
  const [units, setUnits] = useState(() => {
    const defaultUnits = [
      {
        id: 1,
        name: 'Kilogram',
        code: 'kg',
        type: 'weight',
        description: 'Standard unit of weight measurement',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Gram',
        code: 'g',
        type: 'weight',
        description: 'Smaller unit of weight measurement',
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Liter',
        code: 'l',
        type: 'volume',
        description: 'Unit of volume measurement',
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        name: 'Piece',
        code: 'pc',
        type: 'count',
        description: 'Individual unit count',
        createdAt: new Date().toISOString()
      },
      {
        id: 5,
        name: 'Meter',
        code: 'm',
        type: 'length',
        description: 'Unit of length measurement',
        createdAt: new Date().toISOString()
      }
    ];

    try {
      const storedUnits = localStorage.getItem('productUnits');
      if (storedUnits) {
        const parsedUnits = JSON.parse(storedUnits);
        const existingIds = defaultUnits.map(u => u.id);
        const newUnits = parsedUnits.filter(u => !existingIds.includes(u.id));
        return [...defaultUnits, ...newUnits];
      }
      return defaultUnits;
    } catch (error) {
      console.error('Error loading units from localStorage:', error);
      return defaultUnits;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);

  const unitTypes = ['all', 'weight', 'volume', 'count', 'length', 'area', 'other'];

  // Save to localStorage whenever units change
  useEffect(() => {
    try {
      localStorage.setItem('productUnits', JSON.stringify(units));
    } catch (error) {
      console.error('Error saving units to localStorage:', error);
    }
  }, [units]);

  const filteredUnits = units.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || unit.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleAddUnit = () => {
    setEditingUnit(null);
    setIsModalOpen(true);
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit);
    setIsModalOpen(true);
  };

  const handleDeleteUnit = (unitId) => {
    if (window.confirm('Are you sure you want to delete this unit?')) {
      const updatedUnits = units.filter(u => u.id !== unitId);
      setUnits(updatedUnits);
    }
  };

  const handleSaveUnit = (unitData) => {
    if (editingUnit) {
      // Update existing unit
      const updatedUnits = units.map(u => 
        u.id === editingUnit.id ? { ...unitData, id: editingUnit.id } : u
      );
      setUnits(updatedUnits);
    } else {
      // Add new unit
      const newUnit = {
        ...unitData,
        id: Math.max(...units.map(u => u.id), 0) + 1,
        createdAt: new Date().toISOString()
      };
      setUnits([...units, newUnit]);
    }
    setIsModalOpen(false);
    setEditingUnit(null);
  };

  const getTypeColor = (type) => {
    const colors = {
      weight: 'bg-blue-100 text-blue-800',
      volume: 'bg-green-100 text-green-800',
      count: 'bg-yellow-100 text-yellow-800',
      length: 'bg-purple-100 text-purple-800',
      area: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.other;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Units</h1>
          <p className="text-gray-600 mt-1">Manage measurement units for your products</p>
        </div>
        <button
          onClick={handleAddUnit}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Unit</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Units</p>
              <p className="text-2xl font-bold text-gray-900">{units.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Ruler className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Weight Units</p>
              <p className="text-2xl font-bold text-gray-900">
                {units.filter(u => u.type === 'weight').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <Ruler className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Volume Units</p>
              <p className="text-2xl font-bold text-gray-900">
                {units.filter(u => u.type === 'volume').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Ruler className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Count Units</p>
              <p className="text-2xl font-bold text-gray-900">
                {units.filter(u => u.type === 'count').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100">
              <Ruler className="w-6 h-6 text-yellow-600" />
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
              placeholder="Search units..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Type:</span>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              {unitTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Units Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredUnits.length === 0 ? (
          <div className="p-12 text-center">
            <Ruler className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No units found</h3>
            <p className="text-gray-600 mb-4">
              There are no units matching your search criteria.
            </p>
            <button
              onClick={handleAddUnit}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Add First Unit
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUnits.map(unit => (
                  <tr key={unit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{unit.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded font-mono">
                        {unit.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm px-2 py-1 rounded-full ${getTypeColor(unit.type)}`}>
                        {unit.type.charAt(0).toUpperCase() + unit.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {unit.description || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(unit.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditUnit(unit)}
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUnit(unit.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <ProductUnitModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUnit(null);
        }}
        onSave={handleSaveUnit}
        unit={editingUnit}
        existingUnits={units}
      />
    </div>
  );
};

export default ProductUnits;