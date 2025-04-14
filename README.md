# Smartphone Catalog

A web application for browsing, searching, and managing a catalog of smartphones. Built with **Next.js** `(v15.3)`, **React**, **TypeScript**, **Tailwind**, and **React Context API** for state management. Includes both development and production Docker configurations, plus testing with Jest.

**Live Demo**: [Smartphone Catalog on Netlify](https://beamish-crepe-d4e99f.netlify.app/phones)

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Project Structure](#project-structure)
5. [Installation](#installation)
6. [Running Locally](#running-locally)
    - [Development (Yarn)](#development-yarn)
    - [Development (Docker)](#development-docker)
    - [Production (Docker)](#production-docker)
7. [Testing](#testing)
8. [Environment Variables](#environment-variables)
9. [API Key Handling](#api-key-handling)
10. [Linting & Formatting](#linting--formatting)
11. [Deployment](#deployment)
12. [Future Improvements](#future-improvements)

---

## Overview

This **Smartphone Catalog** project demonstrates:

- Listing a grid of smartphones fetched from an external API (with x-api-key authentication).
- Real-time search field to filter phones by brand or name.
- Phone detail page (Server-Side Rendering in Next.js) showing specs, color/storage selection, price variations, and similar products.
- Shopping cart with **React Context**, persisted in localStorage.
- Fully responsive design using **Tailwind** breakpoints.
- Docker support for both development and production.

---

## Features

- **Listing Page**: Display up to 20 phones with brand/name/price.
- **Search Input**: Real-time search by brand or model.
- **Detail Page**:
    - Large phone image, spec table, color & storage pickers, “Add to Cart.”
    - “Similar Items” row for related products.
- **Cart**:
    - Persisted with **React Context + localStorage**.
    - Show item color/storage, remove items, display total.
- **Testing**: Basic tests with **Jest** and **React Testing Library**.
- **Responsive & Accessible**: Tailwind utilities, best practices for ARIA and focus.

---

## Technologies

- **Node.js** (v18 or v22)
- **Next.js** (v15.3)
- **React** (v19)
- **TypeScript** (v5)
- **Tailwind CSS** (v4)
- **ESLint** + **Jest** + **React Testing Library**
- **Docker** (for dev and prod images)

---

## Project Structure

- **`src/app`**: Next.js **App Router** structure.
- **`PhoneListClient.tsx`**: Client-side search & phone listing.
- **`DetailClient.tsx`**: Interactive logic for phone detail (color/storage selection).
- **`CartProvider.tsx`**: React Context for shopping cart.
- **`Dockerfile.dev / Dockerfile.prod`**: Build images for dev or production.

---

## Installation

1. **Clone** this repository.
2. **Install** dependencies:
```bash
   yarn install
```
3. Create a `.env` file (see Environment Variables).

## Running Locally

### Development (Yarn)

   ```bash
      yarn dev
   ```

- Starts Next.js in dev mode (Turbopack).
- Visit http://localhost:3000

### Development (Docker)

```bash
    docker-compose -f docker-compose.dev.yml up --build
```
- Runs a dev container with live reload
- Open http://localhost:3000

### Production (Docker)

```bash
    docker-compose -f docker-compose.prod.yml up --build
```

- Builds an optimized production image via Dockerfile.prod.
- Runs a production container with static files served.

## Testing

We use Jest + React Testing Library.

`yarn test`: Run tests once.

`yarn test:watch`: Re-run on file changes.

Tests are located in `src/__tests__`.

## Environment Variables

Create a .env or .env.local with:

```ini
NEXT_PUBLIC_API_BASE_URL=https:/api-url.com
NEXT_PUBLIC_API_KEY=someapikey
```

`!!! Important !!!`: Do not commit real secrets. The code uses:

```ts
fetch(url, { headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY } })
```

to authenticate requests.

## API Key Handling

All phone API requests require an `x-api-key`. 
This project references `NEXT_PUBLIC_API_KEY` from `.env`, so you can easily rotate or secure your key.
For purely server-side usage, define `API_KEY` (without `NEXT_PUBLIC_`) and reference it in SSR, but this code uses a public approach.

## Linting & Formatting

- **ESLint** is configured (`eslint.config.mjs`).

- Run `yarn lint` to see warnings/errors.

- Additional tools (Prettier) can be integrated if desired.

## Deployment

A live version is deployed on **Netlify**: [Smartphone Catalog on Netlify](https://beamish-crepe-d4e99f.netlify.app/phones)

**Other Options**:

- Vercel: Easiest for Next.js hosting.

- Docker: Deploy the production image to any container-based host.

- Netlify: Next.js SSR is possible with minimal config.

## Future Improvements

> It might not be tonight… tomorrow… or the next day, but everything is going to be okay.
> 
> Unknown