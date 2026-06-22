import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { useAuth, useCart, Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, CheckoutModal, supabase } from "./router-DnJebkYP.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__realtime-js.mjs";
import { M as Menu, S as Search, U as User, a as ShoppingBag, X, b as Minus, P as Plus, R as RotateCcw, f as Truck, g as ShieldCheck, B as BadgeCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/supabase__phoenix.mjs";
const hero = "/assets/hero-DkeZhO-f.jpg";
const catRings = "/assets/cat-rings--a9zOX8h.jpg";
const catEarrings = "/assets/cat-earrings-ZQeDZycZ.jpg";
const catPendants = "/assets/cat-pendants-C1VOxpXR.jpg";
const catBracelets = "/assets/cat-bracelets-DcOl-tkL.jpg";
const catNecklace = "/assets/cat-necklace-3jtLksOH.jpg";
const catBangles = "/assets/cat-bangles-B4lw4-eO.jpg";
const prod1 = "/assets/prod-1-BF-2xK81.jpg";
const shapes = ["Round", "Oval", "Cushion", "Emerald", "Pear", "Heart", "Radiant", "Princess", "Marquise", "Asscher"];
const categories = [{
  name: "Rings",
  desc: "Solitaires, halos and cocktail styles for every moment.",
  img: catRings
}, {
  name: "Earrings",
  desc: "From classic studs to graceful dangles.",
  img: catEarrings
}, {
  name: "Pendants",
  desc: "Everyday pieces that complement your style.",
  img: catPendants
}, {
  name: "Bracelets",
  desc: "Modern elegance crafted to shine.",
  img: catBracelets
}, {
  name: "Necklace",
  desc: "Statement pieces of pure sophistication.",
  img: catNecklace
}, {
  name: "Bangles",
  desc: "Tradition and brilliance, beautifully entwined.",
  img: catBangles
}];
const collections = [{
  name: "Everyday Romance",
  img: catRings
}, {
  name: "Wedding Season Ready",
  img: catNecklace
}, {
  name: "Rings That Say Yes",
  img: prod1
}, {
  name: "The Gentleman's Edit",
  img: catBracelets
}];
function ShapeIcon({
  name
}) {
  const common = "stroke-foreground fill-none";
  const map = {
    Round: /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "13", className: common, strokeWidth: "1.2" }),
    Oval: /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "20", cy: "20", rx: "10", ry: "14", className: common, strokeWidth: "1.2" }),
    Cushion: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "7", y: "7", width: "26", height: "26", rx: "7", className: common, strokeWidth: "1.2" }),
    Emerald: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "9", y: "6", width: "22", height: "28", className: common, strokeWidth: "1.2" }),
    Pear: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 6 C12 14 12 24 20 34 C28 24 28 14 20 6 Z", className: common, strokeWidth: "1.2" }),
    Heart: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 33 C8 24 8 13 14 11 C17.5 10 19 12 20 14 C21 12 22.5 10 26 11 C32 13 32 24 20 33 Z", className: common, strokeWidth: "1.2" }),
    Radiant: /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "13,6 27,6 33,12 33,28 27,34 13,34 7,28 7,12", className: common, strokeWidth: "1.2" }),
    Princess: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "8", y: "8", width: "24", height: "24", className: common, strokeWidth: "1.2" }),
    Marquise: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 6 C8 20 8 20 20 34 C32 20 32 20 20 6 Z", className: common, strokeWidth: "1.2" }),
    Asscher: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: common, strokeWidth: "1.2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "9", y: "9", width: "22", height: "22" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "13", y: "13", width: "14", height: "14" })
    ] })
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 40 40", className: "h-12 w-12", children: map[name] });
}
function Header() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = reactExports.useState(false);
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal
  } = useCart();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = reactExports.useState(false);
  const {
    data: searchResults,
    isLoading: searching
  } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const {
        data,
        error
      } = await supabase.from("products").select("*").ilike("name", `%${searchQuery}%`).limit(5);
      if (error) throw error;
      return data;
    },
    enabled: searchQuery.length > 0
  });
  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    setOpen(false);
    navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 bg-background/95 backdrop-blur border-b", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground text-background text-center text-xs py-2 tracking-wider uppercase", children: "20% off on diamonds  +  50% off on making charges" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 lg:px-8 flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "lg:hidden p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "font-serif text-3xl tracking-tight", children: [
        "Sheet",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: ".in" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden lg:flex items-center gap-8 text-sm uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#new", className: "hover:text-accent", children: "New" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#categories", className: "hover:text-accent", children: "Rings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#categories", className: "hover:text-accent", children: "Earrings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#categories", className: "hover:text-accent", children: "Necklace" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#categories", className: "hover:text-accent", children: "Bracelets" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#categories", className: "hover:text-accent", children: "Pendants" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#about", className: "hover:text-accent", children: "About" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Search", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 hover:text-accent transition-colors" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "top", className: "pt-16 pb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "sr-only", children: "Search Products" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search for rings, earrings, pendants...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full text-2xl md:text-4xl font-serif bg-transparent border-b-2 border-foreground/20 focus:border-foreground outline-none pb-4 transition-colors", autoFocus: true }),
              searching && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground uppercase tracking-widest", children: "Searching..." }),
              !searching && searchResults && searchResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: searchResults.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$id", params: {
                id: product.id
              }, className: "group block space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.img, alt: product.name, className: "w-full h-full object-cover group-hover:scale-105 transition-transform" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: product.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "₹",
                    product.price?.toLocaleString("en-IN")
                  ] })
                ] })
              ] }, product.id)) }),
              !searching && searchQuery && searchResults?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-center py-8 uppercase tracking-widest text-sm", children: [
                'No results found for "',
                searchQuery,
                '"'
              ] })
            ] })
          ] })
        ] }),
        user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Account", onClick: () => setOpen((v) => !v), className: "h-8 w-8 rounded-full bg-accent text-accent-foreground grid place-items-center text-xs font-medium uppercase hover:opacity-90 transition-opacity", children: (user.user_metadata?.full_name || user.email || "?").charAt(0) }),
          open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-10 w-56 bg-card border border-border shadow-lg py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: user.user_metadata?.full_name || "Account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: user.email })
            ] }),
            user.email === "admin@admin.com" && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "w-full block text-left px-4 py-2 hover:bg-secondary", children: "Admin Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full text-left px-4 py-2 hover:bg-secondary", children: "My Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full text-left px-4 py-2 hover:bg-secondary", children: "Wishlist" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: signOut, className: "w-full text-left px-4 py-2 hover:bg-secondary text-destructive", children: "Sign Out" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", "aria-label": "Sign in", className: "hidden sm:flex items-center gap-1.5 text-sm hover:text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline", children: "Sign In" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { "aria-label": "Cart", className: "relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5 group-hover:text-accent transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-2 -top-2 bg-accent text-accent-foreground text-[10px] rounded-full h-4 w-4 grid place-items-center font-medium", children: cartCount })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-md flex flex-col p-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "p-6 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "font-serif text-2xl", children: [
              "Shopping Cart (",
              cartCount,
              ")"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: cart.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-muted-foreground space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12 opacity-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "uppercase tracking-widest text-sm", children: "Your cart is empty" })
            ] }) : cart.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 border-b pb-6 last:border-0 last:pb-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-muted overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.img, alt: item.name, className: "w-full h-full object-cover" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm leading-tight", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeFromCart(item.id), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                  "₹",
                  item.price.toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground space-y-0.5 pt-1", children: [
                  item.metalColor && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.metalColor }),
                  item.metalQuality && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    " • ",
                    item.metalQuality
                  ] }),
                  item.diamondQuality && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    " • ",
                    item.diamondQuality
                  ] }),
                  item.size && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "Size: ",
                    item.size
                  ] }),
                  item.engraving && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate", children: [
                    'Engraving: "',
                    item.engraving,
                    '"'
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateQuantity(item.id, item.quantity - 1), className: "p-1 hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium w-6 text-center", children: item.quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateQuantity(item.id, item.quantity + 1), className: "p-1 hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) })
                ] }) })
              ] })
            ] }, item.id)) }),
            cart.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t p-6 bg-secondary/20 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-widest text-sm", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg", children: [
                  "₹",
                  cartTotal.toLocaleString("en-IN")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Shipping & taxes calculated at checkout" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsCheckoutOpen(true), className: "w-full bg-foreground text-background py-4 uppercase tracking-widest text-sm font-medium hover:opacity-90 transition-opacity", children: "Proceed to Checkout" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutModal, { isOpen: isCheckoutOpen, onClose: () => setIsCheckoutOpen(false) })
      ] })
    ] })
  ] });
}
function Index() {
  const {
    data: products
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("products").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: hero, alt: "Lab-grown diamond necklace and bracelet", width: 1920, height: 1080, className: "w-full h-[60vh] md:h-[80vh] object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-10 md:bottom-16 text-center text-background px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.3em] uppercase mb-3 opacity-90", children: "New Collection" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl md:text-6xl lg:text-7xl", children: "Brilliance, Reimagined." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm md:text-base opacity-90 max-w-xl mx-auto", children: "Certified lab-grown diamonds, ethically crafted into timeless jewellery." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#categories", className: "inline-block mt-6 bg-background text-foreground px-8 py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors", children: "Shop the Edit" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "new", className: "py-16 lg:py-24 bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center font-serif text-3xl md:text-4xl mb-12", children: "Shop By Shape" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 md:grid-cols-10 gap-6", children: shapes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "group flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full border border-border grid place-items-center bg-card group-hover:border-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShapeIcon, { name: s }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-wide", children: s })
      ] }, s)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "categories", className: "py-16 lg:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center font-serif text-3xl md:text-4xl mb-12", children: "Shop By Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "group relative overflow-hidden block aspect-[4/5] bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.img, alt: c.name, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-5 md:p-7 text-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl md:text-3xl uppercase tracking-wide", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm opacity-90 mt-1 hidden md:block", children: c.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block mt-3 text-xs uppercase tracking-widest border-b border-background pb-0.5", children: "Explore" })
        ] })
      ] }, c.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-foreground text-background py-12 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-accent mb-3", children: "Limited Time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl md:text-5xl", children: "Up to 50% off on Making Charges" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm opacity-80", children: "On every certified lab-grown diamond piece, this season." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#bestsellers", className: "inline-block mt-6 bg-accent text-accent-foreground px-8 py-3 text-xs uppercase tracking-widest hover:opacity-90", children: "Shop Now" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 lg:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center font-serif text-3xl md:text-4xl mb-12", children: "Explore Collections" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: collections.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "group block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.img, alt: c.name, loading: "lazy", className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-sm uppercase tracking-widest", children: c.name })
      ] }, c.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y bg-secondary/30 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [{
      icon: RotateCcw,
      label: "Free 14-Day Returns"
    }, {
      icon: Truck,
      label: "Free Shipping Both Ways"
    }, {
      icon: ShieldCheck,
      label: "Assured Buy-Back"
    }, {
      icon: BadgeCheck,
      label: "Certified Jewellery"
    }].map(({
      icon: Icon,
      label
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-7 w-7 text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest", children: label })
    ] }, label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "bestsellers", className: "py-16 lg:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center font-serif text-3xl md:text-4xl mb-12", children: "Best Sellers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8", children: products?.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$id", params: {
        id: p.id
      }, className: "group block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: p.name, loading: "lazy", className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-3 left-3 bg-background text-foreground text-[10px] uppercase tracking-widest px-2 py-1", children: [
            p.off,
            "% off"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              "₹",
              p.price?.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground line-through text-xs", children: [
              "₹",
              p.mrp?.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[#e0bfa6] border border-border", title: "Rose Gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[#e8c97b] border border-border", title: "Yellow Gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[#e9eaec] border border-border", title: "White Gold" })
          ] })
        ] })
      ] }, p.id || p.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "bg-secondary/40 py-16 lg:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl md:text-4xl", children: "A New Standard of Brilliance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "At Sheet.in, every diamond is grown with care — chemically, physically and optically identical to mined diamonds, without the environmental cost. Crafted into jewellery you'll wear for a lifetime." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto", onSubmit: (e) => e.preventDefault(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "Your email address", className: "flex-1 bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors", children: "Subscribe" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-foreground text-background pt-16 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 lg:px-8 grid md:grid-cols-4 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-2xl", children: [
            "Sheet",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: ".in" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm opacity-70", children: "Lab-grown diamond jewellery, crafted with intent." })
        ] }),
        [{
          title: "Shop",
          items: ["Rings", "Earrings", "Necklace", "Bracelets", "Pendants"]
        }, {
          title: "Support",
          items: ["Contact", "Shipping", "Returns", "Care Guide", "FAQ"]
        }, {
          title: "Company",
          items: ["About", "Sustainability", "Certifications", "Stores", "Press"]
        }].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs uppercase tracking-widest mb-4 text-accent", children: col.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm opacity-80", children: col.items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:opacity-100 hover:text-accent", children: i }) }, i)) })
        ] }, col.title))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 lg:px-8 mt-12 pt-6 border-t border-background/10 text-xs opacity-60 flex flex-col md:flex-row justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Sheet.in — All rights reserved."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Made with care in India." })
      ] })
    ] })
  ] });
}
export {
  Header,
  Index as component
};
