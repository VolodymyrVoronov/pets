import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import styles from "./HTag.module.css";

interface IHTagProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLParagraphElement
  > {
  tag?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
}

const HTag = ({
  tag = "h1",
  children,
  className,
  ...props
}: IHTagProps): JSX.Element => {
  const Component = tag;

  return (
    <Component
      className={cn(styles.hTag, styles[`${tag}`], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default HTag;
