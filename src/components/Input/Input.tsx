import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Input.module.css";

export interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input = ({ className, ...props }: IInputProps): JSX.Element => {
  return <input className={cn(className, styles.input)} {...props} />;
};

export default Input;
