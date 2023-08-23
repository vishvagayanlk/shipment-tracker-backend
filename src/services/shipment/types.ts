export enum TrackingStatusEnum {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
}

export type TrackingStatusType = keyof typeof TrackingStatusEnum;
