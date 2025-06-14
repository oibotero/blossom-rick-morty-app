// src/store/commentsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  characterId: number;
  text: string;
  date: string;
}

interface CommentsState {
  commentsByCharacter: Record<number, Comment[]>;
}

const initialState: CommentsState = {
  commentsByCharacter: JSON.parse(localStorage.getItem("comments") || "{}"),
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{ characterId: number; text: string }>
    ) => {
      const { characterId, text } = action.payload;
      const newComment: Comment = {
        characterId,
        text,
        date: new Date().toISOString(),
      };

      if (!state.commentsByCharacter[characterId]) {
        state.commentsByCharacter[characterId] = [];
      }
      state.commentsByCharacter[characterId].push(newComment);
      localStorage.setItem(
        "comments",
        JSON.stringify(state.commentsByCharacter)
      );
    },
  },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
