import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import styles from "./ColoredWrapper.module.css";

interface IColoredWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  bg: "orange" | "green" | "yellow" | "blue" | "red";
  isHovering?: boolean;
  children?: ReactNode;
}

const ColoredWrapper = ({
  bg,
  isHovering = false,
  className,
  children,
  ...props
}: IColoredWrapperProps): JSX.Element => {
  return (
    <div
      className={cn(
        [styles.container, styles[`bg-${bg}`]],
        [isHovering && styles[`bg-${bg}-hover`]],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

ColoredWrapper.displayName = "ColoredWrapper";

export default ColoredWrapper;
