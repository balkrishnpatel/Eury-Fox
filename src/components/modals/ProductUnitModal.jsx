import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ProductUnitModal = ({ isOpen, onClose, onSave, unit, existingUnits }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'weight',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const unitTypes = [
    { value: 'weight', label: 'Weight' },
    { value: 'volume', label: 'Volume' },
    { value: 'count', label: 'Count' },
    { value: 'length', label: 'Length' },
    { value: 'area', label: 'Area' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    if (unit) {
      setFormData({
        name: unit.name || '',
        code: unit.code || '',
        type: unit.type || 'weight',
        description: unit.description || ''
      });
    } else {
      setFormData({
        name: '',
        code: '',
        type: 'weight',
        description: ''
      });
    }
    setErrors({});
  }, [unit, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Unit name is required';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Unit code is required';
    } else {
      // Check for duplicate codes (excluding current unit if editing)
      const existingCodes = existingUnits
        .filter(u => !unit || u.id !== unit.id)
        .map(u => u.code.toLowerCase());
      
      if (existingCodes.includes(formData.code.toLowerCase())) {
        newErrors.code = 'This code is already in use';
      }
    }

    if (!formData.type) {
      newErrors.type = 'Unit type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        name: formData.name.trim(),
        code: formData.code.trim().toLowerCase(),
        description: formData.description.trim()
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {unit ? 'Edit Unit' : 'Add New Unit'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Unit Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Kilogram, Liter, Piece"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Unit Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Code *
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => handleInputChange('code', e.target.value)}
              placeholder="e.g., kg, l, pc"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.code ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code}</p>
            )}
          </div>

          {/* Unit Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {unitTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Optional description about this unit"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              {unit ? 'Update Unit' : 'Add Unit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUnitModal;