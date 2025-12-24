import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookReaderState {
  // Key format: "bookId/chapterId" -> last read page
  lastReadPages: Record<string, number>;
  // Reading progress: "bookId/chapterId" -> reading session data
  readingSessions: Record<string, {
    lastReadAt: number;
    totalPagesRead: number;
    readingTime: number; // in seconds
    bookmarks: number[]; // page numbers
  }>;
}

const initialState: BookReaderState = {
  lastReadPages: {},
  readingSessions: {},
};

const bookReaderSlice = createSlice({
  name: 'bookReader',
  initialState,
  reducers: {
    setLastReadPage: (
      state,
      action: PayloadAction<{
        bookId: string;
        chapterId: string;
        page: number;
      }>
    ) => {
      const key = `${action.payload.bookId}/${action.payload.chapterId}`;
      state.lastReadPages[key] = action.payload.page;

      // Update reading session
      if (!state.readingSessions[key]) {
        state.readingSessions[key] = {
          lastReadAt: Date.now(),
          totalPagesRead: action.payload.page,
          readingTime: 0,
          bookmarks: [],
        };
      } else {
        state.readingSessions[key].lastReadAt = Date.now();
        state.readingSessions[key].totalPagesRead = Math.max(
          state.readingSessions[key].totalPagesRead,
          action.payload.page
        );
      }
    },

    updateReadingTime: (
      state,
      action: PayloadAction<{
        bookId: string;
        chapterId: string;
        timeSpent: number; // in seconds
      }>
    ) => {
      const key = `${action.payload.bookId}/${action.payload.chapterId}`;
      if (state.readingSessions[key]) {
        state.readingSessions[key].readingTime += action.payload.timeSpent;
      }
    },

    toggleBookmark: (
      state,
      action: PayloadAction<{
        bookId: string;
        chapterId: string;
        page: number;
      }>
    ) => {
      const key = `${action.payload.bookId}/${action.payload.chapterId}`;
      if (!state.readingSessions[key]) {
        state.readingSessions[key] = {
          lastReadAt: Date.now(),
          totalPagesRead: action.payload.page,
          readingTime: 0,
          bookmarks: [],
        };
      }

      const bookmarks = state.readingSessions[key].bookmarks;
      const index = bookmarks.indexOf(action.payload.page);
      if (index > -1) {
        bookmarks.splice(index, 1);
      } else {
        bookmarks.push(action.payload.page);
        bookmarks.sort((a, b) => a - b);
      }
    },

    clearReadingSession: (
      state,
      action: PayloadAction<{
        bookId: string;
        chapterId: string;
      }>
    ) => {
      const key = `${action.payload.bookId}/${action.payload.chapterId}`;
      delete state.readingSessions[key];
      delete state.lastReadPages[key];
    },
  },
});

export const {
  setLastReadPage,
  updateReadingTime,
  toggleBookmark,
  clearReadingSession,
} = bookReaderSlice.actions;

export default bookReaderSlice.reducer;

