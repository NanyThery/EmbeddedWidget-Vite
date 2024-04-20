import { useState } from "react";
import useEvents from "../../hooks/useEvents";
import useInstalments from "../../hooks/useInstalments";
import styles from "./Widget.module.css";
import { getCopies } from "../../data/copies";

export interface WidgetProps {
  price: number;
  language?: string;
}

export default function Widget(props: WidgetProps) {
  const { instalments, loading } = useInstalments(props.price);
  const { sendTrackingEvent } = useEvents();
  const [isOpen, setIsOpen] = useState(false);

  function handleTrackingEvent(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    sendTrackingEvent({
      type: "simulatorInstalmentChanged",
      selectedInstalment: parseInt(event.currentTarget.value),
      context: "checkoutWidget",
    });
  }

  return (
    <div className={styles.widgetContainer}>
      <div className={styles.header}>
        <p className={`text-bold text-size-sm`}>
          {getCopies(props.language).ui.title}
        </p>
        <button className={styles.buttonLink} onClick={() => setIsOpen(true)}>
          {getCopies(props.language).ui.moreInfo}
        </button>
        {isOpen && (
          <div
            style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              background: "red",
              top: 0,
              left: 0,
            }}
          >
            Modal
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        )}
      </div>
      <select onChange={handleTrackingEvent}>
        {instalments.map((instalment, index) => (
          <option key={index} value={instalment.instalment_count}>
            `{instalment.instalment_count} cuotas de{" "}
            {instalment.instalment_amount.string}`
          </option>
        ))}
      </select>
    </div>
  );
}
