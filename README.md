# Sito-Psicologia / Psychology Site

Questo repository contiene il codice di un sito di psicologia costruito con **Next.js**.
Lo scopo è avere una base da cui partire per sperimentare e migliorare le mie
competenze di sviluppo web.

This repository hosts a psychology website built with **Next.js**. It serves as a
starting point for learning modern web development while gradually adding new
features.

## Avvio in sviluppo / Development server

```bash
npm install
npm run dev
```

L'app sarà disponibile su `http://localhost:3000`.
The app will be available at `http://localhost:3000`.

## Obiettivi futuri / Future goals

- Diario personale con suggerimenti casuali
- Sistema di raccomandazioni basato sui contenuti del diario
- Vocabolario psicologico come base di conoscenza
- Test di autovalutazione
- Sistema di prenotazione per le sedute professionali
- Integrazione di strumenti di analisi (Google Analytics, Microsoft Clarity)

These are the main ideas for the project: a private diary with prompts, content
recommendations, a psychological vocabulary section, self‑assessment tests, an
appointment booking system and advanced analytics (Google Analytics, Microsoft
Clarity).

## Database

Create the `users` table with this SQL:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```
