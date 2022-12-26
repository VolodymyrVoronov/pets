import {
  SetStateAction,
  MutableRefObject,
  useState,
  useRef,
  useEffect,
} from "react";
import { motion } from "framer-motion";

import ImageCropper from "../ImageCropper/ImageCropper";
import PTag from "../PTag/PTag";
import Img from "../Img/Img";
import Button from "../Button/Button";

import placeholder from "../../assets/images/placeholder.jpeg";
import plusIcon from "../../assets/icon/plus-outline.svg";
import closeIcon from "../../assets/icon/close-outline.svg";

import styles from "./ImageUpload.module.css";

const ImageUpload = (): JSX.Element => {
  const croppedImageRef = useRef() as MutableRefObject<HTMLImageElement>;
  const [imageToCrop, setImageToCrop] = useState<string | ArrayBuffer | null>(
    null
  );
  const [croppedImage, setCroppedImage] = useState(undefined);
  const [uploadPhoto, setUploadPhoto] = useState(false);

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

  const saveImageAsBase64 = (urlImg: string) => {
    const img = new Image();
    img.src = urlImg;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);

    const b64 = canvas.toDataURL("image/png");

    return b64;
  };

  const onUpdatePhotoButtonClick = (): void => {
    setUploadPhoto(true);
  };

  const onCloseUploadPhotoButtonClick = (): void => {
    setUploadPhoto(false);
  };

  useEffect(() => {
    if (croppedImageRef.current) {
      const base64 = saveImageAsBase64(croppedImageRef.current.currentSrc);
      console.log(base64);
    }
  }, [croppedImage]);

  return (
    <div className={styles.container}>
      {uploadPhoto ? (
        <motion.div>
          <div className={styles["preview-header"]}>
            <input type="file" accept="image/*" onChange={onUploadFile} />
            <PTag size="l">Preview</PTag>
          </div>
          <div className={styles["preview-upload"]}>
            <ImageCropper
              imageToCrop={imageToCrop}
              onImageCropped={(_croppedImage: SetStateAction<undefined>) =>
                setCroppedImage(_croppedImage)
              }
            />

            <div className={styles["preview-container"]}>
              <Img
                ref={croppedImageRef}
                imageAlt="Cropped Img"
                imageUrl={croppedImage || placeholder}
                className={styles["preview-image"]}
              />
            </div>
          </div>
          <Button
            onClick={onCloseUploadPhotoButtonClick}
            type="button"
            className={styles["preview-btn"]}
            title="Close upload photo button."
          >
            <Img imageUrl={closeIcon} imageAlt="Close icon." />
          </Button>
        </motion.div>
      ) : (
        <motion.div className={styles["photo-container"]}>
          <Img
            imageUrl={placeholder}
            imageAlt="Photo"
            className={styles.photo}
          />
          <Button
            onClick={onUpdatePhotoButtonClick}
            type="button"
            className={styles["upload-photo-btn"]}
            title="Update photo button."
          >
            <Img imageUrl={plusIcon} imageAlt="Plus icon." />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload;
