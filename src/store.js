import {configureStore} from "@reduxjs/toolkit";
import mapReducer from "./mapSlice";

export default configureStore({
  reducer: {
    mapInfo: mapReducer,
  },
})