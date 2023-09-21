import mongoose from 'mongoose';
import {config} from './config';
type Auth = {
  user: string;
  password: string;
  authSource: string;
};
export const connectDB = async () => {
  try {
    mongoose.connect(`${config.DB.urlProductionTwitter}`)
         .then(() => {
        console.log('Conextado a MongoDB');
        // Acceder a la base de datos "Facebook"
          // const db = mongoose.createConnection(config.DB.urlProductionTwitter)
        // const collection2 = db.collection('17352390');
        // collection2.find()
        // console.log(db.useDb('test'))
        // Realizar operaciones en las colecciones

      })
      .catch((error) => {
        console.error('Error al conectar a MongoDB:', error);
      });
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
};

// console.log(connectDB.name)
export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada');
  } catch (error) {
    console.error('Error al cerrar la conexión a MongoDB:', error);
    throw error;
  }
};