'use server';

import fs from 'fs';
import path from 'path';

export const getQuestions = async () => {
  try {
    // Obteniendo la ruta absoluta al archivo JSON
    const filePath = path.join(process.cwd(), 'src/json/questions.es.json');

    // Leyendo el archivo JSON
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parseando el contenido del archivo JSON a un objeto
    const data = JSON.parse(fileContent);

    return data;
  } catch (error) {
    throw new Error('Error al obtener las preguntas...');
  }
};
