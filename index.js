/**
 * AGENTE CON GEMINI (Google)
 * npm install @google/generative-ai express axios dotenv
 * 
 * API Key GRATIS: https://makersuite.google.com/app/apikey
 */

import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(express.json());

// Configurar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Cambiado a gemini-pro

// ============================================
// TU ENDPOINT ORIGINAL
// ============================================
app.get("/", (req, res) => {
  res.json({
    message: "Hola Luis"
  });
});

// ============================================
// ENDPOINT DEL AGENTE CON GEMINI
// ============================================
app.post('/agent', async (req, res) => {
  try {
    // Obtener datos del endpoint
    const { data } = await axios.get('http://localhost:3000/');
    
    // Preguntarle a Gemini
    const prompt = `Tienes acceso a estos datos del servidor: ${JSON.stringify(data)}

Pregunta del usuario: ${req.body.pregunta}

Responde de forma clara y concisa.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      respuesta: text
    });

  } catch (error) {
    res.json({ 
      error: error.message 
    });
  }
});

// ============================================
// INICIAR SERVIDOR
// ============================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ✅ Servidor con Gemini corriendo en http://localhost:${PORT}
  
  📍 Endpoints:
     GET  /        → Endpoint original
     POST /agent  → Agente con Gemini
  
  🤖 Modelo: Gemini 1.5 Flash (rápido y gratis)
  
  🧪 Prueba:
     curl -X POST http://localhost:${PORT}/agent \\
       -H "Content-Type: application/json" \\
       -d '{"pregunta": "¿Qué mensaje hay?"}'
  `);
});

/**
 * ARCHIVO .env:
 * GEMINI_API_KEY=tu-clave-aqui
 * PORT=3000
 * 
 * OBTENER API KEY (GRATIS):
 * 1. Ve a https://makersuite.google.com/app/apikey
 * 2. Inicia sesión con Google
 * 3. Click "Get API Key" → "Create API Key"
 * 4. ¡LISTO! Es gratis y muy generoso
 * 
 * MODELOS DISPONIBLES:
 * - gemini-1.5-flash   (Recomendado: rápido y gratis)
 * - gemini-1.5-pro     (Más inteligente, también gratis)
 * - gemini-pro         (Versión anterior)
 * 
 * LÍMITES GRATIS:
 * - 15 peticiones por minuto
 * - 1 millón de tokens por día
 * - ¡Suficiente para desarrollo!
 */