import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { getPets, deletePet } from "../../services/api";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import Img from "../../components/Img/Img";
import Loader from "../../components/Loader/Loader";
import PTag from "../../components/PTag/PTag";
import Card from "../../components/Card/Card";

import arrowBackIcon from "../../assets/icons/arrow-back-outline.svg";
import deleteIcon from "../../assets/icons/trash-outline.svg";
import errorImage from "../../assets/images/error-image-01.png";
import placeholder from "../../assets/images/placeholder.jpeg";

import styles from "./PetsPage.module.css";
import HTag from "../../components/HTag/HTag";

const PetsPage = (): JSX.Element => {
  const navigator = useNavigate();

  const {
    data,
    isLoading: isLoadingQuery,
    isError: isErrorQuery,
    error: queryError,
    refetch,
  } = useQuery("getPets", getPets);

  const {
    mutate,
    isSuccess: isSuccessMutation,
    isLoading: isLoadingMutation,
    isError: isErrorMutation,
    error: mutationError,
  } = useMutation("deletePet", deletePet);

  const [activeCard, setActiveCard] = useState<number>();

  const onBackButtonClick = (): void => {
    navigator(Paths.StartPage, { replace: true });
  };

  const onCardClick = (id: number): void => {
    console.log(id, "Click");
  };

  const onFocusedCardKeyPress = (
    e: KeyboardEvent<HTMLDivElement>,
    id: number
  ): void => {
    const t = e.target as HTMLDivElement;

    if (e.key === "Enter" && t.nodeName === "DIV") {
      console.log(id, "Enter");
    }
  };

  const onCardDeleteButtonClick = (
    e: MouseEvent<HTMLButtonElement>,
    id: number
  ): void => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    mutate(id);
  };

  useEffect(() => {
    if (isSuccessMutation) {
      refetch();
    }
  }, [isSuccessMutation, refetch]);

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
          <Img imageUrl={arrowBackIcon} imageAlt="Arrow back" />
        </Button>
      </NavBar>

      {isLoadingQuery && (
        <ColoredWrapper bg="blue" className={styles.loader}>
          <Loader />
        </ColoredWrapper>
      )}

      {data && (
        <ColoredWrapper bg="blue" className={styles.container}>
          {data.map(({ id, age, name, info, photo }) => {
            return (
              <Card
                key={id}
                onClick={() => onCardClick(id)}
                onKeyDown={(e) => onFocusedCardKeyPress(e, id)}
                className={styles.card}
                tabIndex={0}
              >
                <div
                  className={styles["card-photo"]}
                  title={name}
                  style={{ backgroundImage: `url(${photo || placeholder})` }}
                />
                <HTag tag="h4" className={styles["card-name"]}>
                  Name: {name}
                </HTag>
                <HTag tag="h5" className={styles["card-age"]}>
                  Age: {age}
                </HTag>

                {info && (
                  <PTag size="l" className={styles["card-info"]}>
                    {info}
                  </PTag>
                )}

                {isLoadingMutation && activeCard === id ? (
                  <div className={styles["card-delete-button-icon"]}>
                    <Loader type="circle-arrow" />
                  </div>
                ) : (
                  <Button
                    onClick={(e) => {
                      onCardDeleteButtonClick(e, id);
                      setActiveCard(id);
                    }}
                    className={styles["card-delete-button"]}
                    title="Delete this card."
                    disabled={isLoadingMutation}
                  >
                    <Img imageUrl={deleteIcon} imageAlt="Delete" />
                  </Button>
                )}
              </Card>
            );
          })}
        </ColoredWrapper>
      )}

      {isErrorQuery && queryError instanceof Error && (
        <ColoredWrapper bg="red" className={styles.error}>
          <Img
            className={styles["error-image"]}
            imageUrl={errorImage}
            imageAlt="Error."
          />
          <PTag className={styles["error-text"]} size="l">
            Something has gone wrong.
          </PTag>
          <PTag className={styles["error-text"]} size="l">
            {queryError.message}.
          </PTag>
        </ColoredWrapper>
      )}
    </motion.div>
  );
};

PetsPage.displayName = "PetsPage";

export default PetsPage;
