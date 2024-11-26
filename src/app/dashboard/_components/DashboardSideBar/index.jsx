import { AppSidebar } from '@/components/template/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AvatarNav from '../AvatarNav';
import { Outlet } from 'react-router-dom';

export default function DashboardSideBar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-6' />
          </div>
          <AvatarNav />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
