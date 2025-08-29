import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Scale, Package } from 'lucide-react';
import UnitQuantityModal from '../../components/modals/UnitQuantityModal';

const UnitQuantities = () => {
  const [quantities, setQuantities] = useState(() => {
    const defaultQuantities = [
      {
        id: 1,
        unitId: 1, // Kilogram
        unitName: 'Kilogram',
        unitCode: 'kg',
        quantities: [
          { value: 'kg', label: '1 kg', multiplier: 1 },
          { value: '5kg', label: '5 kg', multiplier: 5 },
          { value: '10kg', label: '10 kg', multiplier: 10 },
          { value: 'qtl', label: 'qtl (Quintal)', multiplier: 100 },
          { value: 'MT', label: 'MT (Metric Ton)', multiplier: 1000 }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        unitId: 2, // Gram
        unitName: 'Gram',
        unitCode: 'g',
        quantities: [
          { value: 'g', label: '1 g', multiplier: 1 },
          { value: '10g', label: '10 g', multiplier: 10 },
          { value: '50g', label: '50 g', multiplier: 50 },
          { value: '100g', label: '100 g', multiplier: 100 },
          { value: '250g', label: '250 g', multiplier: 250 },
          { value: '500g', label: '500 g', multiplier: 500 }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        unitId: 3, // Liter
        unitName: 'Liter',
        unitCode: 'l',
        quantities: [
          { value: 'ml', label: '1 ml', multiplier: 0.001 },
          { value: '250ml', label: '250 ml', multiplier: 0.25 },
          { value: '500ml', label: '500 ml', multiplier: 0.5 },
          { value: 'l', label: '1 l', multiplier: 1 },
          { value: '2l', label: '2 l', multiplier: 2 },
          { value: '5l', label: '5 l', multiplier: 5 }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        unitId: 4, // Piece
        unitName: 'Piece',
        unitCode: 'pc',
        quantities: [
          { value: 'pc', label: '1 pc', multiplier: 1 },
          { value: '5pc', label: '5 pcs', multiplier: 5 },
          { value: '10pc', label: '10 pcs', multiplier: 10 },
          { value: '12pc', label: '12 pcs (Dozen)', multiplier: 12 },
          { value: '24pc', label: '24 pcs (2 Dozen)', multiplier: 24 },
          { value: '50pc', label: '50 pcs', multiplier: 50 }
        ],
        createdAt: new Date().toISOString()
      }
    ];

    try {
      const storedQuantities = localStorage.getItem('unitQuantities');
      if (storedQuantities) {
        const parsedQuantities = JSON.parse(storedQuantities);
        const existingIds = defaultQuantities.map(q => q.id);
        const newQuantities = parsedQuantities.filter(q => !existingIds.includes(q.id));
        return [...defaultQuantities, ...newQuantities];
      }
      return defaultQuantities;
    } catch (error) {
      console.error('Error loading quantities from localStorage:', error);
      return defaultQuantities;
    }
  });

  const [units, setUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuantity, setEditingQuantity] = useState(null);

  // Load units from localStorage
  useEffect(() => {
    try {
      const storedUnits = localStorage.getItem('productUnits');
      if (storedUnits) {
        setUnits(JSON.parse(storedUnits));
      }
    } catch (error) {
      console.error('Error loading units:', error);
    }
  }, []);

  // Save to localStorage whenever quantities change
  useEffect(() => {
    try {
      localStorage.setItem('unitQuantities', JSON.stringify(quantities));
    } catch (error) {
      console.error('Error saving quantities to localStorage:', error);
    }
  }, [quantities]);

  const filteredQuantities = quantities.filter(quantity => 
    quantity.unitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quantity.unitCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddQuantity = () => {
    setEditingQuantity(null);
    setIsModalOpen(true);
  };

  const handleEditQuantity = (quantity) => {
    setEditingQuantity(quantity);
    setIsModalOpen(true);
  };

  const handleDeleteQuantity = (quantityId) => {
    if (window.confirm('Are you sure you want to delete this quantity configuration?')) {
      const updatedQuantities = quantities.filter(q => q.id !== quantityId);
      setQuantities(updatedQuantities);
    }
  };

  const handleSaveQuantity = (quantityData) => {
    if (editingQuantity) {
      // Update existing quantity
      const updatedQuantities = quantities.map(q => 
        q.id === editingQuantity.id ? { ...quantityData, id: editingQuantity.id } : q
      );
      setQuantities(updatedQuantities);
    } else {
      // Add new quantity
      const newQuantity = {
        ...quantityData,
        id: Math.max(...quantities.map(q => q.id), 0) + 1,
        createdAt: new Date().toISOString()
      };
      setQuantities([...quantities, newQuantity]);
    }
    setIsModalOpen(false);
    setEditingQuantity(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Unit Quantities</h1>
          <p className="text-gray-600 mt-1">Configure quantity variations for each unit</p>
        </div>
        <button
          onClick={handleAddQuantity}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Quantity</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Configs</p>
              <p className="text-2xl font-bold text-gray-900">{quantities.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Quantities</p>
              <p className="text-2xl font-bold text-gray-900">
                {quantities.reduce((sum, q) => sum + q.quantities.length, 0)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg per Unit</p>
              <p className="text-2xl font-bold text-gray-900">
                {quantities.length > 0 
                  ? Math.round(quantities.reduce((sum, q) => sum + q.quantities.length, 0) / quantities.length)
                  : 0
                }
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Scale className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Units Covered</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(quantities.map(q => q.unitId)).size}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search unit quantities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Quantities List */}
      {filteredQuantities.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quantity configurations found</h3>
          <p className="text-gray-600 mb-4">
            There are no quantity configurations matching your search criteria.
          </p>
          <button
            onClick={handleAddQuantity}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Add First Configuration
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuantities.map(quantity => (
            <div key={quantity.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {quantity.unitName} ({quantity.unitCode})
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {quantity.quantities.length} quantity variations configured
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleEditQuantity(quantity)}
                    className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteQuantity(quantity.id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {quantity.quantities.map((qty, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{qty.label}</p>
                        <p className="text-sm text-gray-600">Value: {qty.value}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-purple-600">
                          ×{qty.multiplier}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Created: {new Date(quantity.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <UnitQuantityModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingQuantity(null);
        }}
        onSave={handleSaveQuantity}
        quantity={editingQuantity}
        units={units}
        existingQuantities={quantities}
      />
    </div>
  );
};

export default UnitQuantities;