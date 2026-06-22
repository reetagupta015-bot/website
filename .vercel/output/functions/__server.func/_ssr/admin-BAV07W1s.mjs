import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { supabase } from "./router-F1NPiPpd.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/supabase__realtime-js.mjs";
import { P as Plus, e as Pen, T as Trash2 } from "../_libs/lucide-react.mjs";
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
function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem("adminAuth") === "true");
  }, []);
  const [loginId, setLoginId] = reactExports.useState("");
  const [loginPassword, setLoginPassword] = reactExports.useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginId === "9528749943" && loginPassword === "798352") {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      toast.success("Login successful");
    } else {
      toast.error("Invalid ID or Password");
    }
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-secondary/30 grid place-items-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border w-full max-w-md p-8 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl", children: "Admin Login" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Enter credentials to access the dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "text", value: loginId, onChange: (e) => setLoginId(e.target.value), className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "password", value: loginPassword, onChange: (e) => setLoginPassword(e.target.value), className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-accent transition-colors mt-4", children: "Login" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, {});
}
function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = reactExports.useState(null);
  const [isAdding, setIsAdding] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("products");
  const [productSearch, setProductSearch] = reactExports.useState("");
  const {
    data: products,
    isLoading
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
  const {
    data: profiles,
    isLoading: isLoadingProfiles
  } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("profiles").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const {
    data: orders,
    isLoading: isLoadingOrders
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("orders").select("*").order("created_at", {
        ascending: false
      });
      if (error && error.code !== "42P01") throw error;
      return data || [];
    }
  });
  const filteredProducts = products?.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase())) || [];
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
    },
    onError: (error) => toast.error(error.message)
  });
  const addMutation = useMutation({
    mutationFn: async (product) => {
      const {
        error
      } = await supabase.from("products").insert([product]);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product added successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
      setIsAdding(false);
    },
    onError: (error) => toast.error(error.message)
  });
  const updateMutation = useMutation({
    mutationFn: async (product) => {
      const {
        id,
        ...rest
      } = product;
      const {
        error
      } = await supabase.from("products").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
      setIsEditing(null);
    },
    onError: (error) => toast.error(error.message)
  });
  const updateOrderStatus = useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      const {
        error
      } = await supabase.from("orders").update({
        status
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      });
    },
    onError: (error) => toast.error(error.message)
  });
  if (isLoading || isLoadingProfiles || isLoadingOrders) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-secondary/30 p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl", children: "Admin Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("products"), className: `flex-1 md:flex-none border px-4 py-2 text-sm uppercase tracking-widest ${activeTab === "products" ? "bg-foreground text-background border-foreground" : "bg-background border-border hover:bg-secondary"}`, children: "Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("customers"), className: `flex-1 md:flex-none border px-4 py-2 text-sm uppercase tracking-widest ${activeTab === "customers" ? "bg-foreground text-background border-foreground" : "bg-background border-border hover:bg-secondary"}`, children: [
          "Customers (",
          profiles?.length || 0,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("orders"), className: `flex-1 md:flex-none border px-4 py-2 text-sm uppercase tracking-widest ${activeTab === "orders" ? "bg-foreground text-background border-foreground" : "bg-background border-border hover:bg-secondary"}`, children: [
          "Orders (",
          orders?.length || 0,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          to: "/"
        }), className: "flex-1 md:flex-none bg-background border border-border px-4 py-2 text-sm hover:bg-secondary uppercase tracking-widest", children: "Store" }),
        activeTab === "products" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setIsAdding(true), className: "flex-1 md:flex-none bg-foreground text-background px-4 py-2 text-sm flex items-center justify-center gap-2 hover:bg-accent uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          " Add Product"
        ] })
      ] })
    ] }),
    activeTab === "products" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search products by name...", value: productSearch, onChange: (e) => setProductSearch(e.target.value), className: "w-full md:w-1/3 bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg overflow-hidden overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm min-w-[800px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "MRP" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs text-center", children: "Off (%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          filteredProducts.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-secondary/20 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.img, alt: product.name, className: "w-12 h-12 object-cover rounded bg-muted border border-border" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-medium", children: product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
              "₹",
              product.price?.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 text-muted-foreground line-through", children: [
              "₹",
              product.mrp?.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 text-center", children: [
              product.off,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsEditing(product), className: "p-2 text-muted-foreground hover:text-accent transition-colors inline-block", title: "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                if (confirm("Are you sure you want to delete this product?")) {
                  deleteMutation.mutate(product.id);
                }
              }, className: "p-2 text-muted-foreground hover:text-destructive transition-colors inline-block ml-2", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
            ] })
          ] }, product.id)),
          filteredProducts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-8 text-center text-muted-foreground", children: "No products found." }) })
        ] })
      ] }) })
    ] }) : activeTab === "orders" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg overflow-hidden overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm min-w-[800px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Order ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        orders?.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-secondary/20 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 font-medium text-xs font-mono", children: [
            order.id.slice(0, 8),
            "..."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: order.customer_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: order.customer_email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-muted-foreground", children: new Date(order.created_at).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
            "₹",
            order.total_amount?.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: order.status, onChange: (e) => updateOrderStatus.mutate({
            id: order.id,
            status: e.target.value
          }), disabled: updateOrderStatus.isPending, className: `px-2 py-1 text-[10px] uppercase tracking-widest border focus:outline-none cursor-pointer ${order.status === "Delivered" ? "bg-green-50 text-green-700 border-green-200" : order.status === "Cancelled" ? "bg-red-50 text-red-700 border-red-200" : order.status === "Shipped" ? "bg-blue-50 text-blue-700 border-blue-200" : order.status === "Processing" ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Pending", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Processing", children: "Processing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Shipped", children: "Shipped" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Delivered", children: "Delivered" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cancelled", children: "Cancelled" })
          ] }) })
        ] }, order.id)),
        (!orders || orders.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-8 text-center text-muted-foreground", children: "No orders found." }) })
      ] })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg overflow-hidden overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm min-w-[800px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium uppercase tracking-wider text-xs", children: "Joined" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        profiles?.map((profile) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-secondary/20 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-medium", children: profile.full_name || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: profile.email || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: profile.phone || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-muted-foreground", children: new Date(profile.created_at).toLocaleDateString() })
        ] }, profile.id)),
        (!profiles || profiles.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-8 text-center text-muted-foreground", children: "No customers found." }) })
      ] })
    ] }) }),
    (isEditing || isAdding) && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductModal, { product: isEditing, onClose: () => {
      setIsEditing(null);
      setIsAdding(false);
    }, onSave: (data) => {
      const formattedData = {
        ...data,
        images: data.images ? data.images.split(",").map((s) => s.trim()).filter(Boolean) : null,
        metal_qualities: data.metal_qualities ? data.metal_qualities.split(",").map((s) => s.trim()).filter(Boolean) : null,
        metal_colors: data.metal_colors ? data.metal_colors.split(",").map((s) => s.trim()).filter(Boolean) : null,
        diamond_qualities: data.diamond_qualities ? data.diamond_qualities.split(",").map((s) => s.trim()).filter(Boolean) : null
      };
      if (isEditing) {
        updateMutation.mutate({
          ...formattedData,
          id: isEditing.id
        });
      } else {
        addMutation.mutate(formattedData);
      }
    }, isLoading: updateMutation.isPending || addMutation.isPending })
  ] }) });
}
function ProductModal({
  product,
  onClose,
  onSave,
  isLoading
}) {
  const [formData, setFormData] = reactExports.useState({
    name: product?.name || "",
    price: product?.price || 0,
    mrp: product?.mrp || 0,
    off: product?.off || 0,
    img: product?.img || "",
    description: product?.description || "",
    images: product?.images?.join(", ") || "",
    metal_qualities: product?.metal_qualities?.join(", ") || "",
    metal_colors: product?.metal_colors?.join(", ") || "",
    diamond_qualities: product?.diamond_qualities?.join(", ") || ""
  });
  const [uploadingImage, setUploadingImage] = reactExports.useState(false);
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const {
        error: uploadError
      } = await supabase.storage.from("product-images").upload(fileName, file);
      if (uploadError) throw uploadError;
      const {
        data
      } = supabase.storage.from("product-images").getPublicUrl(fileName);
      setFormData((prev) => ({
        ...prev,
        img: data.publicUrl
      }));
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.message || "Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };
  const handleChange = (e) => {
    const {
      name,
      value,
      type
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };
  reactExports.useEffect(() => {
    if (formData.mrp > 0 && formData.price > 0 && formData.price < formData.mrp) {
      const discount = Math.round((formData.mrp - formData.price) / formData.mrp * 100);
      setFormData((prev) => ({
        ...prev,
        off: discount
      }));
    }
  }, [formData.price, formData.mrp]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border w-full max-w-xl p-6 shadow-lg transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl mb-6", children: product ? "Edit Product" : "Add Product" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSave(formData);
    }, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, name: "name", value: formData.name, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Price (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "number", step: "any", name: "price", value: formData.price, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "MRP (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "number", step: "any", name: "mrp", value: formData.mrp, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Discount (%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { readOnly: true, type: "number", name: "off", value: formData.off, className: "w-full bg-secondary/50 border border-border px-4 py-2.5 text-sm cursor-not-allowed text-muted-foreground focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "text", name: "img", value: formData.img, onChange: handleChange, placeholder: "URL...", className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "bg-foreground text-background px-4 py-2.5 text-sm flex items-center justify-center cursor-pointer hover:bg-accent whitespace-nowrap shrink-0", children: [
              uploadingImage ? "Uploading..." : "Upload",
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleImageUpload, disabled: uploadingImage })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "description", value: formData.description, onChange: handleChange, rows: 3, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Additional Images (comma separated URLs)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", name: "images", value: formData.images, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Metal Qualities" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", name: "metal_qualities", value: formData.metal_qualities, onChange: handleChange, placeholder: "14K, 18K", className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Metal Colors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", name: "metal_colors", value: formData.metal_colors, onChange: handleChange, placeholder: "Yellow, White", className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block", children: "Diamond Qualities" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", name: "diamond_qualities", value: formData.diamond_qualities, onChange: handleChange, placeholder: "VS-EF, VVS-EF", className: "w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" })
        ] })
      ] }),
      formData.img && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block mb-2", children: "Image Preview:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: formData.img, alt: "Preview", className: "w-20 h-20 object-cover mx-auto border border-border", onError: (e) => e.target.style.display = "none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-8 pt-4 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, disabled: isLoading, className: "flex-1 border border-border bg-background text-foreground py-3 text-xs uppercase tracking-widest hover:bg-secondary disabled:opacity-50 transition-colors", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isLoading, className: "flex-1 bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-colors", children: isLoading ? "Saving..." : "Save Product" })
      ] })
    ] })
  ] }) });
}
export {
  AdminPage as component
};
