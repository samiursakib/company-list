import { BiSolidMessageDetail, BiSolidNotification } from "react-icons/bi";
import SearchBar from "./Searchbar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IoSettings } from "react-icons/io5";
import { RiAddLine, RiMenu2Line } from "react-icons/ri";
import { Card, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getCompanyList, postCompanyList } from "@/lib/api.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { MdOutlineModeEdit, MdOutlineDelete, MdClearAll } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

const formSchema = z.object({
  companyName: z.string().nullable(),
  group: z.string(),
  vatNumber: z.string().nullable(),
  active: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function Main({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  const [options, setOptions] = useState<any>([]);
  const [list, setList] = useState<any>([]);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: null,
      group: "0",
      vatNumber: null,
      active: "0",
    },
  });

  console.log(form.watch());

  useEffect(() => {
    const fetchOptions = async () => {
      const options = await getCompanyList();
      setOptions(options);
    };
    fetchOptions();
  }, []);

  const onSubmit = async (formData: FormData) => {
    console.log(formData);
    const list = await postCompanyList(formData);
    setList(list.data.data);
  };

  const handleReset = async () => {
    const formData = {
      companyName: null,
      group: "0",
      vatNumber: null,
      active: "0",
    };
    form.reset(formData);
    const list = await postCompanyList(formData);
    setList(list.data.data);
  };

  console.log(list);

  return (
    <div className="flex-1 md:ml-64">
      <div className="p-4 max-h-16 border-b flex justify-between shadow">
        <Button
          className="md:hidden w-8 h-8"
          onClick={toggleSidebar}
          variant={"secondary"}
        >
          <RiMenu2Line />
        </Button>
        <SearchBar isSidebarOpen={isSidebarOpen} />
        <div className="flex gap-2 items-center">
          <Button className="w-8 h-8" variant={"secondary"}>
            <BiSolidMessageDetail />
          </Button>
          <Button className="w-8 h-8" variant={"secondary"}>
            <BiSolidNotification />
          </Button>
          <Button className="w-8 h-8" variant={"secondary"}>
            <IoSettings />
          </Button>
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4 flex justify-between items-center">
          <CardTitle>List of companies</CardTitle>
          <Button className="pl-3 bg-[#007bff] hover:bg-[#0056b3]">
            <RiAddLine />
            <span>Add new</span>
          </Button>
        </div>
        <Card className="p-4 rounded">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
              className="space-y-8"
            >
              <div className="grid grid-cols-4 gap-4">
                <div className="">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="shadcn"
                            {...field}
                            value={(field.value ?? "") as string}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Group</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value as string}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {options.data?.availableGroups.map((group: any) => (
                              <SelectItem key={group.text} value={group.value}>
                                {group.text}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="vatNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VAT number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="shadcn"
                            {...field}
                            value={(field.value ?? "") as string}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Active</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {options.data?.availableActiveOptions.map(
                              (option: any) => (
                                <SelectItem
                                  key={option.text}
                                  value={option.value}
                                >
                                  {option.text}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <Button className="pl-3 bg-[#007bff] hover:bg-[#0056b3]">
                  <IoIosSearch />
                  <span>Search</span>
                </Button>
                <Button
                  variant={"destructive"}
                  className="pl-3 bg-[#869ab0] hover:bg-[#6a7f95]"
                  onClick={async () => await handleReset}
                >
                  <MdClearAll />
                  <span>Reset</span>
                </Button>
              </div>
            </form>
          </Form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>LOGO</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>GROUP</TableHead>
                <TableHead>VAT NUMBER</TableHead>
                <TableHead>ACTIVE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <Image
                      src={item.logoThumbnailUrl}
                      alt={item.logoThumbnailUrl}
                      width={0}
                      height={0}
                      className="w-10 h-auto"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.groupName}</TableCell>
                  <TableCell>{item.vatNumber}</TableCell>
                  <TableCell>
                    {item.active ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="24"
                        height="24"
                        viewBox="0 0 48 48"
                      >
                        <linearGradient
                          id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1"
                          x1="9.858"
                          x2="38.142"
                          y1="9.858"
                          y2="38.142"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#9dffce"></stop>
                          <stop offset="1" stopColor="#50d18d"></stop>
                        </linearGradient>
                        <path
                          fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)"
                          d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                        ></path>
                        <linearGradient
                          id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2"
                          x1="13"
                          x2="36"
                          y1="24.793"
                          y2="24.793"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset=".824" stopColor="#135d36"></stop>
                          <stop offset=".931" stopColor="#125933"></stop>
                          <stop offset="1" stopColor="#11522f"></stop>
                        </linearGradient>
                        <path
                          fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)"
                          d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                      >
                        <linearGradient
                          id="1rsYkBQg--ZOjOQk1rj-Wa_nTkpTS1GZpkb_gr1"
                          x1="16"
                          x2="16"
                          y1="2.888"
                          y2="29.012"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#ff624a"></stop>
                          <stop offset=".247" stopColor="#ff5940"></stop>
                          <stop offset=".672" stopColor="#fd4224"></stop>
                          <stop offset="1" stopColor="#fc2c0a"></stop>
                        </linearGradient>
                        <circle
                          cx="16"
                          cy="16"
                          r="13"
                          fill="url(#1rsYkBQg--ZOjOQk1rj-Wa_nTkpTS1GZpkb_gr1)"
                        ></circle>
                        <g opacity=".2">
                          <linearGradient
                            id="1rsYkBQg--ZOjOQk1rj-Wb_nTkpTS1GZpkb_gr2"
                            x1="16"
                            x2="16"
                            y1="10.755"
                            y2="21.245"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stopOpacity=".1"></stop>
                            <stop offset="1" stopOpacity=".7"></stop>
                          </linearGradient>
                          <path
                            fill="url(#1rsYkBQg--ZOjOQk1rj-Wb_nTkpTS1GZpkb_gr2)"
                            d="M19.995,10.755 c-0.334,0-0.648,0.13-0.884,0.366L16,14.232l-3.111-3.111c-0.236-0.236-0.55-0.366-0.884-0.366c-0.334,0-0.648,0.13-0.884,0.366 c-0.487,0.487-0.487,1.28,0,1.768L14.232,16l-3.111,3.111c-0.487,0.487-0.487,1.28,0,1.768c0.236,0.236,0.55,0.366,0.884,0.366 c0.334,0,0.648-0.13,0.884-0.366L16,17.768l3.111,3.111c0.236,0.236,0.55,0.366,0.884,0.366s0.648-0.13,0.884-0.366 c0.487-0.487,0.487-1.28,0-1.768L17.768,16l3.111-3.111c0.487-0.487,0.487-1.28,0-1.768C20.643,10.885,20.329,10.755,19.995,10.755 L19.995,10.755z"
                          ></path>
                        </g>
                        <linearGradient
                          id="1rsYkBQg--ZOjOQk1rj-Wc_nTkpTS1GZpkb_gr3"
                          x1="16"
                          x2="16"
                          y1="3"
                          y2="29"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopOpacity=".02"></stop>
                          <stop offset="1" stopOpacity=".15"></stop>
                        </linearGradient>
                        <path
                          fill="url(#1rsYkBQg--ZOjOQk1rj-Wc_nTkpTS1GZpkb_gr3)"
                          d="M16,3.25c7.03,0,12.75,5.72,12.75,12.75 S23.03,28.75,16,28.75S3.25,23.03,3.25,16S8.97,3.25,16,3.25 M16,3C8.82,3,3,8.82,3,16s5.82,13,13,13s13-5.82,13-13S23.18,3,16,3 L16,3z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M17.414,16l3.288-3.288c0.391-0.391,0.391-1.024,0-1.414c-0.391-0.391-1.024-0.391-1.414,0L16,14.586	l-3.288-3.288c-0.391-0.391-1.024-0.391-1.414,0c-0.391,0.391-0.391,1.024,0,1.414L14.586,16l-3.288,3.288	c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.024,0.391,1.414,0L16,17.414l3.288,3.288c0.391,0.391,1.024,0.391,1.414,0	c0.391-0.391,0.391-1.024,0-1.414L17.414,16z"
                        ></path>
                      </svg>
                    )}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant={"ghost"} className="w-8 h-8">
                      <MdOutlineModeEdit />
                    </Button>
                    <Button variant={"ghost"} className="w-8 h-8">
                      <MdOutlineDelete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
