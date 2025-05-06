
import React from 'react';
import { Search, Plus } from 'lucide-react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  onCreateProject: () => void;
}

const SearchBar = ({ onSearch, onCreateProject }: SearchBarProps) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <form onSubmit={handleSubmit} className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search for ideas, DIY tutorials..."
          className="w-full pl-10 pr-4 py-3 rounded-full border border-craft-pink-200 focus:border-craft-pink-300 focus:outline-none focus:ring-2 focus:ring-craft-pink-200/50 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <button 
        onClick={onCreateProject}
        className="craft-button flex items-center gap-2"
      >
        <Plus size={18} />
        <span>Create Project</span>
      </button>
    </div>
  );
};

export default SearchBar;
