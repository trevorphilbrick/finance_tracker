import { fetchCategories } from "@/utils/fetch-categories";
import {
  SidebarContent,
  Sidebar as SidebarContainer,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "./ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import SidebarCollapsibleGroup from "./SidebarCollapsibleGroup";
import { Sheet } from "./ui/sheet";
import AddExpenseSheet from "./AddExpenseSheet";
import { useAppState } from "@/zustand/appState";
import { Category } from "@/types/category";

function Sidebar() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const setSelectedCategory = useAppState((state) => state.setSelectedCategory);

  return (
    <Sheet>
      <SidebarContainer>
        <SidebarHeader>Categories</SidebarHeader>
        <SidebarContent>
          {data &&
            data.map((item: Category) => (
              <Collapsible
                defaultOpen
                className="group/collapsible"
                key={item.name}
              >
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                      {item.name}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <SidebarCollapsibleGroup
                    item={item}
                    setSelectedCategory={setSelectedCategory}
                  />
                </SidebarGroup>
              </Collapsible>
            ))}
        </SidebarContent>
      </SidebarContainer>
      <AddExpenseSheet />
    </Sheet>
  );
}

export default Sidebar;
