import { useState } from "react";
import useEvents from "../../hooks/useEvents";
import useInstalments from "../../hooks/useInstalments";
import styles from "./Widget.module.css";
import { getCopies } from "../../data/copies";
import Modal from "../Modal/Modal";

export interface WidgetProps {
  price: number;
  language?: string;
}

export default function Widget(props: WidgetProps) {
  const { instalments, loading } = useInstalments(props.price);
  const { sendTrackingEvent } = useEvents();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInstalment, setSelectedInstalment] = useState<number>(0);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedInstalment(event.currentTarget.selectedIndex);

    sendTrackingEvent({
      type: "simulatorInstalmentChanged",
      selectedInstalment: event.currentTarget.value,
      context: "checkoutWidget",
    });
  }

  function handleOpenInfo(): void {
    setIsOpen(true);
    sendTrackingEvent({
      type: "simulatorInstalmentInfoOpened",
      context: "checkoutWidget",
    });
  }

  return (
    !loading && (
      <div className={styles.widgetContainer}>
        <div className={styles.header}>
          <p className={`text-bold text-size-sm`}>
            {getCopies(props.language).ui.title}
          </p>
          <button className={styles.buttonLink} onClick={handleOpenInfo}>
            {getCopies(props.language).ui.moreInfo}
          </button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
            instalmentFee={instalments[selectedInstalment]["instalmentFee"]}
            language={props.language}
          ></Modal>
        </div>
        <select onChange={handleChange}>
          {instalments.map((instalment, index) => (
            <option key={index} value={instalment.instalmentCount}>
              `{instalment?.instalmentCount} cuotas de{" "}
              {instalment?.instalmentAmount?.string}`
            </option>
          ))}
        </select>
      </div>
    )
  );
}
