interface BadgeProps {
  children?: React.ReactNode
}

export default function Badge(_props: BadgeProps) {
  return (
    <label className="badge">
      {_props.children}: 
    </label>
  )
}
