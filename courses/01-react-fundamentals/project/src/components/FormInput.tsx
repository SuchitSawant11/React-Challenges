import { Ref} from 'react'

interface FormInputProps {
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  type?: string
  placeholder?: string
  inputRef?: Ref<HTMLInputElement>
}

export default function FormInput(_props: FormInputProps) {
  return (
    <input 
      id={_props.id}
      type={_props.type}
      name={_props.label}
      placeholder={_props.placeholder}
      value={_props.value}
      onChange={_props.onChange}
      ref={_props.inputRef}
    />
  )
}
