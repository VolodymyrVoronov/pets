import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import ReactDOM from "react-dom";
import cn from "classnames";
import { motion } from "framer-motion";

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
  const portalContainer = document.getElementById("nav-bar") as HTMLElement;

  return ReactDOM.createPortal(
    <motion.div
      initial={{ x: "-100px" }}
      animate={{ x: 0 }}
      exit={{ x: "-100px" }}
      transition={{ duration: 2 }}
    >
      <div className={cn(styles.container, className)} {...props}>
        {children}
      </div>
    </motion.div>,
    portalContainer
  );
};

export default NavBar;
