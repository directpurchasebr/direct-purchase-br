import LoginForm from "@/components/login-form/login-form";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex justify-center items-center bg-slate-200 px-5">
        <LoginForm />
      </div>
    </main>
  );
}
