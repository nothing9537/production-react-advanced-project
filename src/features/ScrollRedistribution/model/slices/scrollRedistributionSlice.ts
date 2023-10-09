import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollPosition, ScrollRedistributionSchema } from '../types/scrollRedistribution';

const initialState: ScrollRedistributionSchema = {
  scroll: {},
};

const scrollRedistributionSlice = createSlice({
  name: 'scrollRedistribution',
  initialState,
  reducers: {
    setScrollPosition: (state, { payload }: PayloadAction<ScrollPosition>) => {
      state.scroll[payload.path] = payload.position;
    },
  },
});

export const { actions: scrollRedistributionActions, reducer: scrollRedistributionReducer } = scrollRedistributionSlice;
