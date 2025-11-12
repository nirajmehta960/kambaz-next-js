import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enroll: (
      state,
      { payload }: { payload: { user: string; course: string } }
    ) => {
      const exists = state.enrollments.some(
        (e: any) => e.user === payload.user && e.course === payload.course
      );
      if (!exists) {
        state.enrollments = [
          ...state.enrollments,
          {
            _id: new Date().getTime().toString(),
            user: payload.user,
            course: payload.course,
          },
        ] as any;
      }
    },
    unenroll: (
      state,
      { payload }: { payload: { user: string; course: string } }
    ) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
