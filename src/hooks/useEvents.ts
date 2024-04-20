import { EVENTS_URL } from "../settings";
import { TrackingEvent } from "../types/trackingEvent";

export default function useEvents() {
  async function sendTrackingEvent(trackingEvent: TrackingEvent) {
    try {
      const response = await fetch(EVENTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackingEvent),
      });

      if (response.status !== 200) {
        throw new Error("Error sending tracking event");
      }
    } catch (e) {
      // Here error monitoring (Sentry, etc)
      console.error(`[InstalmentsWidget-Tracking] ${e}`);
    }
  }

  return { sendTrackingEvent };
}
