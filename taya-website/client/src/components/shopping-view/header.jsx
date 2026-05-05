import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth/authSlice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 gap-2 lg:mb-0 lg:items-center lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-red-900/40 hover:text-red-400 hover:scale-105"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  console.log(cartItems, "sangam");

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative border-red-800/60 bg-zinc-900 text-red-400 hover:bg-red-900/40 hover:text-red-300 transition-all hover:scale-110 shadow-md shadow-black/50"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-700 to-red-800 px-1 text-[11px] font-bold text-white shadow-xl shadow-red-900/60 animate-pulse-red">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="border border-red-800/60 bg-zinc-900 cursor-pointer transition-all hover:scale-110 hover:shadow-lg hover:shadow-red-900/40">
            <AvatarFallback className="bg-gradient-to-br from-red-800 to-red-900 font-extrabold text-white">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 border border-red-900/50 bg-zinc-950 text-white shadow-xl shadow-black/60">
          <DropdownMenuLabel className="text-gray-300">Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-red-900/40" />
          <DropdownMenuItem onClick={() => navigate("/shop/account")} className="hover:bg-red-900/30 focus:bg-red-900/30">
            <UserCog className="mr-2 h-4 w-4 text-red-400" />
            <span className="text-gray-200">Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-red-900/40" />
          <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-900/30 focus:bg-red-900/30">
            <LogOut className="mr-2 h-4 w-4 text-red-400" />
            <span className="text-gray-200">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-red-900/40 bg-zinc-950/95 backdrop-blur-xl shadow-lg shadow-black/40">
      <div className="flex h-20 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-3 rounded-full border border-red-800/50 bg-zinc-900/80 px-4 py-2 transition-all hover:shadow-lg hover:shadow-red-900/40 hover:scale-105 hover:border-red-700/60">
          <HousePlug className="h-5 w-5 text-red-500 font-bold" />
          <span className="text-sm font-bold tracking-[0.22em] text-white">TAYA</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="border-red-800/50 bg-zinc-900 text-red-400 lg:hidden hover:bg-red-900/40 transition-all hover:scale-105">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs border-red-900/50 bg-zinc-950 text-white shadow-2xl">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
