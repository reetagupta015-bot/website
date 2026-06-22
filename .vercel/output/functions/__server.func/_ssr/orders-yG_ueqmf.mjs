import { reactExports, jsxRuntimeExports } from "./server-D39xh37i.mjs";
import { useAuth, useNavigate, Header, supabase } from "./router-DusIiRl-.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function OrdersPage() {
  const {
    session,
    isLoading: authLoading
  } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!authLoading && !session) {
      navigate({
        to: "/login"
      });
    }
  }, [session, authLoading, navigate]);
  reactExports.useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.id) return;
      try {
        const {
          data,
          error
        } = await supabase.from("orders").select("*").eq("user_id", session.user.id).order("created_at", {
          ascending: false
        });
        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (session) {
      fetchOrders();
    }
  }, [session]);
  if (authLoading || loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground uppercase tracking-widest text-sm", children: "Loading Orders..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-secondary/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-5xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 border-b pb-4 flex justify-between items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl", children: "My Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "View your past purchases and their status" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          to: "/profile"
        }), className: "text-xs uppercase tracking-widest hover:text-accent", children: "Back to Profile" })
      ] }),
      orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "You haven't placed any orders yet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          to: "/"
        }), className: "mt-4 bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent transition-colors", children: "Start Shopping" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: orders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/50 border-b border-border p-4 md:p-6 flex flex-wrap justify-between items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1", children: "Order Placed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: new Date(order.created_at).toLocaleDateString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1", children: "Total Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                "₹",
                order.total_amount?.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1", children: "Order ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium font-mono", children: order.id })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-3 py-1.5 text-xs font-medium uppercase tracking-widest border ${order.status === "Delivered" ? "bg-green-50 text-green-700 border-green-200" : order.status === "Cancelled" ? "bg-red-50 text-red-700 border-red-200" : order.status === "Shipped" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`, children: order.status }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: order.items?.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-muted overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.img, alt: item.name, className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              item.metalColor,
              " ",
              item.metalQuality && `• ${item.metalQuality}`,
              " ",
              item.diamondQuality && `• ${item.diamondQuality}`
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
                "₹",
                item.price?.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "Qty: ",
                item.quantity
              ] })
            ] })
          ] })
        ] }, idx)) }) })
      ] }, order.id)) })
    ] })
  ] });
}
export {
  OrdersPage as component
};
