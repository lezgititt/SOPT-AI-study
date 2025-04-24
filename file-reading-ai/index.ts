import {
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
} from "@google/genai";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function main() {
  const pdfPath = path.join(__dirname, "assets", "example1.pdf");

  // PDF 업로드
  const file = await ai.files.upload({
    file: pdfPath,
    config: { mimeType: "application/pdf" },
  });
  console.log("Uploaded PDF metadata:", file);

  if (!file.uri || !file.mimeType) {
    throw new Error("파일 업로드 실패: URI나 mimeType이 없습니다.");
  }

  // JSON 전용 프롬프트
  const systemPrompt = `
You are a PDF extraction assistant.
Output ONLY a single JSON object with these keys (no extra text):
- invoice_number (string)
- issue_date (YYYY-MM-DD)
- customer_name (string)
- items: array of {description:string, quantity:int, unit_price:float, amount:float}
- total_amount (float)
  `.trim();

  // 파일 파트 생성
  const filePart = createPartFromUri(file.uri, file.mimeType);

  // Gemini 호출
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [createUserContent([systemPrompt, filePart])],
    config: {
      temperature: 0.0,
    },
  });

  // 순수 JSON 추출
  const rawJson = response.text;
}

main().catch(console.error);
