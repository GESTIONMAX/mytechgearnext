'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus } from 'lucide-react';

interface AdvancedQuantitySelectorProps {
  value: number;
  onChange: (quantity: number) => void;
  max?: number;
  min?: number;
  className?: string;
  disabled?: boolean;
  allowDelete?: boolean;
  onDelete?: () => void;
  showButtons?: boolean;
  showDropdown?: boolean;
}

export const AdvancedQuantitySelector: React.FC<AdvancedQuantitySelectorProps> = ({
  value,
  onChange,
  max = 10,
  min = 1,
  className = '',
  disabled = false,
  allowDelete = false,
  onDelete,
  showButtons = true,
  showDropdown = true,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (newValue: number): void => {
    if (newValue === 0 && allowDelete && onDelete) {
      onDelete();
    } else if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleIncrement = (): void => {
    if (value < max) {
      handleChange(value + 1);
    }
  };

  const handleDecrement = (): void => {
    if (value > min) {
      handleChange(value - 1);
    }
  };

  const handleDelete = (): void => {
    if (allowDelete && onDelete) {
      onDelete();
    }
  };

  const options = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Boutons + et - */}
      {showButtons && (
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDecrement}
            disabled={disabled || value <= min}
            className="w-8 h-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>

          <span className="w-8 text-center text-sm font-medium">{value}</span>

          <Button
            size="sm"
            variant="outline"
            onClick={handleIncrement}
            disabled={disabled || value >= max}
            className="w-8 h-8 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </>
      )}

      {/* Dropdown sélecteur */}
      {showDropdown && (
        <div className="relative">
          <select
            value={value}
            onChange={(e) => handleChange(parseInt(e.target.value))}
            disabled={disabled}
            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {allowDelete && (
              <option value={0} className="text-red-600">
                ❌ Supprimer
              </option>
            )}
            {options.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Bouton de suppression */}
      {allowDelete && onDelete && (
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDelete}
          disabled={disabled}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
