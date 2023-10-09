export type ScrollSchema = Record<string, number>;

export interface ScrollPosition {
  path: string;
  position: number;
}

export interface ScrollRedistributionSchema {
  scroll: ScrollSchema;
}
