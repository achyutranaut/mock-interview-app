import { useLocation, useNavigate } from 'react-router-dom'

const Feedback = () => {
  const { state } = useLocation();
  const { results, role } = state;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Interview Feedback</h2>
        <p className="text-sm text-gray-500 mb-8">{role}</p>

        <div className="space-y-4">
          {results.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                Question {index + 1}
              </p>
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                {item.question}
              </h3>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                  Your answer
                </p>
                <p className="text-sm text-gray-700">{item.answer}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                  Feedback
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-line">{item.feedback}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/home')}
          className="w-full mt-6 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Start New Interview
        </button>
      </div>
    </div>
  )
}

export default Feedback