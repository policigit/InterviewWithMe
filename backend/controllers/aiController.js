// const { GoogleGenAI } = require("@google/genai");
// const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // @desc Generate interview questions and answers using Gemini
// // @route POST /api/ai/generate-questions
// // @access Private

// const generateInterviewQuestions = async (req, res) => {
//     try {
//         const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

//         if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        
//         const response = await ai.models.generateContent({
//             model:"gemini-2.0-flash-lite",
//             contents: prompt,
//         });

//         let rawText = response.response.text();

//         // Clean it: remove ```json and ``` from beginning and end
//         const cleanedText = rawText
//             .replace(/^```json\s*/i, "") // Remove starting ```json (case insensitive)
//             .replace(/```$/, "") // Remove ending ```
//             .trim(); // Remove extra spaces

//         // Now safe to parse
//         const data = JSON.parse(cleanedText);

//         res.status(200).json(data);
        
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to generate questions",
//             error: error.message,
//         });
//     }
// };

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

// @desc Generate interview questions and answers using Gemini
// @route POST /api/ai/generate-questions
// @access Private

const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if API key exists
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: "GEMINI_API_KEY not found" });
        }

        console.log("Initializing Gemini AI...");
        
        // Initialize the AI with your API key
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Get the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        
        console.log("Sending request to Gemini...");
        console.log("Prompt:", prompt);

        // Generate content
        const result = await model.generateContent(prompt);
        
        console.log("=== FULL RESULT OBJECT ===");
        console.log(JSON.stringify(result, null, 2));
        console.log("=== END FULL RESULT ===");

        // Check what's available in the result
        if (!result) {
            throw new Error("No result returned from Gemini");
        }

        if (!result.response) {
            console.log("No response property found");
            console.log("Available properties:", Object.keys(result));
            throw new Error("No response property in result");
        }

        console.log("=== RESPONSE OBJECT ===");
        console.log(JSON.stringify(result.response, null, 2));
        console.log("=== END RESPONSE OBJECT ===");

        // Try different ways to get the text
        let rawText;
        
        try {
            // Method 1: Standard way
            rawText = result.response.text();
            console.log("Method 1 successful");
        } catch (error1) {
            console.log("Method 1 failed:", error1.message);
            
            try {
                // Method 2: Direct access
                rawText = result.response.text;
                console.log("Method 2 successful");
            } catch (error2) {
                console.log("Method 2 failed:", error2.message);
                
                try {
                    // Method 3: Check candidates
                    if (result.response.candidates && result.response.candidates[0]) {
                        rawText = result.response.candidates[0].content.parts[0].text;
                        console.log("Method 3 successful");
                    }
                } catch (error3) {
                    console.log("Method 3 failed:", error3.message);
                    
                    // Log the full structure for debugging
                    console.log("Full response structure:", JSON.stringify(result.response, null, 2));
                    throw new Error("Could not extract text from response using any method");
                }
            }
        }

        if (!rawText) {
            throw new Error("No text content found in response");
        }

        console.log("=== RAW TEXT ===");
        console.log(rawText);
        console.log("=== END RAW TEXT ===");

        // Clean the response
        let cleanedText = rawText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim()
            .replace(/^[^{[]*/, "")
            .replace(/[^}\]]*$/, "");

        console.log("=== CLEANED TEXT ===");
        console.log(cleanedText);
        console.log("=== END CLEANED TEXT ===");

        // Parse JSON
        const data = JSON.parse(cleanedText);
        res.status(200).json(data);
        
    } catch (error) {
        console.error("=== FULL ERROR ===");
        console.error(error);
        console.error("=== END ERROR ===");
        
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};

// @desc Generate explanation for an interview question
// @route POST /api/ai/generate-explanation
// @access Private

// const generateConceptExplanation = async (req, res) => {
//     try {
//         const { question } = req.body;

//         if (!question) {
//             return res.status(400).json({ message: "Question is required" });
//         }

//         const prompt = conceptExplainPrompt(question);
        
//         const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
//         const response = await model.generateContent(prompt);

//         let rawText = response.response.text();

//         // Clean it: remove ```json and ``` from beginning and end
//         const cleanedText = rawText
//             .replace(/^```json\s*/i, "") // Remove starting ```json (case insensitive)
//             .replace(/```$/, "") // Remove ending ```
//             .trim(); // Remove extra spaces

//         // Now safe to parse
//         const data = JSON.parse(cleanedText);

//         res.status(200).json(data);
        
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to generate explanation",
//             error: error.message,
//         });
//     }
// };

const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        // Check if API key exists
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: "GEMINI_API_KEY not found" });
        }

        // Initialize the AI with your API key
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        const prompt = conceptExplainPrompt(question);
        
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        const response = await model.generateContent(prompt);

        let rawText = response.response.text();

        // Clean it: remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/i, "") // Remove starting ```json (case insensitive)
            .replace(/```$/, "") // Remove ending ```
            .trim(); // Remove extra spaces

        // Now safe to parse
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate explanation",
            error: error.message,
        });
    }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };