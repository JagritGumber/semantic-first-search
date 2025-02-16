import RightSidebar from "@/components/core/RightSidebar";
import { Header } from "../components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "364px",
          "--sidebar-width-icon": "96px",
        } as React.CSSProperties
      }
    >
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
      <RightSidebar />
    </SidebarProvider>
  );
}
