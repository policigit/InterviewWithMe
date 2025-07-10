// const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (
//     `You are an AI trained to generate technical interview questions and answers.
//     Task:
//     - Role: ${role}
//     - Candidate Experience: ${experience} years
//     - Focus Topics: ${topicsToFocus}
//     - Number of Questions: ${numberOfQuestions}
//     - For each question, generate a detailed but beginner-friendly answer.
//     - Return a pure JSON array like:
//     [{
//         "question": "Question here?",
//         "answer": "Answer here"
//     },
//     ...
//     ]
//     Important: Do not add any extra text. Only return valid JSON.`
// );

// const conceptExplainPrompt = (question) => `
//     You are an AI trained to generate explanations for a given interview question.
//     Task:
//     - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
//     - Question: "${question}"
//     - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
//     - Keep the formatting very clear and readable.
//     - Return the result as a valid JSON object in the following format:
//     {
//         "title": "Short title here",
//         "explanation": "Explanation here."
//     }

//     Important: Do not add any extra text. Only return valid JSON.
// `;

// module.exports = { questionAnswerPrompt, conceptExplainPrompt };

const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (
    `You are an AI trained to generate technical interview questions and answers.

Generate exactly ${numberOfQuestions} interview questions for a ${role} with ${experience} years of experience, focusing on: ${topicsToFocus}.

For each question, provide a detailed but beginner-friendly answer.

CRITICAL: Your response must be ONLY a valid JSON array with no additional text, explanations, or formatting. Do not include \`\`\`json or any markdown.

Format:
[
    {
        "question": "What is the difference between let and var in JavaScript?",
        "answer": "The main differences are scope, hoisting behavior, and redeclaration rules..."
    },
    {
        "question": "Explain the concept of React components",
        "answer": "React components are reusable pieces of UI that can accept props..."
    }
]

Return exactly ${numberOfQuestions} questions in this JSON array format. Start your response with [ and end with ].`
);

const conceptExplainPrompt = (question) => `
You are an AI trained to generate explanations for interview questions.

Explain this interview question in depth for a beginner developer: "${question}"

CRITICAL: Your response must be ONLY a valid JSON object with no additional text, explanations, or formatting. Do not include \`\`\`json or any markdown.

Format:
{
    "title": "Short descriptive title",
    "explanation": "Detailed explanation of the concept, written for beginners with examples and clear language."
}

Start your response with { and end with }.`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };