import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import HTag, { IHTagProps } from "../HTag/HTag";
import PTag, { IPTagProps } from "../PTag/PTag";
import Button from "../Button/Button";
import Img from "../Img/Img";

import closeIcon from "../../assets/icons/close-outline.svg";

import styles from "./Popup.module.css";

type TTitleTag = Pick<IHTagProps, "tag">;
type TSubtitleTag = Pick<IPTagProps, "size">;

interface IPopupProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    TTitleTag,
    TSubtitleTag {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children?: ReactNode;
}

const Popup = ({
  title,
  tag: titleTag = "h4",
  subtitle,
  size: subtitleSize = "m",
  onClose,
  className,
  children,
  ...props
}: IPopupProps): JSX.Element => {
  return (
    <div className={cn(styles.container, className)} {...props}>
      <div className={styles.body}>
        <div className={styles.header}>
          <Button className={styles.close} onClick={onClose}>
            <Img imageUrl={closeIcon} imageAlt="Close icon/image." />
          </Button>

          <HTag tag={titleTag} className={styles.title}>
            {title}
          </HTag>

          {subtitle && (
            <PTag size={subtitleSize} className={styles.subtitle}>
              {subtitle}
            </PTag>
          )}
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
