import { createSlice } from "@reduxjs/toolkit";
import { Assignment } from "../../../types";

export const initialState: {
  assignments: Assignment[];
  assignment: Assignment;
} = {
  assignments: [],
  assignment: {
    _id: "A000",
    name: "New Assignment",
    description: "New Assignment Description",
    dueDate: "20-12-2022",
    totalPoints: 100,
    availableFromDate: null,
    availableUntilDate: null,
    published: false,
  },
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments = [
        ...state.assignments,
        {
          ...action.payload,
          _id: new Date().getTime().toString(),
        },
      ];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === action.payload._id) {
          return action.payload;
        } else {
          return assignment;
        }
      });
    },
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
  setAssignments,
} = assignmentSlice.actions;
export default assignmentSlice.reducer;
