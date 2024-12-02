import Sidebar from "./components/Sidebar";
import "./App.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Sidebar />
        <SidebarTrigger />
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;
