import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, deleteNote } from '../redux/notesSlice';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const NotesDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notes } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="fixed top-16 left-0 bottom-0 w-60 bg-gray-50 border-r z-10 shadow">
        <nav className="flex flex-col h-full py-5 px-4 space-y-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center w-full px-3 py-2 rounded-md bg-blue-100 text-blue-700 font-medium"
          >
            <i className="ri-dashboard-line text-lg mr-3"></i>
            Dashboard
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <i className="ri-file-list-line text-lg mr-3"></i>
            My Notes
          </button>

          <button
            onClick={() => alert('Coming soon')}
            className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <i className="ri-share-line text-lg mr-3"></i>
            Shared Notes
          </button>

          <button
            onClick={() => alert('Coming soon')}
            className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <i className="ri-bank-card-line text-lg mr-3"></i>
            Billing
          </button>

          <div className="mt-auto border-t pt-4 text-gray-300">
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-gray-700 hover:text-red-500 px-3 py-2"
            >
              <i className="ri-logout-box-line text-lg mr-3"></i>
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-60 pt-24 px-8 pb-8 bg-gray-100 min-h-screen">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.name || 'User'}
          </h2>
          <p className="text-gray-600 mt-1">
            You have {notes?.length || 0} notes in your workspace
          </p>
        </div>

        {/* Add Note Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate('/note/new')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            + Add Note
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes?.length === 0 && (
            <p className="text-gray-500 col-span-full">No notes found.</p>
          )}

          {notes?.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-lg shadow p-5 flex flex-col justify-between hover:shadow-md transition"
              onClick={() => navigate(`/note/${note.id}`)}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {note.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/note/${note.id}`);
                      }}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <i className="ri-edit-line text-lg"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(note.id);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {note.content?.slice(0, 150)}...
                </p>
              </div>

              <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Last edited: {note.updatedAt?.slice(0, 10)}
                </span>
                <div className="flex -space-x-2">
                  {note.collaborators?.slice(0, 3).map((name, index) => (
                    <div
                      key={index}
                      className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex items-center justify-center border-2 border-white"
                    >
                      {name[0]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotesDashboard;
