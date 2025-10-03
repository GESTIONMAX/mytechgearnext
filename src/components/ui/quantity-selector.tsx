'use client';

import { useState } from 'react';

interface QuantitySelectorProps {
  value: number;
  onChange: (quantity: number) => void;
  max?: number;
  min?: number;
  className?: string;
  disabled?: boolean;
  allowDelete?: boolean;
  onDelete?: () => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  max = 10,
  min = 1,
  className = '',
  disabled = false,
  allowDelete = false,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newValue: number): void => {
    if (newValue === 0 && allowDelete && onDelete) {
      onDelete();
    } else if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const options = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className={`relative ${className}`}>
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
  );
};
