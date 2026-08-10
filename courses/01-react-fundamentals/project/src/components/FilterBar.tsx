interface FilterBarProps {
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
  sortOrder?: 'recent' | 'highToLow' | 'lowToHigh' | 'alphabetical'
  onSortOrderChange?: (sortOrder: 'recent' | 'highToLow' | 'lowToHigh' | 'alphabetical') => void
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

    <select id="sort-order" value={_props.sortOrder ?? 'recent'} onChange={(e) => _props.onSortOrderChange?.(e.target.value as 'recent' | 'highToLow' | 'lowToHigh' | 'alphabetical')}>
      <option value="recent">Recently Added</option>
      <option value="highToLow">Priority: High to Low</option>
      <option value="lowToHigh">Priority: Low to High</option>
      <option value="alphabetical">Alphabetical</option>
    </select>
  </div>
}
