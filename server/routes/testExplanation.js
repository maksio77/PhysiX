const router = require("express").Router();
const OpenAI = require("openai").OpenAI;

const openai = new OpenAI({
  apikey: process.env.OPENAI_API_KEY,
});

router.get("/", async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      message: [{ role: "user", content: prompt }],
    });

    res.send(completion.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
