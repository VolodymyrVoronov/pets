import {
  DetailedHTMLProps,
  HTMLAttributes,
  ForwardedRef,
  forwardRef,
} from "react";
import cn from "classnames";

interface IImgProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  imageUrl: string;
  imageAlt: string;
}

const Img = forwardRef(
  (
    { imageUrl, imageAlt, className, ...props }: IImgProps,
    ref: ForwardedRef<HTMLImageElement>
  ): JSX.Element => {
    return (
      <img
        ref={ref}
        src={imageUrl}
        alt={imageAlt}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Img.displayName = "Img";

export default Img;
