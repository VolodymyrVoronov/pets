import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import Img from "../../components/Img/Img";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PTag from "../../components/PTag/PTag";
import Input from "../../components/Input/Input";

import arrowBackIcon from "../../assets/icons/arrow-back-outline.svg";
import saveIcon from "../../assets/icons/save-outline.svg";

import styles from "./AddPetPage.module.css";
import TextArea from "../../components/TextArea/TextArea";

const AddPetPage = (): JSX.Element => {
  const navigator = useNavigate();

  const onBackButtonClick = (): void => {
    navigator(Paths.StartPage, { replace: true });
  };

  const onSaveButtonClick = (): void => {
    console.log("Data saved");
  };

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
        >
          <Img imageUrl={saveIcon} imageAlt="Save icon" />
        </Button>
      </NavBar>
      <div className={styles.container}>
        <ColoredWrapper
          bg="yellow"
          className={styles["colored-wrapper-upload-image"]}
        >
          <ImageUpload />
        </ColoredWrapper>

        <ColoredWrapper bg="green" className={styles["colored-wrapper"]}>
          <PTag size="lXl">Name</PTag>
          <Input className={styles.input} type="text" placeholder="Max" />
        </ColoredWrapper>

        <ColoredWrapper bg="orange" className={styles["colored-wrapper"]}>
          <PTag size="lXl">Age</PTag>
          <Input className={styles.input} type="number" min="0" />
        </ColoredWrapper>

        <ColoredWrapper bg="blue" className={styles["colored-wrapper"]}>
          <PTag size="lXl">Addition Information</PTag>
          <TextArea className={styles["text-area"]} />
        </ColoredWrapper>
      </div>
    </motion.div>
  );
};

export default AddPetPage;
