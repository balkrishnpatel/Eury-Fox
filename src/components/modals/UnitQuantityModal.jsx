import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const UnitQuantityModal = ({ isOpen, onClose, onSave, quantity, units, existingQuantities }) => {
  const [formData, setFormData] = useState({
    unitId: '',
    unitName: '',
    unitCode: '',
    quantities: [
      { value: '', label: '', multiplier: 1 }
    ]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (quantity) {
      setFormData({
        unitId: quantity.unitId || '',
        unitName: quantity.unitName || '',
        unitCode: quantity.unitCode || '',
        quantities: quantity.quantities || [{ value: '', label: '', multiplier: 1 }]
      });
    } else {
      setFormData({
        unitId: '',
        unitName: '',
        unitCode: '',
        quantities: [{ value: '', label: '', multiplier: 1 }]
      });
    }
    setErrors({});
  }, [quantity, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.unitId) {
      newErrors.unitId = 'Please select a unit';
    } else {
      // Check if this unit already has a quantity configuration
      const existingUnitIds = existingQuantities
        .filter(q => !quantity || q.id !== quantity.id)
        .map(q => q.unitId);
      
      if (existingUnitIds.includes(formData.unitId)) {
        newErrors.unitId = 'This unit already has a quantity configuration';
      }
    }

    // Validate quantities
    const quantityErrors = [];
    formData.quantities.forEach((qty, index) => {
      const qtyErrors = {};
      
      if (!qty.value.trim()) {
        qtyErrors.value = 'Value is required';
      }
      
      if (!qty.label.trim()) {
        qtyErrors.label = 'Label is required';
      }
      
      if (!qty.multiplier || qty.multiplier <= 0) {
        qtyErrors.multiplier = 'Multiplier must be greater than 0';
      }
      
      if (Object.keys(qtyErrors).length > 0) {
        quantityErrors[index] = qtyErrors;
      }
    });

    if (quantityErrors.length > 0) {
      newErrors.quantities = quantityErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        quantities: formData.quantities.filter(q => 
          q.value.trim() && q.label.trim() && q.multiplier > 0
        )
      });
    }
  };

  const handleUnitChange = (unitId) => {
    const selectedUnit = units.find(u => u.id == unitId);
    if (selectedUnit) {
      setFormData(prev => ({
        ...prev,
        unitId: parseInt(unitId),
        unitName: selectedUnit.name,
        unitCode: selectedUnit.code
      }));
    }
    
    // Clear unit error
    if (errors.unitId) {
      setErrors(prev => ({
        ...prev,
        unitId: undefined
      }));
    }
  };

  const addQuantity = () => {
    setFormData(prev => ({
      ...prev,
      quantities: [...prev.quantities, { value: '', label: '', multiplier: 1 }]
    }));
  };

  const removeQuantity = (index) => {
    if (formData.quantities.length > 1) {
      setFormData(prev => ({
        ...prev,
        quantities: prev.quantities.filter((_, i) => i !== index)
      }));
    }
  };

  const updateQuantity = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      quantities: prev.quantities.map((qty, i) => 
        i === index ? { ...qty, [field]: value } : qty
      )
    }));
    
    // Clear specific quantity error
    if (errors.quantities && errors.quantities[index] && errors.quantities[index][field]) {
      const newQuantityErrors = { ...errors.quantities };
      delete newQuantityErrors[index][field];
      if (Object.keys(newQuantityErrors[index]).length === 0) {
        delete newQuantityErrors[index];
      }
      setErrors(prev => ({
        ...prev,
        quantities: Object.keys(newQuantityErrors).length > 0 ? newQuantityErrors : undefined
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">
            {quantity ? 'Edit Quantity Configuration' : 'Add Quantity Configuration'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Unit Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Unit *
            </label>
            <select
              value={formData.unitId}
              onChange={(e) => handleUnitChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.unitId ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={!!quantity} // Disable when editing
            >
              <option value="">Choose a unit...</option>
              {units.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.name} ({unit.code}) - {unit.type}
                </option>
              ))}
            </select>
            {errors.unitId && (
              <p className="text-red-500 text-sm mt-1">{errors.unitId}</p>
            )}
          </div>

          {/* Quantities */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Quantity Variations *
              </label>
              <button
                type="button"
                onClick={addQuantity}
                className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Quantity</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.quantities.map((qty, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Quantity #{index + 1}
                    </h4>
                    {formData.quantities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuantity(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Value *
                      </label>
                      <input
                        type="text"
                        value={qty.value}
                        onChange={(e) => updateQuantity(index, 'value', e.target.value)}
                        placeholder="e.g., kg, 10kg"
                        className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.quantities && errors.quantities[index] && errors.quantities[index].value 
                            ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.quantities && errors.quantities[index] && errors.quantities[index].value && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.quantities[index].value}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Label *
                      </label>
                      <input
                        type="text"
                        value={qty.label}
                        onChange={(e) => updateQuantity(index, 'label', e.target.value)}
                        placeholder="e.g., 1 kg, 10 kg"
                        className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.quantities && errors.quantities[index] && errors.quantities[index].label 
                            ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.quantities && errors.quantities[index] && errors.quantities[index].label && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.quantities[index].label}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Multiplier *
                      </label>
                      <input
                        type="number"
                        value={qty.multiplier}
                        onChange={(e) => updateQuantity(index, 'multiplier', parseFloat(e.target.value) || 1)}
                        min="0.001"
                        step="0.001"
                        placeholder="1"
                        className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.quantities && errors.quantities[index] && errors.quantities[index].multiplier 
                            ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.quantities && errors.quantities[index] && errors.quantities[index].multiplier && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.quantities[index].multiplier}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
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
              {quantity ? 'Update Configuration' : 'Add Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitQuantityModal;