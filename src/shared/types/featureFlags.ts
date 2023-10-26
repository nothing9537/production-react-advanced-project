export interface FeatureFlags {
  isArticleRatingEnabled?: boolean;
  isCounterEnabled?: boolean;
  isAppRedesigned?: boolean;
}

export type FeatureFlagsKeys = keyof FeatureFlags;
