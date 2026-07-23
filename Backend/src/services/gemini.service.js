import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

const generateAIResponse = async (messages) => {

    const prompt = messages
        .map((message) => {

            return `${message.role}: ${message.content}`;

        })
        .join("\n");

    const result = await model.generateContent(prompt);

    return result.response.text();

};

export {
    generateAIResponse
};