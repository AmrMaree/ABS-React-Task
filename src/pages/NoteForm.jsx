import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNote,
  updateNote,
  getNoteById,
  fetchNotes,
} from "../redux/notesSlice";
import { useEffect } from "react";

const NoteForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const isNew = id === "new";

  useEffect(() => {
    console.log("Current param id:", id);

    if (!isNew) {
      dispatch(getNoteById(id)).then((res) => {
        console.log("Fetched note:", res.payload);

        if (res.payload) {
          setValue("title", res.payload.title);
          setValue("content", res.payload.content);
        }
      });
    }
  }, [id, dispatch, setValue, isNew]);

  const onSubmit = async (data) => {
    console.log("Submitting note data:", data);

    if (isNew) {
      const result = await dispatch(createNote(data));
      console.log("createNote result:", result);
    } else {
      const result = await dispatch(updateNote({ id, data }));
      console.log("updateNote result:", result);
    }

    await dispatch(fetchNotes());

    navigate("/dashboard");
  };

  return (
    <main className="ml-60 pt-24 px-8 pb-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">
        {isNew ? "Add Note" : "Edit Note"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-1 text-gray-700">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Content</label>
          <textarea
            {...register("content", { required: true })}
            className="w-full p-3 border rounded h-40"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Note
        </button>
      </form>
    </main>
  );
};

export default NoteForm;
