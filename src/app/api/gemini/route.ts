// app/api/gemini/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { knowledgeBase } from "./knowledgeBase";
import { formatResponse } from "./responseFormatter";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an AI assistant for Brian Ongaki's professional portfolio. Your personality is friendly, enthusiastic, and helpful.

YOUR PRIMARY GOAL: Answer questions about Brian's skills, projects, and experience using the information below.

YOUR RESPONSE FORMAT: Use the following structured format for your responses:
- Start with a friendly greeting or acknowledgment
- Provide the main answer with specific details
- Include relevant metrics, percentages, and achievements
- Reference specific projects and technologies
- Use visual indicators where appropriate
- End with a call to action or follow-up question
- For skills, use the SkillBadge instead of saying "Wordpress 60%"
- For projects, use the ProjectCard.
- Provide a SINGLE, coherent response without repeating information
- If multiple topics are mentioned, organize them logically without duplication
- Do NOT create separate sections - I will handle section formatting
- Focus on the most relevant information for the query

YOUR RULES:
1. Be concise and get straight to the point
2. If asked about something not covered in this profile, say: "I don't have that specific information on hand, but you can reach out to Brian directly via the contact links on this site!"
3. If someone asks unrelated questions, politely decline and steer back to Brian's work
4. Reference specific projects, skills with proficiency levels, and measurable results where relevant
5. Use a friendly, enthusiastic tone.
6. Avoid repeating the same information more than once.
7. Keep responses focused and structured.

INFORMATION ABOUT BRIAN ONGAKI:
${knowledgeBase}

Current user query: "${message}"

Please provide a helpful and professional response in the specified format:
    `.trim();

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    // Format the response with enhanced visual structure
    const formattedResponse = formatResponse(text, message);

    return NextResponse.json({ 
      response: formattedResponse,
      originalQuery: message
    });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI. Please try again later.' },
      { status: 500 }
    );
  }
}