# ASSIGNMENT

## Prepare node version
Make sure you installed NVM already
```
nvm use
```

## Install dependencies
```
pnpm i
```

## Setup Environment
- Copy `.env.example` to  `.env.development.local` (create `.env.production.local` in the case of build production)

## Run development
```
pnpm dev
```
Run time is on port 5173; this link [http://localhost:5173](http://localhost:5173)
## Build production
```
pnpm build
```