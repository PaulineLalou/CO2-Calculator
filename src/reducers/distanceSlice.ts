import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DistanceState {
  value: number | null;
  transportationMode: 'Car' | 'Plane';
}

const initialState: DistanceState = {
  value: null,
  transportationMode: 'Car',
};

const distanceSlice = createSlice({
  name: 'distance',
  initialState,
  reducers: {
    setDistance: (state, action: PayloadAction<number | null>) => {
      state.value = action.payload;
    },
    setTransportationMode: (state, action: PayloadAction<'Car' | 'Plane'>) => {
      state.transportationMode = action.payload;
      state.value = null; // Reset the distance value when the transportation mode changes
    },
  },
});

export const { setDistance, setTransportationMode } = distanceSlice.actions;

export default distanceSlice.reducer;
