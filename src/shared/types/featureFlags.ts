export interface FeatureFlags {
  isArticleRatingEnabled?: boolean;
  isCounterEnabled?: boolean;
}

export type FeatureFlagsKeys = keyof FeatureFlags;
