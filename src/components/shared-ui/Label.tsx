import { FC, LabelHTMLAttributes } from 'react'

const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  ...rest
}) => {
  return <label {...rest}>{children}</label>
}

export default Label
