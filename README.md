This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting Environment Variables

To run this project you'll need create a .env file and add to it the env var `NEXT_PUBLIC_FINNHUB_API_KEY` with your key that you can get for free on [finnhub](https://finnhub.io/dashboard)

## Improvements 
- Persist the selected stocks on local storage, and subscribe to the stock WebSocket when mounting the component, so we can 'persist' user's stock choices.
- Add More Tests
- I created the file data/stocks.json with data from finnhub enpoint. On a real application I would make a background job hit the finnhub enpoint, process the data and update this json, or store on DB with the desired frequency.
- Improve Typescript application
- Enforce code styling
- Handle Errors Properly
