import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import AuthContext from '../context/AuthContext'

const Home = () => {
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const { auth, setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleStart = async (event) => {
    event.preventDefault();
    try {
      const res = await API.post('/api/interview/generate', { role }, {
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      });
      navigate('/interview', { state: { questions: res.data.questions, role } });
    } catch (err) {
      setError('Failed to generate questions');
    }
  }

  const handleLogout = async () => {
    try {
    await API.get('/api/logout');
    setAuth({});
    navigate('/');
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Start an interview</h2>
        <p className="text-sm text-gray-500 mb-6">Enter a role to generate questions</p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleStart} className="space-y-4">
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Generate Questions
          </button>
        </form>

        <button onClick = {handleLogout} className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors mt-3">
          Logout 
        </button>
      </div>
    </div>
  )
}

export default Home;