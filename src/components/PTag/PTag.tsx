import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import styles from "./PTag.module.css";

export interface IPTagProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size?: "s" | "m" | "l" | "xl";
  children: ReactNode;
}

const PTag = ({
  size = "m",
  children,
  className,
  ...props
}: IPTagProps): JSX.Element => {
  return (
    <p
      className={cn(styles.pTag, className, {
        [styles.small]: size === "s",
        [styles.medium]: size === "m",
        [styles.large]: size === "l",
        [styles.largeXl]: size === "xl",
      })}
      {...props}
    >
      {children}
    </p>
  );
};

PTag.displayName = "PTag";

export default PTag;
