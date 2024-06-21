import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  beneficiaries: [],
};

const beneficiariesSlice = createSlice({
  name: "beneficiaries",
  initialState,
  reducers: {
    setBeneficiaries: (state, action) => {
      state.beneficiaries = action.payload;
    },
    addBeneficiary: (state, action) => {
      state.beneficiaries.push(action.payload);
    },
    editBeneficiary: (state, action) => {
      const index = state.beneficiaries.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.beneficiaries[index] = action.payload;
      }
    },
    removeBeneficiary: (state, action) => {
      state.beneficiaries = state.beneficiaries.filter((b) => b.id !== action.payload);
    },
  },
});

export const { setBeneficiaries, addBeneficiary, editBeneficiary, removeBeneficiary } =
  beneficiariesSlice.actions;

export default beneficiariesSlice.reducer;
