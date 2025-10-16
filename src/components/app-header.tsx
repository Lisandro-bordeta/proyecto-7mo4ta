'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Settings, User, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

const pathToTitle: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/inventario': 'Inventario',
  '/inventario/nuevo': 'Cargar Nuevo Celular',
  '/ventas': 'Registro de Ventas',
  '/ventas/nueva': 'Registrar Nueva Venta',
  '/usuarios': 'Administración de Usuarios',
};

export function AppHeader() {
  const pathname = usePathname();
  const title = pathToTitle[pathname] || 'Moovi';

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background/60 px-4 backdrop-blur-sm sm:px-6 sticky top-0 z-30">
      <SidebarTrigger className="md:hidden" />
      
      <div className="flex-1">
        <h1 className="font-semibold text-lg hidden sm:block">{title}</h1>
      </div>

      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Búsqueda global..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" alt="Avatar de usuario" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
