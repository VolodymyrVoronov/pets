import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMutation } from "react-query";

import { addPet } from "../../services/api";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import Img from "../../components/Img/Img";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PTag from "../../components/PTag/PTag";
import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import TextArea from "../../components/TextArea/TextArea";

import arrowBackIcon from "../../assets/icons/arrow-back-outline.svg";
import saveIcon from "../../assets/icons/save-outline.svg";

import styles from "./AddPetPage.module.css";

interface IPetState {
  name: string;
  age: string;
  photo?: string;
  info?: string;
}

const initialPetState = {
  name: "",
  age: "",
  photo: "",
  info: "",
};

const AddPetPage = (): JSX.Element => {
  const navigator = useNavigate();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(addPet);

  const [petData, setPetData] = useState<IPetState>(initialPetState || {});

  const onBackButtonClick = (): void => {
    navigator(Paths.StartPage, { replace: true });
  };

  const onSaveButtonClick = (): void => {
    mutate(petData);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setPetData({
      ...petData,
      [e.target.name]: e.target.value,
    });
  };

  const onPhotoUploadChange = useCallback((photo: string): void => {
    setPetData((prev) => {
      return {
        ...prev,
        photo,
      };
    });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        navigator(Paths.PetsPage, { replace: true });

        clearTimeout(timeoutId);
      }, 1500);
    }
  }, [isSuccess, navigator]);

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <NavBar>
        <Button
          onClick={onBackButtonClick}
          className={styles["back-button"]}
          title="Back to start page."
        >
          <Img imageUrl={arrowBackIcon} imageAlt="Arrow back icon" />
        </Button>
        <Button
          onClick={onSaveButtonClick}
          className={styles["save-button"]}
          title="Save pet's data."
          disabled={petData.name === "" || petData.age === "" || isLoading}
        >
          {isLoading ? (
            <div className={styles["save-button-loader"]}>
              <Loader type="circle-arrow" />
            </div>
          ) : (
            <Img imageUrl={saveIcon} imageAlt="Save icon" />
          )}
        </Button>
      </NavBar>

      <div className={styles.container}>
        {isError && error instanceof Error && (
          <ColoredWrapper bg="red" className={styles["uploading-error"]}>
            <PTag size="l">
              Uploading failed: <br />
              {error.message}
            </PTag>
          </ColoredWrapper>
        )}

        {isSuccess && (
          <ColoredWrapper bg="green" className={styles["uploading-succeeded"]}>
            <PTag size="l">
              Uploading succeeded. <br />
              Redirecting to pets page...
            </PTag>
          </ColoredWrapper>
        )}

        <ColoredWrapper
          bg="yellow"
          isHovering
          className={styles["colored-wrapper-upload-image"]}
        >
          <ImageUpload onPhotoUploadChange={onPhotoUploadChange} />
        </ColoredWrapper>

        <ColoredWrapper
          bg="green"
          isHovering
          className={styles["colored-wrapper"]}
        >
          <PTag size="xl">Name *</PTag>
          <Input
            onChange={onInputChange}
            value={petData.name}
            className={styles.input}
            name="name"
            type="text"
          />
        </ColoredWrapper>

        <ColoredWrapper
          bg="orange"
          isHovering
          className={styles["colored-wrapper"]}
        >
          <PTag size="xl">Age *</PTag>
          <Input
            onChange={onInputChange}
            value={petData.age}
            className={styles.input}
            name="age"
            type="number"
            min="0"
          />
        </ColoredWrapper>

        <ColoredWrapper
          bg="blue"
          isHovering
          className={styles["colored-wrapper"]}
        >
          <PTag size="xl">Additional Information</PTag>
          <TextArea
            onChange={onInputChange}
            value={petData.info}
            className={styles["text-area"]}
            name="info"
            rows={10}
          />
        </ColoredWrapper>

        <ColoredWrapper
          bg="red"
          isHovering
          className={styles["colored-wrapper"]}
        >
          <PTag size="xl">* Fields are required!</PTag>
        </ColoredWrapper>
      </div>
    </motion.div>
  );
};

export default AddPetPage;
