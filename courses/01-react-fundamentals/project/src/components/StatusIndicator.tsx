interface StatusIndicatorProps {
  status?: string
}

export default function StatusIndicator(_props: StatusIndicatorProps) {
  return (
    <label className="status-indicator">
      {_props.status}
    </label>
  )
}
