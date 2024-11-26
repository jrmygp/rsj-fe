import * as React from 'react';
import { ChevronRight, LayoutDashboard } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { DataSideBar } from '@/lib/RawData';
import { Separator } from '@/components/ui/separator';

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <a href='/' className='flex items-center gap-2'>
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground'>
            <img src='/logo.png' alt='Logo' className='bg-transparent' />
          </div>
          <div className='flex flex-col gap-0.5 leading-none'>
            <span className='font-semibold'>Dashboard</span>
          </div>
        </a>
      </SidebarHeader>
      <Separator />
      <SidebarContent className='gap-0'>
        {DataSideBar.navMain.map((item) => {
          return item.items.length === 0 ? (
            <a href={item.url} key={item.title}>
              <Collapsible
                title={item.title}
                defaultOpen={false}
                className='group/collapsible'
              >
                <SidebarGroup>
                  <SidebarGroupLabel
                    asChild
                    className='group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  >
                    <CollapsibleTrigger>
                      {item.title}
                      {item.items.length !== 0 ? (
                        <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                      ) : null}
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {item.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.isActive}>
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            </a>
          ) : (
            <Collapsible
              key={item.title}
              title={item.title}
              defaultOpen={false}
              className='group/collapsible'
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className='group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                >
                  <CollapsibleTrigger>
                    {item.title}
                    {item.items.length !== 0 ? (
                      <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                    ) : null}
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={item.isActive}>
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
