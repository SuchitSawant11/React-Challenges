interface StatsPanelProps {
  total?: number
  completed?: number
  active?: number
  overdue?: number
  completedPercentage?: number
}

export default function StatsPanel(_props: StatsPanelProps) {
  return (
    <section
      id="stats-panel"
      style={{
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-color)',
        borderColor: 'var(--border-color)'
      }}
    >
      <h2>Task Statistics</h2>

      <p>Total: {_props.total ?? 0}</p>

      <p>
        Completed: {_props.completed ?? 0} (
        {Math.round(_props.completedPercentage ?? 0)}%)
      </p>

      <p>Active: {_props.active ?? 0}</p>

      <p>Overdue: {_props.overdue ?? 0}</p>

      <div
        role="progressbar"
        aria-valuenow={_props.completedPercentage ?? 0}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          style={{
            width: `${_props.completedPercentage ?? 0}%`,
            backgroundColor: 'green',
            height: '100%'
          }}
        />
      </div>
    </section>
  )
}
