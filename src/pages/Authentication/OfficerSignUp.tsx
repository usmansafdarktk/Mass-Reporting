import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import logo from '/images/logo.png';
import { signUpUser } from '../../utils/userauth';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  cnic: string;
  role: string;
  organization: string;
}

const OfficerSignUp: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    cnic: '',
    role: '',
    organization: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      await signUpUser(
        formData.name,
        formData.email,
        formData.password,
        formData.password,
        formData.phoneNumber,
        "Officer",                  
        formData.organization,
        formData.role            
      );
      navigate('/login');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-white text-black">
      <button
        onClick={() => navigate('/select-user-type')}
        className="absolute top-8 left-8 text-lg focus:outline-none"
      >
        <FaArrowLeft className="text-2xl text-black hover:opacity-80 transition-opacity" />
      </button>

      <div className="flex justify-start gap-x-4 items-center">
        <img src={logo} alt="Main Logo" className="h-16 w-16 mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2 drop-shadow-lg">
          AI Mass Reporting
        </h1>
      </div>

      <div className="p-8 rounded-lg w-[44rem] bg-gray-100 shadow-[0px_0px_4px_rgba(24,54,178,1)]">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">Officer Registration</h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Name & Email */}
          <div className="flex space-x-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Official Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="flex space-x-4">
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className="absolute right-3 top-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Role & Organization */}
          <div className="flex space-x-4">
            <input
              type="text"
              name="role"
              placeholder="Designation (e.g., Sub Inspector)"
              value={formData.role}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
            />
            <input
              type="text"
              name="organization"
              placeholder="Department (e.g., Punjab Police)"
              value={formData.organization}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
            />
          </div>

          {/* Phone & CNIC */}
          <div className="flex space-x-4">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number (e.g., 0300-1234567)"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
            />
            <input
              type="text"
              name="cnic"
              placeholder="CNIC Number (e.g., 35202-1234567-1)"
              value={formData.cnic}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="py-2 rounded-md font-semibold bg-[#1836b2] text-white hover:shadow-lg transition-all"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already registered?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-gray-800 hover:text-blue-600 underline border-none bg-transparent focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default OfficerSignUp;
