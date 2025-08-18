import { LongPressEventType, type LongPressOptions } from "use-long-press";

export const LONG_PRESS_OPTIONS: LongPressOptions = {
  detect: LongPressEventType.Touch,
  threshold: 500,
  cancelOnMovement: true,
  cancelOutsideElement: true,
};
