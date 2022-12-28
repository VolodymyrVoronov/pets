import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { getPets, deletePet } from "../../services/api";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import NavBar from "../../components/NavBar/NavBar";
import PetCard from "../../components/PetCard/PetCard";
import Button from "../../components/Button/Button";
import Img from "../../components/Img/Img";
import Loader from "../../components/Loader/Loader";
import PTag from "../../components/PTag/PTag";

import arrowBackIcon from "../../assets/icons/arrow-back-outline.svg";
import errorImage from "../../assets/images/error-image-01.png";

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

    mutate(id);
  };

  const setActiveCardHandler = (id: number): void => {
    setActiveCard(id);
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
          <Img imageUrl={arrowBackIcon} imageAlt="Arrow back icon." />
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
                setActiveCardHandler={setActiveCardHandler}
              />
            );
          })}
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
