import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { Route as Route$1, useCart, supabase } from "./router-F1NPiPpd.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import "../_libs/sonner.mjs";
import "../_libs/supabase__realtime-js.mjs";
import { H as Heart, C as ChevronDown, V as Video, h as MessageCircle, b as Minus, P as Plus, f as Truck, B as BadgeCheck, g as ShieldCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__phoenix.mjs";
function DispatchButton({
  onClick,
  className = "",
  idleText = "Buy It Now",
  doneText = "Order Placed"
}) {
  const [isAnimating, setIsAnimating] = reactExports.useState(false);
  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    onClick();
    setTimeout(() => {
      setIsAnimating(false);
    }, 1e4);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: `ship-btn ${isAnimating ? "go" : ""} ${className}`,
      onClick: handleClick,
      type: "button",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ship-btn-anim-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lbl idle", children: idleText }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "lbl done", children: [
          doneText,
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 12 10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "1.5 6 4.5 9 10.5 1" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cargo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "vehicle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cab-back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cab-front", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "windshield" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "headlight top" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "headlight bottom" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rail" })
      ] })
    }
  );
}
function ProductPage() {
  const {
    id
  } = Route$1.useParams();
  const {
    data: product,
    isLoading
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    }
  });
  const [activeImage, setActiveImage] = reactExports.useState(0);
  const [selectedQuality, setSelectedQuality] = reactExports.useState("");
  const [selectedColor, setSelectedColor] = reactExports.useState("");
  const [selectedDiamond, setSelectedDiamond] = reactExports.useState("");
  const [selectedSize, setSelectedSize] = reactExports.useState("");
  const [engraving, setEngraving] = reactExports.useState("");
  const [quantity, setQuantity] = reactExports.useState(1);
  const [showBreakup, setShowBreakup] = reactExports.useState(false);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tracking-widest uppercase text-sm", children: "Loading..." }) });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Product not found." }) });
  }
  const allImages = [product.img, ...product.images || []].filter(Boolean);
  const metalQualities = product.metal_qualities?.length ? product.metal_qualities : ["14K", "18K"];
  const metalColors = product.metal_colors?.length ? product.metal_colors : ["Yellow Gold", "White Gold", "Rose Gold"];
  const diamondQualities = product.diamond_qualities?.length ? product.diamond_qualities : ["VS-EF", "VS-GH", "VVS-EF", "VVS-GH"];
  const sizes = ["4", "5", "6", "7", "8", "9", "10", "11", "12"];
  if (!selectedQuality && metalQualities.length) setSelectedQuality(metalQualities[0]);
  if (!selectedColor && metalColors.length) setSelectedColor(metalColors[0]);
  if (!selectedDiamond && diamondQualities.length) setSelectedDiamond(diamondQualities[0]);
  const {
    addToCart
  } = useCart();
  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedQuality}-${selectedColor}-${selectedDiamond}-${selectedSize}-${engraving}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      quantity,
      metalQuality: selectedQuality,
      metalColor: selectedColor,
      diamondQuality: selectedDiamond,
      size: selectedSize,
      engraving
    });
  };
  const getColorCode = (color) => {
    if (color.toLowerCase().includes("rose")) return "bg-[#e0bfa6]";
    if (color.toLowerCase().includes("white")) return "bg-[#e9eaec]";
    return "bg-[#e8c97b]";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 bg-background/95 backdrop-blur border-b h-16 flex items-center px-4 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "font-serif text-2xl tracking-tight", children: [
      "Sheet",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: ".in" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-4 py-8 lg:py-12 md:grid md:grid-cols-2 gap-12 lg:gap-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square bg-muted border border-border rounded-lg overflow-hidden relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-6 h-6 text-muted-foreground hover:text-red-500 transition-colors" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: allImages[activeImage], alt: product.name, className: "w-full h-full object-cover" })
        ] }),
        allImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-2", children: allImages.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveImage(idx), className: `w-20 h-20 flex-shrink-0 border rounded overflow-hidden ${activeImage === idx ? "border-foreground" : "border-border opacity-70 hover:opacity-100"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: `Thumbnail ${idx}`, className: "w-full h-full object-cover" }) }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 md:mt-0 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl md:text-4xl text-foreground mb-4", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl md:text-2xl font-medium", children: [
              "₹",
              product.price.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground line-through text-sm", children: [
              "₹",
              product.mrp.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-accent text-accent-foreground px-2 py-0.5 text-xs font-medium uppercase tracking-widest rounded-sm", children: [
              "Save ₹",
              (product.mrp - product.price).toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
            "Tax included. ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "underline cursor-pointer", children: "Shipping" }),
            " and discounts calculated at checkout."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowBreakup(!showBreakup), className: "w-full flex items-center justify-between p-3 bg-secondary/30 text-sm font-medium hover:bg-secondary/50 transition-colors", children: [
            "Price Breakup",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${showBreakup ? "rotate-180" : ""}` })
          ] }),
          showBreakup && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 text-sm space-y-2 border-t border-border bg-background", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Gold Value" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                Math.round(product.price * 0.6).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Diamond Value" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                Math.round(product.price * 0.3).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Making Charges" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                Math.round(product.price * 0.07).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST (3%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                Math.round(product.price * 0.03).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-2 flex justify-between font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                product.price.toLocaleString("en-IN")
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mb-2 text-muted-foreground", children: [
              "Metal Quality: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: selectedQuality })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: metalQualities.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedQuality(q), className: `px-4 py-2 text-sm border ${selectedQuality === q ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:border-muted-foreground"} transition-colors`, children: q }, q)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mb-2 text-muted-foreground", children: [
              "Metal Color: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: selectedColor })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: metalColors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedColor(c), className: `w-8 h-8 rounded-full border-2 ${selectedColor === c ? "border-foreground p-0.5" : "border-transparent"} transition-all`, title: c, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-full h-full rounded-full border border-border ${getColorCode(c)}` }) }, c)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mb-2 text-muted-foreground", children: [
              "Diamond Quality & Tone: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: selectedDiamond })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: diamondQualities.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedDiamond(d), className: `px-4 py-2 text-sm border ${selectedDiamond === d ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:border-muted-foreground"} transition-colors`, children: d }, d)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mb-2 text-muted-foreground", children: [
              "Size ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selectedSize, onChange: (e) => setSelectedSize(e.target.value), className: "w-full md:w-1/2 p-2.5 border border-border bg-background text-sm focus:outline-none focus:border-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Select Size *" }),
              sizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-2 text-foreground font-medium", children: "Add Engraving" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Enter Engraving Instructions", value: engraving, onChange: (e) => setEngraving(e.target.value), maxLength: 20, className: "w-full p-2.5 border border-border bg-background text-sm focus:outline-none focus:border-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic mt-2 leading-relaxed", children: "Max 20 characters. We suggest 15 characters or less. More characters will make the font size smaller. Engraving will appear on the side of the ring on the inside." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex-1 flex items-center justify-center gap-2 border border-border py-2 text-sm hover:bg-secondary transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4" }),
            " Schedule A Video Call"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex-1 flex items-center justify-center gap-2 border border-border py-2 text-sm hover:bg-secondary transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
            " Need Help? Chat With Us"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQuantity(Math.max(1, quantity - 1)), className: "px-4 py-2 hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 border-x border-border min-w-[3rem] text-center", children: quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQuantity(quantity + 1), className: "px-4 py-2 hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAddToCart, className: "flex-1 border border-foreground bg-background text-foreground py-3 uppercase tracking-widest text-xs font-medium hover:bg-secondary transition-colors", children: "Add To Cart" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DispatchButton, { onClick: handleAddToCart, className: "w-full bg-foreground text-background uppercase tracking-widest text-sm font-medium hover:opacity-95 transition-opacity" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2 pt-8 border-t border-border text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-6 h-6 font-light", strokeWidth: 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase", children: "Free Shipping & Returns" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-6 h-6 font-light", strokeWidth: 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase", children: "Certified Jewellery" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-6 h-6 font-light", strokeWidth: 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase", children: "Committed to give back" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-6 h-6 font-light", strokeWidth: 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase", children: "Great Collection" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Learn more on about our ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "underline font-medium cursor-pointer text-foreground", children: "Terms & Policies" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-8 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl mb-4", children: "Product Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground leading-relaxed space-y-4", children: product.description ? product.description.split("\n").map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: p }, i)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A symbol of pure elegance and enduring love, this beautiful piece celebrates the timeless beauty of simplicity. At its heart lies a magnificent lab-grown diamond — expertly cut to maximize brilliance, fire, and clarity." }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  ProductPage as component
};
