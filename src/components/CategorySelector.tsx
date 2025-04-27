
import React from 'react';

type Category = {
  id: string;
  name: string;
}

type CategorySelectorProps = {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }: CategorySelectorProps) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.id 
              ? 'bg-craft-pink-300 text-white' 
              : 'bg-craft-pink-100 text-foreground hover:bg-craft-pink-200/70'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
