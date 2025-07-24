import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

/**
 * Middlewares globaux
 */
app.use(express.json()); // Body parser pour JSON
app.use(morgan('dev')); // Logger HTTP

// Configuration CORS (option sécurisée, modifiable par domaine)
const corsOptions = {
  origin: process.env.CLIENT_URL || '*', // Mets l'URL de ton frontend ici
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content',
    'Accept',
    'Content-Type',
    'Authorization',
  ],
  credentials: true,
};
app.use(cors(corsOptions));


/**
 *  route
 */






/**
 * Middleware de gestion des erreurs globales
 */
app.use((err, req, res, next) => {
  console.error('Erreur globale :', err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur.' });
});

/**
 * Démarrage du serveur
 */
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0'; // important pour utiliser ton IP locale

app.listen(PORT, HOST, () => {
  console.log(`Serveur démarré sur http://${HOST === '0.0.0.0' ? HOST : HOST}:${PORT}`);
});
