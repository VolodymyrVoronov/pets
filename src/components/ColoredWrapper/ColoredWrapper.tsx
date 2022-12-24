import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./ColoredWrapper.module.css";

export interface IColoredWrapper
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  bg: "orange" | "green" | "yellow" | "blue" | "red";
  isHovering?: boolean;
}

const ColoredWrapper = ({
  bg,
  isHovering = false,
  className,
  children,
  ...props
}: IColoredWrapper): JSX.Element => {
  return (
    <div
      className={cn(
        [styles.container, styles[`bg-${bg}`]],
        styles[`bg-${bg}-${isHovering && "hover"}`],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ColoredWrapper;
