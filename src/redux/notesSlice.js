import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { noteService } from "../services/noteService";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, thunkAPI) => {
    try {
      const response = await noteService.getNotes();
      const notes = response.data.data.notes.map((note) => ({
        ...note,
        id: note._id,
      }));
      return notes;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch notes"
      );
    }
  }
);

export const getNoteById = createAsyncThunk(
  "notes/getNoteById",
  async (id, thunkAPI) => {
    try {
      const response = await noteService.getNote(id);
      const note = {
        ...response.data.data.note,
        id: response.data.data.note._id,
      };
      return note;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to get note"
      );
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (data, thunkAPI) => {
    try {
      console.log("Sending createNote request", data);

      const response = await noteService.createNote(data);

      console.log("CreateNote API raw response", response);

      const note = {
        ...response.data.data.note,
        id: response.data.data.note._id,
      };

      console.log("Parsed note to save in store", note);

      return note;
    } catch (error) {
      console.log("Error in createNote", error.response?.data);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to create note"
      );
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await noteService.updateNote(id, data);
      const note = {
        ...response.data.data.note,
        id: response.data.data.note._id,
      };
      return note;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update note"
      );
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, thunkAPI) => {
    try {
      await noteService.deleteNote(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete note"
      );
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
