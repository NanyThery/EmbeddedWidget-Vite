"use client";

const url = "http://localhost:8080/events";
export default function useEvents() {
  async function sendTrackingEvent(trackingEvent: TrackingEvent) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackingEvent),
      });

      if (response.status !== 200) {
        throw new Error("Error sending tracking event");
      }

      console.log("Tracking event sent");
    } catch (error) {
      // Here error monitoring (Sentry, etc)
      console.error(error);
    }
  }

  return { sendTrackingEvent };
}
