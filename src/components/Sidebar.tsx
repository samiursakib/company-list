import { RxCross2 } from "react-icons/rx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { BsDot } from "react-icons/bs";

const sideMenues = [
  { name: "Dashboard", icon: null, subList: [] },
  {
    name: "Purchase",
    icon: null,
    subList: [
      { name: "Orders", icon: null },
      { name: "Delivery", icon: null },
      { name: "Suppliers", icon: null },
    ],
  },
  {
    name: "Business unit",
    icon: null,
    subList: [
      { name: "Groups", icon: null },
      { name: "Companies", icon: null },
      { name: "Brands", icon: null },
      { name: "Outlets", icon: null },
      { name: "Warehouses", icon: null },
    ],
  },
  {
    name: "Catalog",
    icon: null,
    subList: [
      { name: "Products", icon: null },
      { name: "Categories", icon: null },
      { name: "Price List", icon: null },
      { name: "Inventory", icon: null },
    ],
  },
  {
    name: "User",
    icon: null,
    subList: [
      { name: "Roles", icon: null },
      { name: "Permissions", icon: null },
      { name: "Activity", icon: null },
    ],
  },
  {
    name: "Configuration",
    icon: null,
    subList: [
      { name: "Tax Settings", icon: null },
      { name: "Payment Methods", icon: null },
      { name: "Shipping Options", icon: null },
    ],
  },
  {
    name: "System",
    icon: null,
    subList: [
      { name: "Logs", icon: null },
      { name: "Backups", icon: null },
      { name: "System Health", icon: null },
    ],
  },
];

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <div
      className={`w-64 fixed top-0 left-0 border-r h-full bg-white shadow-md z-50 transform md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="p-4 flex items-center gap-4">
        <Button
          className="md:hidden w-8 h-8"
          onClick={toggleSidebar}
          variant={"secondary"}
        >
          <RxCross2 />
        </Button>
        <h2 className="text-xl font-bold">GENPOS</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {sideMenues.map((item) => (
          <AccordionItem
            key={item.name}
            value={item.name}
            className="border-b-0 no-underline"
          >
            <AccordionTrigger className="py-0 hover:no-underline">
              {item.name}
            </AccordionTrigger>
            {item.subList.map((subItem) => (
              <AccordionContent key={subItem.name} className="py-0">
                <Button variant={"ghost"}>
                  <BsDot />
                  <span>{subItem.name}</span>
                </Button>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
