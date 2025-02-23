"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  ChartBarIcon,
  CreditCardIcon,
  ClipboardDocumentCheckIcon,
  FolderOpenIcon,
  CurrencyDollarIcon,
  CubeIcon,
  XMarkIcon,
  Bars3Icon,
  BanknotesIcon,
  DocumentChartBarIcon,
  ScaleIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BiSolidBell } from "react-icons/bi";
import { RiQuestionLine } from "react-icons/ri";
import TheamSwitcher from "@/app/utils/ThemeSwitcher";
import { CommonStyle } from "@/app/utils/CommonStyle";
import { useAuth } from "@/app/context/authContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Auth from "../Auth/Auth";
import { useTheme } from "next-themes";

const bookKeeping = [
  {
    name: "Invoices",
    description: "Track and manage customer invoices.",
    href: "#",
    icon: DocumentTextIcon,
  },
  {
    name: "Quotes",
    description: "Create and share client quotes.",
    href: "#",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: "Sales Overview",
    description: "Analyze sales performance.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Bills to Pay",
    description: "Track upcoming bills and deadlines.",
    href: "#",
    icon: CreditCardIcon,
  },
  {
    name: "Purchase Orders",
    description: "Manage supplier purchase orders.",
    href: "#",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: "Purchase Overview",
    description: "View all purchase transactions.",
    href: "#",
    icon: FolderOpenIcon,
  },
  {
    name: "Bank Reconciliation",
    description: "Reconcile bank statements with accounts.",
    href: "#",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Product & Services",
    description: "Organize and manage products/services.",
    href: "#",
    icon: CubeIcon,
  },
];

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function Header() {
  const { auth, setAuth, authShow, setAuthShow } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productCount, setProductCount] = useState(10);
  const [notificationCount, setNotificationCount] = useState(5);
  const { theme } = useTheme();
  const closeAuth = useRef(null);

  // console.log("user", auth.user?.profilePicture);

  // Close Auth to click any where
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (closeAuth.current && !closeAuth.current.contains(event.target)) {
        setAuthShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-blue-900 text-white z-[999]">
      <nav
        aria-label="Global"
        className="mx-auto w-full flex items-center justify-between h-[76px] text-white  px-4 lg:px-6"
      >
        <div className="flex lg:flex-1">
          <h2 className=" text-xl sm:text-3xl font-bold animate-pulse font-sans bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Social-Markets
          </h2>
        </div>

        <div className="flex items-center">
          <PopoverGroup className="hidden lg:flex gap-4 ">
            <Link
              href="#"
              className="text-sm/6 font-font-[500] dark:text-white   hover:underline transition-all duration-300 ease-in-out py-1"
            >
              Explore
            </Link>
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-[500] dark:text-white   hover:underline transition-all duration-300 ease-in-out py-1 px-4">
                Dashboard
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 flex-none text-gray-100"
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute outline-none top-full -left-8 z-10 mt-3 w-screen max-w-sm overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-2">
                  {bookKeeping.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-sm/6 hover:bg-gray-50"
                    >
                      <div className="flex size-9 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          aria-hidden="true"
                          className="size-6 text-gray-600 group-hover:text-customblue"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          href={item.href}
                          className="block font-semibold text-gray-900 text-[14px]"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className=" text-gray-600 text-[12px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
          </PopoverGroup>
        </div>

        <div className="flex lg:flex-1 lg:justify-end">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <span
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Start Selling"
                className="cursor-pointer dark:text-white  "
              >
                <FaPlus className="h-5 w-5 dark:text-white  hover:text-orange-600 transition-all duration-300 ease-in-out" />
              </span>
              <span
                data-tooltip-id="my-tooltip"
                data-tooltip-content="See Notifications"
                className=" relative cursor-pointer dark:text-white  "
              >
                <BiSolidBell className="h-5 w-5 dark:text-white  hover:text-orange-600 transition-all duration-300 ease-in-out" />
                {notificationCount > 0 && (
                  <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs font-normal w-5 h-5 flex items-center justify-center rounded-full">
                    {notificationCount}
                  </span>
                )}
              </span>
              <span
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Shopping Cart"
                className="relative cursor-pointer dark:text-white"
              >
                <AiOutlineShoppingCart className="h-5 w-5 dark:text-white hover:text-orange-600 transition-all duration-300 ease-in-out" />

                {productCount > 0 && (
                  <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs font-normal w-5 h-5 flex items-center justify-center rounded-full">
                    {productCount}
                  </span>
                )}
              </span>

              <span
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Change Theme"
                className="cursor-pointer dark:text-white  "
              >
                <TheamSwitcher className="h-5 w-5 dark:text-white  hover:text-orange-600 transition-all duration-300 ease-in-out" />
              </span>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 dark:text-white  "
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            {auth.user ? (
              <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Profile"
                className="hidden lg:flex w-[2.8rem] relative h-[2.8rem] border-orange-500 border rounded-full overflow-hidden cursor-pointer"
              >
                <Image
                  src={auth.user?.profilePicture || "/profile.png"}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            ) : (
              <button
                onClick={() => setAuthShow(true)}
                className={`${CommonStyle.button2} hidden sm:flex `}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden z-[99999]"
      >
        <div className="fixed inset-0 z-10 bg-gray-950" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto  px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            {auth.user ? (
              <div className="w-[3rem] relative h-[3rem] rounded-full overflow-hidden cursor-pointer">
                <Image
                  src={auth.user?.profilePicture || "/profile.png"}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <button
                onClick={() => setAuthShow(true)}
                className={`${CommonStyle.button2} hidden sm:flex `}
              >
                Get Started
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-4 flex flex-col gap-2">
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Explore
                </Link>
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Dashboard
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-open:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-1 space-y-1">
                    {[...bookKeeping].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-1 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Contact
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      {/* -----------------------Auth---------------> */}
      {authShow && (
        <div
          className={`fixed top-0 left-0 w-full h-screen px-2 sm:px-4 py-4  ${
            theme === "dark" ? "bg-slate-900/80" : "bg-white/80"
          }   flex items-center justify-center`}
        >
          <div ref={closeAuth} className="w-[36rem]">
            <Auth />
          </div>
        </div>
      )}
    </header>
  );
}
