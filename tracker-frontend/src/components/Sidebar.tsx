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
import { Button } from "./ui/button";
import { addCategory } from "@/utils/add-category";
import { CollapsibleContent } from "./ui/collapsible";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

function Sidebar() {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const setSelectedCategory = useAppState((state) => state.setSelectedCategory);

  const onSelectAddCategory = async (name: string) => {
    setIsLoading(true);
    if (name != "") {
      await addCategory({ name });
      setCategoryName("");
    }
    setIsLoading(false);
  };

  return (
    <Sheet>
      <SidebarContainer>
        <SidebarHeader>Categories</SidebarHeader>
        <SidebarContent>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Add A Category
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent className="flex flex-col mx-2">
                <Label className="my-4">
                  Name
                  <Input
                    id="categoryName"
                    placeholder="Cards"
                    className="mt-2"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </Label>
                <Button
                  className="flex-1"
                  onClick={() => onSelectAddCategory(categoryName)}
                  disabled={isLoading}
                >
                  Add Category
                </Button>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          {data &&
            data.map((item: Category) => (
              <Collapsible className="group/collapsible" key={item.name}>
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
