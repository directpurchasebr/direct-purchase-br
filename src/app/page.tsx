import LoginForm from "@/components/login-form/login-form";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex justify-center py-2 bg-slate-100 px-5">
        <LoginForm />
      </div>
    </main>
  );
}
