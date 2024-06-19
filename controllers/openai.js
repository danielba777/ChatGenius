const OpenAI = require('openai')
require("dotenv").config({ path: "../config.env" })

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_SECRET
})

// Summarize Text
exports.summarize = async (req, res) => {

    const { text } = req.body

    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Summarize this: ${text}`,
            max_tokens: 1000,
            temperature: 0.5,
        });

        return res.status(200).json(response.data.choices[0].text)

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Create paragraph
exports.paragraph = async (req, res) => {

    const { text } = req.body

    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Write a short paragraph about: ${text}`,
            max_tokens: 1000,
            temperature: 0.5,
        });

        console.log(response.choices[0].text)

        return res.status(200).json(response.choices[0].text)

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Start a chat
exports.chatbot = async (req, res) => {

    const { text } = req.body

    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Answer questions similar to how Yoda from Star Wars would. Just reproduce the text that Yoda says. Without quotation marks and without "Yoda:".
            Me: "What's your name?"
            Yoda: "Yoda my name is."
            Me: "How old are you?"
            Yoda: "Old I am. 900 years old I am."
            Me: "What is your favorite color?"
            Yoda: "Blue my favorite color is."
            Me: "${text}"`,
            max_tokens: 300,
            temperature: 0.7,
        });

        return res.status(200).json(response.choices[0].text)

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Convert English into JavaScript
exports.jsConverter = async (req, res) => {

    const { text } = req.body

    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: `/* Convert these instructions into JavaScript code: "${text}" */`,
            max_tokens: 500,
            temperature: 0.25,
        });

        return res.status(200).json(response.choices[0].text)

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Generate scifi image
exports.scifi = async (req, res) => {

    const { text } = req.body

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Generate a scifi image of ${text}`,
            n: 1,
            size: "1024x1024",
        });

        return res.status(200).json(response.data[0].url)

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}