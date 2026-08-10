interface FilterBarProps {
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
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
  </div>
}
