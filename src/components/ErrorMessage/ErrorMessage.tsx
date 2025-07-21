import styles from "./ErrorMessage.module.css";
interface Props {
  message?: string;
}
export const ErrorMessage = ({ message }: Props) => {
  return (
    <p className={styles.text}>
      {" "}
      {message || "There was an error, please try again..."}{" "}
    </p>
  );
};
