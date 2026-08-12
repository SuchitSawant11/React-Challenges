interface ButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  id?: string
}

export default function Button(_props: ButtonProps) {
  return (
    <button
      type={_props.type ?? 'button'}
      onClick={_props.onClick}
      id={_props.id}
    >
      {_props.children}
    </button>
  )
}
