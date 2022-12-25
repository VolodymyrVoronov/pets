import { SetStateAction, useState } from "react";

import ImageCropper from "../ImageCropper/ImageCropper";

import placeholder from "../../assets/images/placeholder.jpeg";

import styles from "./ImageUpload.module.css";
import PTag from "../PTag/PTag";

const ImageUpload = (): JSX.Element => {
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="file" accept="image/*" onChange={onUploadFile} />
        <PTag size="l">Preview</PTag>
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
