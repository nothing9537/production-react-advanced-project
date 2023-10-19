import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollRedistributionScroll = (state: StateSchema) => state.scrollRedistribution.scroll;
export const getScrollRedistributionByPath = createSelector(
  getScrollRedistributionScroll,
  (_: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
