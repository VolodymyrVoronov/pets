import { useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

import placeholder from "../../assets/images/placeholder.jpeg";

import "react-image-crop/dist/ReactCrop.css";
import styles from "./ImageCropper.module.css";

const ImageCropper = ({ imageToCrop, onImageCropped }: any): JSX.Element => {
  const [cropConfig, setCropConfig] = useState<Crop>({
    unit: "%",
    width: 50,
    aspect: 1 / 1,
  });

  const [imageRef, setImageRef] = useState<HTMLImageElement>();

  function getCroppedImage(
    sourceImage: HTMLCanvasElement | any,
    _cropConfig: ReactCrop.Crop,
    fileName: string
  ) {
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = _cropConfig.width as number;
    canvas.height = _cropConfig.height as number;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.drawImage(
      sourceImage,
      (_cropConfig.x as number) * scaleX,
      (_cropConfig.y as number) * scaleY,
      (_cropConfig.width as number) * scaleX,
      (_cropConfig.height as number) * scaleY,
      0,
      0,
      _cropConfig.width as number,
      _cropConfig.height as number
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        blob.name = fileName;
        const croppedImageUrl = window.URL.createObjectURL(blob);

        resolve(croppedImageUrl);
      }, "image/jpeg");
    });
  }

  async function cropImage(crop: ReactCrop.Crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        "croppedImage.jpeg"
      );

      onImageCropped(croppedImage);
    }
  }

  return (
    <div className={styles.container}>
      <ReactCrop
        src={imageToCrop || placeholder}
        crop={cropConfig}
        ruleOfThirds
        onImageLoaded={(_imageRef) => setImageRef(_imageRef)}
        onComplete={(_cropConfig) => cropImage(_cropConfig)}
        onChange={(_cropConfig) => setCropConfig(_cropConfig)}
        crossorigin="anonymous"
      />
    </div>
  );
};

export default ImageCropper;
