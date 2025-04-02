const express = require('express');
require('dotenv').config();
const router = express.Router();
const OpenAI = require('openai');
const removeMarkdown = require('remove-markdown');

// Initialize OpenAI with API key from environment
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'No message provided' });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful career advisor bot. Respond in plain text without Markdown formatting.',
                },
                { role: 'user', content: message }
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        const rawReply = completion.choices[0].message.content;
        const reply = removeMarkdown(rawReply); // Clean response

        res.json({
            reply,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
