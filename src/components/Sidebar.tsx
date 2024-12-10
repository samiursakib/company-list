import { RxCross2 } from "react-icons/rx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { BsDot } from "react-icons/bs";
import { RiDashboardHorizontalFill, RiProfileFill } from "react-icons/ri";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { IoBusiness, IoSettings } from "react-icons/io5";
import { HiArchive } from "react-icons/hi";
import { MdSystemSecurityUpdate } from "react-icons/md";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sideMenues = [
  { name: "Dashboard", icon: <RiDashboardHorizontalFill />, subList: [] },
  {
    name: "Purchase",
    icon: <BiSolidPurchaseTagAlt />,
    subList: [{ name: "Orders" }, { name: "Delivery" }, { name: "Suppliers" }],
  },
  {
    name: "Business unit",
    icon: <IoBusiness />,
    subList: [
      { name: "Groups" },
      { name: "Companies" },
      { name: "Brands" },
      { name: "Outlets" },
      { name: "Warehouses" },
    ],
  },
  {
    name: "Catalog",
    icon: <HiArchive />,
    subList: [
      { name: "Products" },
      { name: "Categories" },
      { name: "Price List" },
      { name: "Inventory" },
    ],
  },
  {
    name: "User",
    icon: <RiProfileFill />,
    subList: [{ name: "Roles" }, { name: "Permissions" }, { name: "Activity" }],
  },
  {
    name: "Configuration",
    icon: <IoSettings />,
    subList: [
      { name: "Tax Settings" },
      { name: "Payment Methods" },
      { name: "Shipping Options" },
    ],
  },
  {
    name: "System",
    icon: <MdSystemSecurityUpdate />,
    subList: [{ name: "Logs" }, { name: "Backups" }, { name: "System Health" }],
  },
];

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState("");
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
        {sideMenues.map((item) =>
          item.subList.length ? (
            <AccordionItem
              key={item.name}
              value={item.name}
              className="px-3 border-b-0 no-underline"
              onClick={() => setActiveMenu(item.name)}
            >
              <AccordionTrigger className="py-0 hover:no-underline hover:bg-blue-50 rounded">
                <div
                  key={item.name}
                  className={cn([
                    "px-3 py-2 flex items-center gap-2",
                    {
                      "text-[#007bff]": activeMenu === item.name,
                    },
                  ])}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </AccordionTrigger>
              {item.subList.map((subItem) => (
                <AccordionContent
                  key={subItem.name}
                  className={cn([
                    "py-2 px-2 pl-3 hover:bg-blue-50 hover:cursor-pointer rounded",
                    {
                      "text-[#007bff] py-[6px]": activeSubmenu === subItem.name,
                    },
                  ])}
                  onClick={() => setActiveSubmenu(subItem.name)}
                >
                  <span className="flex items-center gap-2 ">
                    <BsDot
                      className={cn([
                        {
                          "text-2xl -ml-[5px]": activeSubmenu === subItem.name,
                        },
                      ])}
                    />
                    <span
                      className={cn([
                        { "-ml-[5px]": activeSubmenu === subItem.name },
                      ])}
                    >
                      {subItem.name}
                    </span>
                  </span>
                </AccordionContent>
              ))}
            </AccordionItem>
          ) : (
            <div
              key={item.name}
              className={cn([
                "mx-3 px-3 py-2 flex items-center gap-2 text-sm hover:cursor-pointer hover:bg-blue-50 rounded",
                {
                  "text-[#007bff]": activeMenu === item.name,
                },
              ])}
              onClick={() => setActiveMenu(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          )
        )}
      </Accordion>
    </div>
  );
}
