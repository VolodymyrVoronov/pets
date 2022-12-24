import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

interface IImageProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  imageUrl: string;
  imageAlt: string;
}

const Image = ({
  imageUrl,
  imageAlt,
  className,
  ...props
}: IImageProps): JSX.Element => {
  return (
    <img src={imageUrl} alt={imageAlt} className={cn(className)} {...props} />
  );
};

Image.displayName = "Image";

export default Image;
