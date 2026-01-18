
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Challenge, Category, Difficulty } from "../types";

// Always initialize with process.env.API_KEY as a named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMentorHelp = async (challengeTitle: string, challengeDesc: string, userQuestion: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const systemInstruction = `
      Você é um Mentor Educacional Técnico para alunos de ensino médio.
      O aluno está tentando resolver um desafio prático chamado "${challengeTitle}".
      Descrição do desafio: "${challengeDesc}".
      
      Regras:
      1. NÃO dê a resposta final (código pronto ou solução completa).
      2. Explique o conceito por trás da dúvida.
      3. Dê pistas ou faça perguntas que guiem o aluno ao raciocínio correto.
      4. Seja breve e encorajador.
      5. Use formatação Markdown para clareza.
    `;

    // Always use ai.models.generateContent directly
    const response = await ai.models.generateContent({
      model: model,
      contents: userQuestion,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    // Access the .text property directly
    return response.text || "O mentor está pensando, mas não conseguiu formular uma resposta agora.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com o mentor virtual. Verifique sua conexão.";
  }
};

export const generateAdaptiveChallenge = async (user: UserProfile): Promise<Challenge | null> => {
    try {
        const model = 'gemini-3-flash-preview';
        const prompt = `
            Gere um desafio técnico educacional adaptativo para um aluno com o seguinte perfil:
            Habilidades: ${JSON.stringify(user.skills)}
            Nível: ${user.level}

            O desafio deve ser ligeiramente mais difícil que o nível atual do aluno em uma das áreas onde ele tem menor pontuação para incentivar o aprendizado.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                // Use responseSchema for structured JSON output as recommended
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        category: { 
                            type: Type.STRING, 
                            description: "Deve ser uma das categorias: 'Programação', 'Redes', 'Banco de Dados', 'Lógica'" 
                        },
                        difficulty: { 
                            type: Type.STRING, 
                            description: "Deve ser um dos níveis: 'Iniciante', 'Intermediário', 'Avançado'" 
                        },
                        pointsReward: { type: Type.INTEGER },
                        costToUnlock: { type: Type.INTEGER },
                        isLocked: { type: Type.BOOLEAN },
                        author: { type: Type.STRING },
                        participants: { type: Type.INTEGER }
                    },
                    required: ["id", "title", "description", "category", "difficulty", "pointsReward", "costToUnlock", "isLocked", "author", "participants"]
                }
            }
        });

        const text = response.text;
        if (!text) return null;
        
        return JSON.parse(text.trim()) as Challenge;

    } catch (error) {
        console.error("Adaptive Generation Error:", error);
        return null;
    }
};
