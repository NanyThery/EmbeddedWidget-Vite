export interface TrackingEvent {
  type: string; // "We'd need to know if there are a fixed set of context to apply a more strict enum typing or not."
  context: string; // "We'd need to know if there are a fixed set of context to apply a more strict enum typing or not."
  [key: string]: string | number; // Accepts additional properties of the event.
}
