import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await dispatch(login(data));
  };

  useEffect(() => {
    if (token) {
      toast.success('Logged in!');
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="font-['Pacifico'] text-center text-4xl mb-2 text-blue-500">ABS.AI Notes</h2>
        <p className="text-center text-gray-600 mb-6">Welcome back! Please login to your account.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', { required: true })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: true })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-between items-center">
            <a href="/forgot-password" className="text-blue-500 text-sm">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 font-medium">Register now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
