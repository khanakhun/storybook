import React from "react";
import { FcSearch } from "react-icons/fc";

interface InputBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  loading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ value, onChange, onKeyDown, onSearch, loading }) => {
  return (
    <div className="relative max-w-xl mx-auto">
      <input
        type="text"
        placeholder="e.g., 'A brave dragon who loves painting...'"
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Type your prompt"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center justify-center pr-4"
        aria-label="Generate Story"
        onClick={onSearch}
        disabled={loading}
      >
        <FcSearch className={`w-6 h-6 ${loading ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
};

export default InputBar;
