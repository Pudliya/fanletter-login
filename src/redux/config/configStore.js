import { configureStore } from "@reduxjs/toolkit";
import lettersReducer, { fetchLetters } from "redux/modules/letters";
import memberReducer from "redux/modules/member";
import authReducer from "../modules/authSlice";

const store = configureStore({
  reducer: {
    letters: lettersReducer,
    member: memberReducer,
    auth: authReducer,
  },
});

store.dispatch(fetchLetters());

export default store;
