const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateQuestions = async (req, res) => {
  const { role } = req.body;
  if (!role) return res.status(400).json({ message: " Role is required " });

  const prompt = `Generate 5 unique technical interview questions specifically tailored for a ${role} position.

    Requirements:
    - Questions must be highly specific to the core responsibilities of a ${role}.
    - Avoid generic questions that could apply to any software role.
    - Cover a mix of: one conceptual question, two practical/scenario-based questions, one problem-solving question, and one behavioral/role-specific question.
    - Return exactly 5 questions.
    - Return only a valid JSON array of strings.
    - Do not include markdown, explanations, or any extra text.

    Example:
    [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5"
    ]`

  try {
    const result = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9
    })

    const text = result.choices[0].message.content
    const questions = JSON.parse(text);
    res.json({ questions });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const evaluateAnswer = async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) return res.status(400).json({ message: 'Question and answer are required to proceed' });

  const prompt = `You are a technical interviewer. A candidate was asked the following question:
    Question: ${question}

    Their answer was:
    ${answer}

    Evaluate their answer and provide:
    1. A score out of 10
    2. What they got right
    3. What was missing or incorrect
    4. A model answer for reference

    Be concise and constructive.`

  try {
    const result = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9
    })

    const text = result.choices[0].message.content
    res.json({ feedback: text });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { generateQuestions, evaluateAnswer }