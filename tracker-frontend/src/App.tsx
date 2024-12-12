import Sidebar from "./components/Sidebar";
import "./App.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ExpenseSheet from "./components/ExpenseSheet";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Sidebar />
        <SidebarTrigger />
        <ExpenseSheet />
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;
