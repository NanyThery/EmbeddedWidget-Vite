import { useState } from "react";
import styles from "./CustomSelect.module.css";
import { MappedInstalmentInfo } from "../../types/instalments";
import useEvents from "../../hooks/useEvents";
import { getCopies } from "../../data/copies";

import ChevronDown from "../ChevronDown/ChevronDown";

interface CustomSelectProps {
  options: MappedInstalmentInfo[];
  onSelect: (index: number) => void;
  selected: number;
  language?: string;
}

export default function CustomSelect({
  options,
  onSelect,
  selected,
  language = "es",
}: CustomSelectProps) {
  const [isActive, setIsActive] = useState(false);

  const { sendTrackingEvent } = useEvents();
  function handleSelection(selectedInstalment: number, index: number): void {
    onSelect(index);
    setIsActive(false);

    sendTrackingEvent({
      type: "simulatorInstalmentChanged",
      selectedInstalment,
      context: "checkoutWidget",
    });
  }
  const optionCopies = getCopies(language).ui;
  return (
    <div className={styles.customSelect} data-testid="widget-custom-select">
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={`${styles.customSelectBtn} ${
          isActive ? styles.isActive : ""
        }`}
      >
        {options[selected].instalmentCount} {optionCopies.instalments}{" "}
        {options[selected].instalmentAmount.string}/{optionCopies.month}
        <ChevronDown
          customClass={`${styles.customSelectChevron} ${
            isActive ? styles.isActive : ""
          }`}
        />
      </div>

      <div
        className={`${styles.customSelectContent} `}
        style={{ display: isActive ? "block" : "none" }}
      >
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelection(option.instalmentCount, index)}
            className={styles.item}
          >
            {option.instalmentCount} {optionCopies.instalments}{" "}
            {option.instalmentAmount.string}/{optionCopies.month}
          </div>
        ))}
      </div>
    </div>
  );
}
