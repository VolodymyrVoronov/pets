import {
  ForwardedRef,
  forwardRef,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
import cn from "classnames";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}

const Button = forwardRef(
  (
    { children, className, ...props }: IButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element => {
    return (
      <button ref={ref} type="button" className={cn(className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
