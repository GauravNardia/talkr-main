import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full min-h-screen bg-neutral-950">
     <div className="w-full h-screen flex flex-col justify-center items-center">
       {children}
     </div>
    </main>
  );
};

