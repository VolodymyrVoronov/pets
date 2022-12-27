import {
  SetStateAction,
  MutableRefObject,
  useState,
  useRef,
  useEffect,
} from "react";
import { motion } from "framer-motion";

import ImageCropper from "../ImageCropper/ImageCropper";
import Img from "../Img/Img";
import Button from "../Button/Button";
import PTag from "../PTag/PTag";

import uploadIcon from "../../assets/icons/upload-outline.svg";

import styles from "./ImageUpload.module.css";

interface IImageUploadProps {
  onPhotoUploadChange: (photo: string) => void;
}

const ImageUpload = ({
  onPhotoUploadChange,
}: IImageUploadProps): JSX.Element => {
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

  const saveImageAsBase64 = (urlImg: string) => {
    const img = new Image();
    img.src = urlImg;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);

    const b64 = canvas.toDataURL("image/png");

    if (b64.includes("data:,")) return "";

    return b64;
  };

  useEffect(() => {
    if (croppedImageRef.current) {
      const base64 = saveImageAsBase64(croppedImageRef.current.currentSrc);

      onPhotoUploadChange(base64);
    }
  }, [croppedImage, onPhotoUploadChange]);

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className={styles["preview-header"]}>
          <PTag size="lXl">Photo upload:</PTag>
          <div className={styles["preview-upload-btn-wrapper"]}>
            <input
              type="file"
              accept="image/*"
              onChange={onUploadFile}
              title="Upload photo or image."
            />
            <Button
              type="button"
              className={styles["preview-upload-btn"]}
              title="Upload photo button."
            >
              <Img imageUrl={uploadIcon} imageAlt="Upload icon." />
            </Button>
          </div>
        </div>

        {imageToCrop && (
          <div className={styles["preview-upload"]}>
            <ImageCropper
              imageToCrop={imageToCrop}
              onImageCropped={(_croppedImage: SetStateAction<undefined>) =>
                setCroppedImage(_croppedImage)
              }
            />

            {croppedImage ? (
              <div className={styles["preview-container"]}>
                <Img
                  ref={croppedImageRef}
                  imageAlt="Cropped Img"
                  imageUrl={croppedImage}
                  className={styles["preview-image"]}
                />
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  minHeight: "25vh",
                  border: "1px dotted black",
                }}
              />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ImageUpload;
