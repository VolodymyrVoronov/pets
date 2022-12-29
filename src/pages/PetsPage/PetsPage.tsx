import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useKeyPress } from "react-use";

import { getPets, deletePet } from "../../services/api";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import NavBar from "../../components/NavBar/NavBar";
import PetCard from "../../components/PetCard/PetCard";
import Button from "../../components/Button/Button";
import Img from "../../components/Img/Img";
import Loader from "../../components/Loader/Loader";
import HTag from "../../components/HTag/HTag";
import PTag from "../../components/PTag/PTag";
import Popup from "../../components/Popup/Popup";

import arrowBackIcon from "../../assets/icons/arrow-back-outline.svg";
import errorImage from "../../assets/images/error-image-01.png";
import bookImage from "../../assets/images/book-image-01.png";

import styles from "./PetsPage.module.css";

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
  const [showPopup, setShowPopup] = useState(false);
  const isEscPressed = useKeyPress("Escape");

  const onBackButtonClick = (): void => {
    navigator(Paths.StartPage, { replace: true });
  };

  const onCardClick = (id: number): void => {
    navigator(Paths.PetPageInfo, { state: id });
  };

  const onFocusedCardKeyPress = (
    e: KeyboardEvent<HTMLDivElement>,
    id: number
  ): void => {
    const t = e.target as HTMLDivElement;

    if (e.key === "Enter" && t.nodeName === "DIV") {
      navigator(Paths.PetPageInfo, { state: id });
    }
  };

  const onCardDeleteButtonClick = (
    e: MouseEvent<HTMLButtonElement>,
    id: number
  ): void => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    setActiveCard(id);
    setShowPopup(true);
  };

  const onClosePopupClick = (): void => {
    setShowPopup(false);
  };

  const onConfirmButtonClick = (): void => {
    if (activeCard) {
      mutate(activeCard);
    }
  };

  useEffect(() => {
    if (isSuccessMutation) {
      refetch();
      setShowPopup(false);
    }

    if (isErrorMutation) {
      setShowPopup(false);
    }
  }, [isSuccessMutation, isErrorMutation, refetch]);

  useEffect(() => {
    if (isEscPressed) {
      setShowPopup(false);
    }
  }, [isEscPressed]);

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
          <Img imageUrl={arrowBackIcon} imageAlt="Arrow back icon." />
        </Button>
      </NavBar>

      {showPopup && (
        <Popup
          className={styles.popup}
          title="Do you really want to delete this card?"
          subtitle="There isn't any option to restore it after deleting!"
          onClose={onClosePopupClick}
        >
          <Button
            onClick={onConfirmButtonClick}
            className={styles["popup-confirm-button"]}
            title="Confirm deletion of the card."
          >
            <HTag tag="h6">Delete</HTag>
          </Button>
          <Button
            onClick={onClosePopupClick}
            className={styles["popup-close-button"]}
            title="Cancel deletion."
          >
            <HTag tag="h6">Close</HTag>
          </Button>
        </Popup>
      )}

      {isLoadingQuery && (
        <ColoredWrapper bg="blue" className={styles.loader}>
          <Loader />
        </ColoredWrapper>
      )}

      {data && data.length ? (
        <ColoredWrapper bg="blue" className={styles.container}>
          {data.map(({ id, age, name, info, photo }) => {
            return (
              <PetCard
                key={id}
                id={id}
                age={age}
                name={name}
                info={info}
                photo={photo}
                isErrorMutation={isErrorMutation}
                isLoadingMutation={isLoadingMutation}
                activeCard={activeCard}
                mutationError={mutationError}
                onCardClick={onCardClick}
                onFocusedCardKeyPress={onFocusedCardKeyPress}
                onCardDeleteButtonClick={onCardDeleteButtonClick}
              />
            );
          })}
        </ColoredWrapper>
      ) : (
        <ColoredWrapper bg="blue" className={styles["container-no-pets"]}>
          <Img
            className={styles["container-no-pets-image"]}
            imageUrl={bookImage}
            imageAlt="Book icon/image."
          />
          <HTag tag="h3" className={styles["container-no-pets-text"]}>
            No pets found
          </HTag>
        </ColoredWrapper>
      )}

      {isErrorQuery && queryError instanceof Error && (
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
            {queryError.message}.
          </PTag>
        </ColoredWrapper>
      )}
    </motion.div>
  );
};

PetsPage.displayName = "PetsPage";

export default PetsPage;
