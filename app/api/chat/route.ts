import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Simple in-memory rate limiting
const requestMap = new Map<string, number[]>();
const RATE_LIMIT = 10; // requests per window
const WINDOW_MS = 60000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = requestMap.get(ip) || [];
  
  // Filter out old requests
  const recentRequests = requests.filter(time => now - time < WINDOW_MS);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  requestMap.set(ip, recentRequests);
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  
  if (!checkRateLimit(ip)) {
    return Response.json({ error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 });
  }
  
  try {
    const { message } = await req.json();
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    
    return Response.json({ response: text });
  } catch (error: any) {
    console.error('Error:', error);
    return Response.json({ 
      error: 'Failed to generate response'
    }, { status: 500 });
  }
}