import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface ICardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}

const Card = ({ className, children, ...props }: ICardProps): JSX.Element => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default Card;
