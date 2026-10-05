import React from 'react';

const SearchBar = ({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search topics, skills, problems, or projects...',
  className = '',
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`search-input-wrapper ${className}`}>
      <span className="search-icon-inside" aria-hidden="true">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange && onChange('')}
          style={{
            position: 'absolute',
            right: '0.8rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
          title="Clear search"
        >
          ✕
        </button>
      )}
    </form>
  );
};

export default SearchBar;
