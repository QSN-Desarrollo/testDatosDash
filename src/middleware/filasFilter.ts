import { Consulta } from "src/interface/filtroInterface";

class PalabraParser {
  constructor(){}
    static async obtenerPalabrasConDobleArroba(texto: string): Promise<string[]> {

    const palabrasConDobleArroba = texto.match(/@\w+/g) || [];
    const palabrasCorregidas = palabrasConDobleArroba.map(palabra => palabra.replace('@', ''));
  
    return palabrasCorregidas;
    }  
    // static async obtenerPalabrasConArroba(texto: string): Promise<string[]> {
    //   const regex = /@(\w+)/g;
    //   const palabrasConArroba: Set<string> = new Set(); // Usamos un Set para evitar duplicados
    //   let match;
    //   while ((match = regex.exec(texto)) !== null) {
    //     const palabra = `@${match[1]}`;
    //     if (!palabrasConArroba.has(palabra) && palabra !== '@@') {
    //       palabrasConArroba.add(palabra);
    //     }
    //   }
    //   return [...palabrasConArroba];
    // }
    static async obtenerPalabrasEnComillas(texto: string): Promise<string[]> {
      const frases = texto.split(',');
      const frasesLimpias = frases.map(frase => frase.trim());
      const frasesFiltradas = frasesLimpias.filter(frase => {
        return frase.length > 0  && !frase.startsWith('@') && !frase.startsWith('#');
      });
      return frasesFiltradas;
    }
    static async obtenerPalabrasConHashtag(texto: string): Promise<string[]> {
      const palabrasConHashtag = texto.match(/#\w+/g) || [];
      return palabrasConHashtag.flat();
    }
    static async filtrarTextoPorPalabras(texto: string): Promise<Consulta> {
      const [comillas, usuario, hashtag] = await Promise.all([
        PalabraParser.obtenerPalabrasEnComillas(texto),
        // PalabraParser.obtenerPalabrasConArroba(texto),
        PalabraParser.obtenerPalabrasConDobleArroba(texto),
        PalabraParser.obtenerPalabrasConHashtag(texto),
      ]);
    
      const consultasFila: Consulta = {
        comas:comillas,
        // Mencion: mencion,
        Usuario: usuario,
        Hashtag: hashtag,
      };
      return consultasFila;
    }
    
  }

export default   PalabraParser;