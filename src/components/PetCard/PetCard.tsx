import { KeyboardEvent, MouseEvent } from "react";
import cn from "classnames";

import Card from "../Card/Card";
import HTag from "../HTag/HTag";
import PTag from "../PTag/PTag";
import Loader from "../Loader/Loader";

import deleteIcon from "../../assets/icons/trash-outline.svg";
import placeholder from "../../assets/images/placeholder.jpeg";

import styles from "./PetCard.module.css";
import Button from "../Button/Button";
import Img from "../Img/Img";

interface IPetCardProps {
  id: number;
  age: string;
  name: string;
  info: string;
  photo: string;

  isErrorMutation: boolean;
  isLoadingMutation: boolean;
  activeCard: number | undefined;
  mutationError: Error | unknown;

  onCardClick: (id: number) => void;
  onFocusedCardKeyPress: (e: KeyboardEvent<HTMLDivElement>, id: number) => void;
  onCardDeleteButtonClick: (
    e: MouseEvent<HTMLButtonElement>,
    id: number
  ) => void;
  setActiveCardHandler: (id: number) => void;
}

const PetCard = ({
  id,
  age,
  name,
  info,
  photo,

  isErrorMutation,
  isLoadingMutation,
  activeCard,
  mutationError,

  onCardClick,
  onFocusedCardKeyPress,
  onCardDeleteButtonClick,
  setActiveCardHandler,
}: IPetCardProps): JSX.Element => {
  return (
    <Card
      key={id}
      onClick={() => onCardClick(id)}
      onKeyDown={(e) => onFocusedCardKeyPress(e, id)}
      className={cn(styles.card, {
        [styles["card-error"]]: isErrorMutation && activeCard === id,
      })}
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
            setActiveCardHandler(id);
          }}
          className={styles["card-delete-button"]}
          title="Delete this card."
          disabled={isLoadingMutation}
        >
          <Img imageUrl={deleteIcon} imageAlt="Delete" />
        </Button>
      )}

      {isErrorMutation &&
        mutationError instanceof Error &&
        activeCard === id && (
          <PTag size="s" className={styles["card-deleting-error"]}>
            Something has gone wrong: <br />
            {mutationError.message}
          </PTag>
        )}
    </Card>
  );
};

export default PetCard;
