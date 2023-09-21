import { FiltrosSchema } from "src/interface/filtroInterface";

class FilterMiddleware{
    constructor(){
    }
async filtrarNull(arrayDeObjetos: any[]): Promise<FiltrosSchema> {
        const resultado: Record<string, any> = {};
      
        arrayDeObjetos.forEach(obj => {
          for (const clave in obj) {
            if (obj.hasOwnProperty(clave)) {
              if (obj[clave] !== null && obj[clave] !== undefined) {
                const claveObj = clave as keyof FiltrosSchema; 
                if (!resultado[claveObj]) {
                  resultado[claveObj] = obj[clave];
                } else if (Array.isArray(resultado[claveObj]) && Array.isArray(obj[clave])) {
                  resultado[claveObj] = [...(resultado[claveObj] as string[]), ...(obj[clave] as string[])];
                } else {
                  resultado[claveObj] = resultado[claveObj] + obj[clave];
                }
              }
            }
          }
        });
        return resultado as FiltrosSchema;
      }
}

export default new FilterMiddleware();