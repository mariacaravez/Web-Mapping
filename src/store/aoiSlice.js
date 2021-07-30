/*
 * Author: Maria Caravez
 * Description: Redux slice that shall contain community
 * information based on an area of interest set by the user.
 */

import { createSlice } from "@reduxjs/toolkit";

export const aoiSlice = createSlice({
  name: "areaOfInterest",
  initialState: {
    communityInfo: [],
    longitude: null,
    latitude: null,
    area: null,
    bounds: []
  },
  reducers: {
    setCommunityInfo: (state, action) => {
      state.communityInfo.push({
        type: action.payload.type,
        label: action.payload.label,
      });
    },
    clearCommunityInfo: (state) => {
      state.communityInfo.length = 0;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload.longitude;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload.latitude;
    },
    setArea: (state, action) => {
      state.area = action.payload.area;
    },
    setBounds: (state, action) => {
      state.bounds.push({
        // lng: action.payload.lng,
        // lat: action.payload.lat,
        north: action.payload.north,
        east: action.payload.east,
        south: action.payload.south,
        west: action.payload.west,

      });
    },
    clearBounds: (state) => {
      state.bounds.length = 0;
    },
  },
});

export const aoiActions = aoiSlice.actions;

export default aoiSlice.reducer;
