
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function Configuracoes() {
  return (
    <DashboardLayout userType="paciente">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Meu Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" defaultValue="Camila Mendes" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue="camila@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" defaultValue="(11) 99876-5432" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-nascimento">Data de Nascimento</Label>
                  <Input id="data-nascimento" type="date" defaultValue="1995-05-15" />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificações</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Lembretes de refeições</p>
                    <p className="text-sm text-muted-foreground">Receba lembretes para registrar suas refeições</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Atualizações de plano</p>
                    <p className="text-sm text-muted-foreground">Notificações quando seu plano alimentar for atualizado</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Mensagens</p>
                    <p className="text-sm text-muted-foreground">Notificações de novas mensagens do nutricionista</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label htmlFor="senha-atual">Senha Atual</Label>
                <Input id="senha-atual" type="password" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nova-senha">Nova Senha</Label>
                  <Input id="nova-senha" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                  <Input id="confirmar-senha" type="password" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
