
import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface CategoryFilterProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onSelect }) => {
  return (
    <div className="py-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex space-x-2 justify-start min-w-max">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 border uppercase tracking-widest
              ${selected === category 
                ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-100 dark:shadow-none' 
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-600'}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
