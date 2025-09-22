import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

async function getFileText(filePath: string): Promise<string> {
  // In a real scenario, you'd fetch the file from Supabase Storage
  // and extract its text content using a library like pdf-parse or mammoth.
  // For this example, we'll simulate fetching text content.
  console.log(`Fetching text for file: ${filePath}`);
  return "This is a placeholder for the document's text content. In a real implementation, this would be the extracted text from the uploaded PDF, DOCX, or TXT file.";
}

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    console.log("AI API - Received request:", {
      hasTextContent: !!requestBody.textContent,
      hasDocumentPath: !!requestBody.documentPath,
      type: requestBody.type,
      contentLength: requestBody.textContent?.length,
      contentPreview: requestBody.textContent?.substring(0, 100) + "...",
    });

    const { documentPath, textContent: directText, query, type } = requestBody;

    if ((!documentPath && !directText) || !type) {
      console.log("AI API - Missing required fields:", {
        hasDocumentPath: !!documentPath,
        hasDirectText: !!directText,
        type,
      });
      return NextResponse.json(
        { error: "Missing document path, text content, or type" },
        { status: 400 },
      );
    }

    let textContent = "";
    if (directText) {
      textContent = directText;
      console.log("AI API - Using direct text content:", {
        length: textContent.length,
        preview: textContent.substring(0, 100) + "...",
      });
    } else if (documentPath) {
      textContent = await getFileText(documentPath);
      console.log("AI API - Using file content from path:", documentPath);
    }

    if (!textContent || textContent.trim().length === 0) {
      console.log("AI API - No text content available");
      return NextResponse.json(
        { error: "Could not retrieve text content" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";
    switch (type) {
      case "summarize":
        prompt = `Provide a clear and concise summary of the following content. Focus on the main points and key information:\n\n${textContent}`;
        break;
      case "insights":
        prompt = `Analyze the following content and extract key insights, patterns, important themes, and actionable recommendations:\n\n${textContent}`;
        break;
      case "qa":
        if (!query) {
          return NextResponse.json(
            { error: "Missing query for Q&A" },
            { status: 400 },
          );
        }
        prompt = `Based on the following content, answer this question: "${query}"\n\nContent:\n${textContent}`;
        break;
      default:
        return NextResponse.json(
          { error: "Invalid request type" },
          { status: 400 },
        );
    }

    console.log("AI API - Generated prompt:", {
      type,
      promptLength: prompt.length,
      promptPreview: prompt.substring(0, 200) + "...",
    });

    console.log("AI API - Calling Google AI with model: gemini-1.5-flash");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();

    console.log("AI API - Received response:", {
      responseLength: aiText.length,
      responsePreview: aiText.substring(0, 200) + "...",
    });

    return NextResponse.json({ result: aiText });
  } catch (error) {
    console.error("AI API Error - Full details:", {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : undefined,
    });
    /**
     * errorMessage - Ensures the error message is always a string, satisfying TypeScript's type requirements.
     */
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to get response from AI", details: errorMessage },
      { status: 500 },
    );
  }
}
