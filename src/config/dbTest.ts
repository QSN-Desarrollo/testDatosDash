// import mongoose, { connection } from 'mongoose';
// import  { config }  from './config';
// import { DbConfig } from 'src/interface/tweetsInterface';
// const databaseConnections: Record<string, mongoose.Connection> = {};

// // Función para conectar a todas las bases de datos
// export const connectToDatabase = async () => {
//   try {
//     const dbURL = config.dbConfig[dbName];
//     const connection = await mongoose.createConnection(dbURL);
//   } catch (error) {
//     console.error('Error al conectar a la base de datos:', error);
//     throw error;
//   }
//   connection.
// };

// export const closeDatabaseConnections = async () => {
//   try {
//     for (const dbName of Object.keys(databaseConnections)) {
//       const connection = databaseConnections[dbName];
//       await connection.close();
//     }
//     console.log('Conexiones a bases de datos cerradas');
//   } catch (error) {
//     console.error('Error al cerrar las conexiones a bases de datos:', error);
//     throw error;
//   }
// };
