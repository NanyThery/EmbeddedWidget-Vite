import { useState } from "react";
import useEvents from "../../hooks/useEvents";
import useInstalments from "../../hooks/useInstalments";
import styles from "./Widget.module.css";
import { getCopies } from "../../data/copies";
import Modal from "../Modal/Modal";
import CustomSelect from "../CustomSelect/CustomSelect";
import "../../styles/global.css";

export interface WidgetProps {
  price: number | string;
  language?: string;
}

export default function Widget(props: WidgetProps) {
  const { instalments, loading } = useInstalments(props.price);
  const { sendTrackingEvent } = useEvents();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInstalment, setSelectedInstalment] = useState<number>(0);

  function handleOpenInfo(): void {
    setIsOpen(true);
    sendTrackingEvent({
      type: "simulatorInstalmentInfoOpened",
      context: "checkoutWidget",
    });
  }

  return (
    !loading &&
    instalments.length > 0 && (
      <div className={styles.widgetContainer}>
        <div className={styles.header}>
          <p className={`text-bold text-size-sm`}>
            {getCopies(props.language).ui.title}
          </p>
          <button
            className={styles.buttonLink}
            onClick={handleOpenInfo}
            data-testid="widget-modal-trigger"
          >
            {getCopies(props.language).ui.moreInfo}
          </button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
            instalmentFee={instalments[selectedInstalment]["instalmentFee"]}
            language={props.language}
          ></Modal>
        </div>

        <CustomSelect
          options={instalments}
          selected={selectedInstalment}
          language={props.language}
          onSelect={(selected: number) => setSelectedInstalment(selected)}
        />
      </div>
    )
  );
}
