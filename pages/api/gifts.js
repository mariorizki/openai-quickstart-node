import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { priceMin, priceMax, gender, age, hobbies } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(priceMin, priceMax, gender, age, hobbies),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(priceMin, priceMax, gender, age, hobbies) {
  return `suggest 3 Christmas gift ideas between ${priceMin}$ and ${priceMax}$ for a ${age} years old ${gender} that is into ${hobbies}.`;
}
