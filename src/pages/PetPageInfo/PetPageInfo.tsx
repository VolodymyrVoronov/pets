import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

import { getPet } from "../../services/api";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import Img from "../../components/Img/Img";
import HTag from "../../components/HTag/HTag";
import PTag from "../../components/PTag/PTag";
import Loader from "../../components/Loader/Loader";

import arrowBackIcon from "../../assets/icons/arrow-back-outline.svg";
import homeIcon from "../../assets/icons/home-outline.svg";
import errorImage from "../../assets/images/error-image-01.png";
import placeholder from "../../assets/images/placeholder.jpeg";

import styles from "./PetPageInfo.module.css";

const PetPageInfo = (): JSX.Element => {
  const navigator = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError, error, remove } = useQuery(
    ["getPets", getPet],
    () => getPet(location.state)
  );

  const onBackButtonClick = (): void => {
    navigator(Paths.PetsPage, { replace: true });
  };

  const onHomeButtonClick = (): void => {
    navigator(Paths.StartPage, { replace: true });
  };

  useEffect(() => {
    return () => {
      remove();
    };
  }, [remove]);

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
          title="Back to pets page."
        >
          <Img imageUrl={arrowBackIcon} imageAlt="Arrow back icon." />
        </Button>
        <Button
          onClick={onHomeButtonClick}
          className={styles["home-button"]}
          title="Back to start page."
        >
          <Img imageUrl={homeIcon} imageAlt="Home icon." />
        </Button>
      </NavBar>

      {isLoading && (
        <ColoredWrapper bg="blue" className={styles.loader}>
          <Loader />
        </ColoredWrapper>
      )}

      {data && (
        <ColoredWrapper bg="blue" className={styles.container}>
          <div
            className={styles["card-photo"]}
            title={data.name}
            style={{ backgroundImage: `url(${data.photo || placeholder})` }}
          />
          <HTag tag="h4" className={styles["card-name"]}>
            Name: {data.name}
          </HTag>
          <HTag tag="h5" className={styles["card-age"]}>
            Age: {data.age}
          </HTag>

          {data.info && (
            <PTag size="l" className={styles["card-info"]}>
              {data.info}
            </PTag>
          )}
        </ColoredWrapper>
      )}

      {isError && error instanceof Error && (
        <ColoredWrapper bg="red" className={styles.error}>
          <Img
            className={styles["error-image"]}
            imageUrl={errorImage}
            imageAlt="Error icon/image."
          />
          <PTag className={styles["error-text"]} size="l">
            Something has gone wrong.
          </PTag>
          <PTag className={styles["error-text"]} size="l">
            {error.message}.
          </PTag>
        </ColoredWrapper>
      )}
    </motion.div>
  );
};

export default PetPageInfo;
