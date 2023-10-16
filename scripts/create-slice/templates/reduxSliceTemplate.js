/* eslint-disable @typescript-eslint/no-var-requires */
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (slice) => {
  const typeName = `${firstCharUpperCase(slice)}Schema`;

  return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ${typeName} } from '../types/${slice}Schema';

const initialState: ${typeName} = {

};

const ${slice}Slice = createSlice({
  name: '${slice}',
  initialState,
  reducers: {},

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(.pending,(state, { payload }) => {
  //       state.isLoading = true;
  //       state.error = undefined;
  //     })
  //     .addCase(.fulfilled,(state, { payload }) => {
  //       state.isLoading = false;
  //     })
  //     .addCase(.rejected,(state, { payload }) => {
  //       state.isLoading = false;
  //       state.error = payload;
  //     });
  // },
});

export const { actions: ${slice}Actions, reducer: ${slice}Reducer } = ${slice}Slice;
`;
};
