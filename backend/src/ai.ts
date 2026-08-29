import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateExpenseInsights(
  expenses: unknown[]
) {
  const prompt = `
You are SpendIQ, a personal finance insights assistant.

Analyze the user's expense data below.

Your job is to:
1. Identify the user's top spending categories.
2. Find meaningful spending patterns.
3. Identify potential money leaks.
4. Give practical saving suggestions.
5. Identify one habit that could be improved.

IMPORTANT RULES:
- Only use information present in the expense data.
- Never invent expenses, amounts, dates, merchants, or percentages.
- Do not make claims that cannot be supported by the data.
- If there is insufficient data for a conclusion, say so.
- Keep the advice practical and concise.
- Do not provide investment, tax, loan, or financial-product advice.

Expense data:
${JSON.stringify(expenses, null, 2)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          summary: {
            type: "string",
          },
          topMoneyLeaks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                category: {
                  type: "string",
                },
                amount: {
                  type: "number",
                },
                insight: {
                  type: "string",
                },
              },
              required: [
                "category",
                "amount",
                "insight",
              ],
              additionalProperties: false,
            },
          },
          savingTips: {
            type: "array",
            items: {
              type: "string",
            },
          },
          habitToChange: {
            type: "string",
          },
        },
        required: [
          "summary",
          "topMoneyLeaks",
          "savingTips",
          "habitToChange",
        ],
        additionalProperties: false,
      },
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  return JSON.parse(response.text);
}