import { getCopies } from "../../data/copies";
import styles from "./Modal.module.css";
export default function Modal({
  isOpen,
  onClose,
  instalmentFee,
  language = "es",
}: {
  isOpen: boolean;
  onClose: () => void;
  instalmentFee: { value: number; string: string };
  language?: string;
}) {
  return (
    <>
      {isOpen && (
        <div className={styles.modalBackdrop} onClick={onClose}>
          <div className={styles.modalContainer}>
            <button className={styles.closeBtn} onClick={onClose}>
              X
            </button>
            <div className={styles.header}>
              <p className="ta-center">{getCopies(language).modal.sequra}</p>
              <h2 className="ta-center">{getCopies(language).modal.title}</h2>
            </div>
            <ul>
              {getCopies(language).modal.advantages.map((advantage, index) => (
                <li key={index}>
                  <div className={styles.liContent}>
                    <p>{advantage.copy}</p>
                    <div className={styles.liImgContainer}>
                      <img src={advantage.imgUrl} alt="" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="ta-center">
              {getCopies(language).modal.bottomLine(instalmentFee.string)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
