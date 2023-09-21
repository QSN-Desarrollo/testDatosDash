// import { RequestHandler } from 'express';

// // Middleware de autorización para roles de usuario
// export const authorizeUserRole: RequestHandler = (req, res, next) => {
//   if (req.userData.role === ROLES.USER) {
//     return next(); // Permiso concedido para usuarios
//   }
//   return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta.' });
// };

// // Middleware de autorización para roles de administrador
// export const authorizeAdminRole: RequestHandler = (req, res, next) => {
//   if (req.userData.role === ROLES.ADMIN) {
//     return next(); // Permiso concedido para administradores
//   }
//   return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta.' });
// };

// // 