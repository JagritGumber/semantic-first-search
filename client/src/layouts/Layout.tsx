import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col justify-between w-full h-full min-h-screen">
      <Header />
      <main className="flex-auto w-full max-w-3xl px-4 py-4 mx-auto sm:px-6 md:py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
