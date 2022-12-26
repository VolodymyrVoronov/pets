import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import cn from "classnames";

import styles from "./TextArea.module.css";

export interface ITextAreaProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  rows?: number;
  cols?: number;
}

const TextArea = ({
  rows,
  cols,
  className,
  ...props
}: ITextAreaProps): JSX.Element => {
  return (
    <textarea
      className={cn(className, styles["text-area"])}
      {...props}
      rows={rows}
      cols={cols}
    />
  );
};

export default TextArea;
