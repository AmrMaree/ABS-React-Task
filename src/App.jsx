import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotesDashboard from './pages/NotesDashboard';
import NoteView from './pages/NoteView';
import NoteForm from './pages/NoteForm';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import Header from "./components/Header";
import '@fontsource/pacifico';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <NotesDashboard />
              </ProtectedRoute>
            }
          />
          {/* Only one route for NoteForm with :id param */}
          <Route
            path="/note/:id"
            element={
              <ProtectedRoute>
                <NoteForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
