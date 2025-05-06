
import React from 'react';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex items-center overflow-x-auto pb-2 hide-scrollbar">
      <div className="flex gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-claw-blue-500 text-white'
                : 'bg-white border border-claw-blue-200 text-gray-700 hover:bg-claw-blue-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
