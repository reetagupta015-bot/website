import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { O as Overlay, P as Portal, C as Content, a as Close, T as Title, D as Description, R as Root, b as Trigger } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { X, M as Menu, S as Search, U as User, a as ShoppingBag, b as Minus, P as Plus } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
const appCss = "/assets/styles-6O5SuYic.css";
const CartContext = reactExports.createContext(void 0);
const CartProvider = ({ children }) => {
  const [cart, setCart] = reactExports.useState([]);
  const [isLoaded, setIsLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shopping-cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    }
    setIsLoaded(true);
  }, []);
  reactExports.useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("shopping-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);
  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === newItem.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      }
      return [...prevCart, newItem];
    });
    toast.success(`Added ${newItem.quantity} ${newItem.name} to cart!`);
  };
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(
      (prevCart) => prevCart.map((item) => item.id === id ? { ...item, quantity } : item)
    );
  };
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CartContext.Provider, { value: { cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }, children });
};
const useCart = () => {
  const context = reactExports.useContext(CartContext);
  if (context === void 0) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "sheet.in" },
      { name: "description", content: "My Sheet Creator builds custom websites, replicating the structure and functionality of reference sites with a personalized domain." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "sheet.in" },
      { property: "og:description", content: "My Sheet Creator builds custom websites, replicating the structure and functionality of reference sites with a personalized domain." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "sheet.in" },
      { name: "twitter:description", content: "My Sheet Creator builds custom websites, replicating the structure and functionality of reference sites with a personalized domain." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/eb83bd1b-f70a-498f-9da3-458624ed93cb/id-preview-8ea7117e--81087eed-71fc-4286-af84-7a933e0c881c.lovable.app-1779810285141.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/eb83bd1b-f70a-498f-9da3-458624ed93cb/id-preview-8ea7117e--81087eed-71fc-4286-af84-7a933e0c881c.lovable.app-1779810285141.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true })
  ] }) });
}
const $$splitComponentImporter$7 = () => import("./signup-D2ypqUSX.mjs");
const Route$7 = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Create Account — Sheet.in"
    }, {
      name: "description",
      content: "Create a Sheet.in account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./profile-COFcoLwn.mjs");
const Route$6 = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "My Profile — Sheet.in"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./orders-kVpQEnHW.mjs");
const Route$5 = createFileRoute("/orders")({
  head: () => ({
    meta: [{
      title: "My Orders — Sheet.in"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./login-Dzx2cyse.mjs");
const Route$4 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign In — Sheet.in"
    }, {
      name: "description",
      content: "Sign in to your Sheet.in account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin-BKM8xXF8.mjs");
const Route$3 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin Panel — Sheet.in"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
function createSupabaseClient() {
  const SUPABASE_URL = "https://lxvuxitbylzivukytahn.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_mSNHPEr1vtAZ7rkYCwyKyQ_GusCysov";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
function useAuth() {
  const [session, setSession] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  return { session, user, loading };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Sheet = Root;
const SheetTrigger = Trigger;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
function CheckoutModal({ isOpen, onClose }) {
  const { session } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "Cash on Delivery"
  });
  reactExports.useEffect(() => {
    if (isOpen && session?.user?.id) {
      supabase.from("profiles").select("*").eq("id", session.user.id).single().then(({ data }) => {
        if (data) {
          setFormData((prev) => ({
            ...prev,
            name: data.full_name || prev.name,
            phone: data.phone || prev.phone,
            address: data.address || prev.address,
            city: data.city || prev.city,
            state: data.state || prev.state,
            pincode: data.pincode || prev.pincode
          }));
        }
      });
    }
  }, [isOpen, session]);
  if (!isOpen) return null;
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("Please log in to place an order");
      navigate({ to: "/login" });
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setLoading(true);
    try {
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1e3)}`;
      const orderData = {
        id: orderId,
        user_id: session.user.id,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        items: cart,
        total_amount: cartTotal,
        payment_method: formData.paymentMethod,
        status: "Pending"
      };
      const { error } = await supabase.from("orders").insert([orderData]);
      if (error) throw error;
      try {
        console.log("Sending email notification to admin...", {
          to: "admin@sheet.in",
          subject: `New Order Received: ${orderId}`,
          body: `
            Customer: ${formData.name} (${formData.email})
            Phone: ${formData.phone}
            Amount: ₹${cartTotal}
            Items: ${cart.length}
            Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}
          `
        });
      } catch (emailError) {
        console.error("Failed to send admin email:", emailError);
      }
      toast.success(`Order placed successfully! Order ID: ${orderId}`);
      clearCart();
      onClose();
      navigate({ to: "/orders" });
    } catch (error) {
      toast.error("Checkout failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 border-b", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl", children: "Secure Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Complete your order details below" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 md:p-8 overflow-y-auto flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "checkout-form", onSubmit: handleCheckout, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm uppercase tracking-widest font-medium border-b pb-2", children: "Contact Info" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, name: "name", value: formData.name, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", name: "email", value: formData.email, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "tel", name: "phone", value: formData.phone, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm uppercase tracking-widest font-medium border-b pb-2", children: "Shipping Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Street Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, name: "address", value: formData.address, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, name: "city", value: formData.city, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "State" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, name: "state", value: formData.state, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Pincode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, name: "pincode", value: formData.pincode, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm uppercase tracking-widest font-medium border-b pb-2", children: "Payment Method" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "paymentMethod", value: formData.paymentMethod, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cash on Delivery", children: "Cash on Delivery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "UPI", children: "UPI / Online Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Credit Card", children: "Credit / Debit Card" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 border-t bg-secondary/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm uppercase tracking-widest font-medium", children: "Total Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-serif text-2xl", children: [
          "₹",
          cartTotal.toLocaleString("en-IN")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          form: "checkout-form",
          disabled: loading,
          className: "w-full bg-foreground text-background py-4 text-xs uppercase tracking-widest font-medium hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50",
          children: loading ? "Processing..." : "Place Order"
        }
      )
    ] })
  ] }) });
}
const $$splitComponentImporter$2 = () => import("./index-we67NZP6.mjs");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Sheet.in — Lab-Grown Diamond Jewellery"
    }, {
      name: "description",
      content: "Shop exquisite lab-grown diamond rings, earrings, pendants, bracelets and necklaces at Sheet.in. Certified, sustainable, beautifully crafted."
    }, {
      property: "og:title",
      content: "Sheet.in — Lab-Grown Diamond Jewellery"
    }, {
      property: "og:description",
      content: "Certified lab-grown diamond jewellery, crafted to shine."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
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
const $$splitComponentImporter$1 = () => import("./product._id-w11_wVQK.mjs");
const Route$1 = createFileRoute("/product/$id")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./callback-BvLA133g.mjs");
const Route = createFileRoute("/auth/callback")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$7.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$8
});
const ProfileRoute = Route$6.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$8
});
const OrdersRoute = Route$5.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => Route$8
});
const LoginRoute = Route$4.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$8
});
const AdminRoute = Route$3.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const ProductIdRoute = Route$1.update({
  id: "/product/$id",
  path: "/product/$id",
  getParentRoute: () => Route$8
});
const AuthCallbackRoute = Route.update({
  id: "/auth/callback",
  path: "/auth/callback",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  LoginRoute,
  OrdersRoute,
  ProfileRoute,
  SignupRoute,
  AuthCallbackRoute,
  ProductIdRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  CheckoutModal,
  Header,
  Route$1 as Route,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  router,
  supabase,
  useAuth,
  useCart
};
