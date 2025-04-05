// LoginForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
  const { signIn } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const { error } = await signIn(values.email, values.password);
    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Welcome back!" });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input {...form.register("email")} placeholder="you@example.com" />
      <Input {...form.register("password")} type="password" placeholder="••••••••" />
      <Button type="submit" className="w-full">Login</Button>
      <p className="text-center text-sm">
        Don’t have an account?{" "}
        <Button variant="link" onClick={onSwitchToSignup}>Sign up</Button>
      </p>
    </form>
  );
}
