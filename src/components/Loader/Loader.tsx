import styles from "./Loader.module.css";

interface ILoaderProps {
  type?: "circle" | "circle-arrow";
}

const Loader = ({ type = "circle" }: ILoaderProps): JSX.Element => {
  return <span className={styles[`${type}`]} />;
};

export default Loader;
