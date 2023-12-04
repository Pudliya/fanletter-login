import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addLetter = createAsyncThunk(
  "letters/addLetter",
  async (newLetterData) => {
    const response = await axios.post(
      "http://localhost:5000/letters",
      newLetterData
    );
    return response.data;
  }
);

export const fetchLetters = createAsyncThunk(
  "letters/fetchLetters",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/letters");
      // 팬레터 최신순으로 정렬하기
      const sortedData = response.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return sortedData;
    } catch (error) {
      throw new Error("Failed to fetch letters");
    }
  }
);

export const deleteLetter = createAsyncThunk(
  "letters/deleteLetter",
  async (letterId) => {
    const response = await axios.delete(
      `http://localhost:5000/letters/${letterId}`
    );
    return response.data;
  }
);

export const editLetter = createAsyncThunk(
  "letters/editLetter",
  async ({ id, editingText }) => {
    const response = await axios.put(`http://localhost:5000/letters/${id}`, {
      content: editingText,
    });
    return response.data;
  }
);

// 팬레터 추가
// const ADD_LETTER = "letters/ADD_LETTER";
// 팬레터 삭제
// const DELETE_LETTER = "letters/DELETE_LETTER";
// 팬레터 수정
// const EDIT_LETTER = "letters/EDIT_LETTER";

// export const addLetter = (payload) => {
//   return { type: ADD_LETTER, payload };
// };
// export const deleteLetter = (payload) => {
//   return { type: DELETE_LETTER, payload };
// };
// export const editLetter = (payload) => {
//   return { type: EDIT_LETTER, payload };
// };

const initialState = {
  letters: [],
};

// const letters = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_LETTER:
//       const newLetter = action.payload;
//       return [newLetter, ...state];
//     case DELETE_LETTER:
//       const letterId = action.payload;
//       return state.filter((letter) => letter.id !== letterId);
//     case EDIT_LETTER:
//       const { id, editingText } = action.payload;
//       return state.map((letter) => {
//         if (letter.id === id) {
//           return { ...letter, content: editingText };
//         }
//         return letter;
//       });
//     default:
//       return state;
//   }
// };

// const lettersSlice = createSlice({
//   name: "letters",
//   initialState,
//   reducers: {
//     addLetter: (state, action) => {
//       const newLetter = action.payload;
//       return [newLetter, ...state];
//     },
//     deleteLetter: (state, action) => {
//       const letterId = action.payload;
//       return state.filter((letter) => letter.id !== letterId);
//     },
//     editLetter: (state, action) => {
//       const { id, editingText } = action.payload;
//       return state.map((letter) => {
//         if (letter.id === id) {
//           return { ...letter, content: editingText };
//         }
//         return letter;
//       });
//     },
//   },
// });

// export default lettersSlice.reducer;
// export const { addLetter, deleteLetter, editLetter } = lettersSlice.actions;

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addLetter.fulfilled, (state, action) => {
        state.letters = [...state.letters, action.payload]; // 불변성을 유지하기 위한 방식으로 수정
      })
      .addCase(editLetter.fulfilled, (state, action) => {
        state.letters = state.letters.map((letter) => {
          if (letter.id === action.payload.id) {
            return { ...letter, content: action.payload.editingText };
          }
          return letter;
        });
      })
      .addCase(fetchLetters.fulfilled, (state, action) => {
        state.letters = action.payload;
      });
  },
});

export default lettersSlice.reducer;
