import api from "./api";

export const noteService = {
  getNotes() {
    return api.get("/notes");
  },

  getNote(id) {
    return api.get(`/notes/${id}`);
  },

  createNote(data) {
    return api.post("/notes", data);
  },

  updateNote(id, data) {
    return api.patch(`/notes/${id}`, data);
  },

  deleteNote(id) {
    return api.delete(`/notes/${id}`);
  },
};
