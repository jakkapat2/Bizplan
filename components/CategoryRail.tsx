import React from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

interface CategoryRailProps {
  selectedCategory: Category | 'All';
  onSelect: (category: Category | 'All') => void;
}

const CategoryRail: React.FC<CategoryRailProps> = ({ selectedCategory, onSelect }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex space-x-3 px-1">
        <button
          onClick={() => onSelect('All')}
          className={`
            whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border
            ${selectedCategory === 'All' 
              ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' 
              : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'}
          `}
        >
          All Events
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={`
              whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2
              ${selectedCategory === cat.value 
                ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' 
                : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'}
            `}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryRail;
