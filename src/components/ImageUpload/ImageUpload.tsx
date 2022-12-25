import { SetStateAction, MutableRefObject, useState, useRef } from "react";

import ImageCropper from "../ImageCropper/ImageCropper";

import placeholder from "../../assets/images/placeholder.jpeg";

import styles from "./ImageUpload.module.css";
import PTag from "../PTag/PTag";

const ImageUpload = (): JSX.Element => {
  const croppedImageRef = useRef() as MutableRefObject<HTMLImageElement>;
  const [imageToCrop, setImageToCrop] = useState<string | ArrayBuffer | null>(
    null
  );
  const [croppedImage, setCroppedImage] = useState(undefined);

  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = reader.result;

        setImageToCrop(image);
      });

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getEmergencyFoundImg = (urlImg: string) => {
    const img = new Image();
    img.src = urlImg;
    img.crossOrigin = "Anonymous";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);

    const b64 = canvas.toDataURL("image/png");

    return b64;
  };

  const onSaveButtonClick = (): void => {
    if (croppedImageRef.current) {
      const base64 = getEmergencyFoundImg(croppedImageRef.current.currentSrc);
      console.log(base64);

      console.log(base64.toString().includes("data:,"));
    }
  };

  // console.log(croppedImageRef);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="file" accept="image/*" onChange={onUploadFile} />
        <PTag size="l">Preview</PTag>
        <button type="button" onClick={onSaveButtonClick}>
          Save Image
        </button>
      </div>
      <div className={styles.images}>
        <ImageCropper
          imageToCrop={imageToCrop}
          onImageCropped={(_croppedImage: SetStateAction<undefined>) =>
            setCroppedImage(_croppedImage)
          }
        />

        <div className={styles["preview-container"]}>
          <img
            ref={croppedImageRef}
            alt="Cropped Img"
            src={croppedImage || placeholder}
            className={styles["preview-image"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
