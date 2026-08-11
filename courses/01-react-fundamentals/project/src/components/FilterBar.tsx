interface FilterBarProps {
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
  sortOrder?: 'recent' | 'highToLow' | 'lowToHigh' | 'alphabetical'
  onSortOrderChange?: (sortOrder: 'recent' | 'highToLow' | 'lowToHigh' | 'alphabetical') => void
  search?: string
  onSearchChange?: (search: string) => void
  categoryFilter: string
  onCategoryChange: (category: string) => void
  categories: string[]
}

export default function FilterBar(_props: FilterBarProps) {
  return <div id="filter-bar">
    <button
      data-active={_props.filter === 'all'}
      onClick={() => _props.onFilterChange('all')}
    >
      All
    </button>
    <button
      data-active={_props.filter === 'active'}
      onClick={() => _props.onFilterChange('active')}
    >
      Active
    </button>
    <button
      data-active={_props.filter === 'completed'}
      onClick={() => _props.onFilterChange('completed')}
    >
      Completed
    </button>

    <select
      id="category-filter"
      value={_props.categoryFilter}
      onChange={(e) => _props.onCategoryChange(e.target.value)}
    >
      <option value="all">All categories</option>

      {_props.categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>

    <input
      id="search-input"
      type="text"
      placeholder="Search tasks..."
      value={_props.search ?? ''}
      onChange={(e) => _props.onSearchChange?.(e.target.value)}
    />

    {_props.search && (
      <button
        id="clear-search"
        onClick={() => _props.onSearchChange?.("")}
      >
        Clear search
      </button>
    )}

    <select id="sort-order" value={_props.sortOrder ?? 'recent'} onChange={(e) => _props.onSortOrderChange?.(e.target.value as 'recent' | 'highToLow' | 'lowToHigh' | 'alphabetical')}>
      <option value="recent">Recently Added</option>
      <option value="highToLow">Priority: High to Low</option>
      <option value="lowToHigh">Priority: Low to High</option>
      <option value="alphabetical">Alphabetical</option>
    </select>


  </div>
}