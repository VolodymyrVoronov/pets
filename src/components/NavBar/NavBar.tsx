import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

import styles from "./NavBar.module.css";

interface INavBarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}

const NavBar = ({
  className,
  children,
  ...props
}: INavBarProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className={cn(styles.container, className)} {...props}>
        {children}
      </div>
    </motion.div>
  );
};

NavBar.displayName = "NavBar";

export default NavBar;
