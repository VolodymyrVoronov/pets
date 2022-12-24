import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import styles from "./PTag.module.css";

interface IPTagProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size?: "s" | "m" | "l" | "lXl";
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
        [styles.largeXl]: size === "lXl",
      })}
      {...props}
    >
      {children}
    </p>
  );
};

export default PTag;
