import { useState } from "react";
import useEvents from "../../hooks/useEvents";
import useInstalments from "../../hooks/useInstalments";

export interface WidgetProps {
  price: number;
}

export default function Widget(props: WidgetProps) {
  const { instalments, loading } = useInstalments(props.price);
  const { sendTrackingEvent } = useEvents();
  const [isOpen, setIsOpen] = useState(false);

  function handleTrackingEvent(event: React.ChangeEvent<HTMLSelectElement>) {
    sendTrackingEvent({
      type: "simulatorInstalmentChanged",
      selectedInstalment: parseInt(event.currentTarget.value),
      context: "checkoutWidget",
    });
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Price: {props.price}</h1>
          {isOpen && (
            <div
              style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                background: "red",
              }}
            >
              Modal
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          )}
          <button onClick={() => setIsOpen(true)}>Open</button>

          <select onChange={handleTrackingEvent}>
            {instalments.map((instalment, index) => (
              <option key={index} value={instalment.instalment_count}>
                `{instalment.instalment_count} cuotas de{" "}
                {instalment.instalment_amount.string}`
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
