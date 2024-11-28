import { FC, OptionHTMLAttributes } from 'react'

const Option: FC<OptionHTMLAttributes<HTMLOptionElement>> = ({
  children,
  ...rest
}) => {
  return <option {...rest}>{children}</option>
}

export default Option
