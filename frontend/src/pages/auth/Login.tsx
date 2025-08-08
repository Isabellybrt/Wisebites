
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MainLayout } from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      await login(values.email, values.password);
      
      toast.success('Login realizado com sucesso!');
      
      // Redirecionar para a página que o usuário tentou acessar ou para a dashboard
      const from = (location.state as any)?.from?.pathname;
      if (from && from !== '/login') {
        navigate(from, { replace: true });
      } else {
        // Redirecionar baseado no tipo de usuário (será feito pelo AuthContext)
        navigate('/');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast.error(error.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">Entrar no WiseBites</h1>
            <p className="mt-2 text-sm text-gray-600">
              Digite suas informações para acessar sua conta
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seuemail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Senha</FormLabel>
                      <Link to="/reset-password" className="text-xs text-primary hover:underline">
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Registre-se
              </Link>
            </p>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="text-sm text-gray-600 text-center">
              <p>Para fins de demonstração, você pode usar:</p>
              <p className="mt-2 font-medium">Nutricionista: nutricionista@example.com</p>
              <p>Paciente: paciente@example.com</p>
              <p className="mt-2">Senha para ambos: 123456</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
