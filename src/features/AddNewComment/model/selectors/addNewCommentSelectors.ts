import { StateSchema } from 'app/providers/StoreProvider';

export const getAddNewCommentText = (state: StateSchema) => state.addCommentForm?.text;
export const getAddNewCommentIsLoading = (state: StateSchema) => state.addCommentForm?.isLoading;
export const getAddNewCommentError = (state: StateSchema) => state.addCommentForm?.error;
