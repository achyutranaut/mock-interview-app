import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react';
import API from '../api/axios'
import AuthContext from '../context/AuthContext'

const Interview = () => {
  const { state } = useLocation();
  const { questions, role } = state;
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuestion = () => {
    if (!answer.trim()) { return setError('Please answer the question'); }
    setError('');

    const newAnswers = [...answers, { question: questions[currentIndex], answer }]
    setAnswers(newAnswers);
    setAnswer('');

    if (currentIndex === questions.length - 1) {
      handleFinish(newAnswers);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  const handleFinish = async (allAnswers) => {
    setLoading(true);
    try {
      const results = [];
      for (const qa of allAnswers) {
        const res = await API.post('/api/interview/feedback',
          { question: qa.question, answer: qa.answer },
          { headers: { Authorization: `Bearer ${auth.accessToken}` } }
        );
        results.push({ ...qa, feedback: res.data.feedback });
      }
      setLoading(false);
      navigate('/feedback', { state: { results, role } });
    } catch (err) {
      setLoading(false);
      setError('Failed to get feedback');
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">Generating feedback...</p>
          </div>
        ) : (
          <>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {questions[currentIndex]}
            </h2>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4">
                {error}
              </p>
            )}

            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Type your answer here..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            />

            <button
              onClick={handleQuestion}
              className="w-full mt-4 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Interview;
