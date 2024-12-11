// app/layout.tsx or pages/_app.tsx
import { StockProvider } from "../context/StockContext";

export default function App({ Component, pageProps }: any) {
  return (
    <StockProvider>
      <Component {...pageProps} />
    </StockProvider>
  );
}
