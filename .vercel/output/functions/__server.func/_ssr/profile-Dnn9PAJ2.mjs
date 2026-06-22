import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { useAuth, Header, supabase } from "./router-DnJebkYP.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/supabase__realtime-js.mjs";
import { U as User, c as Mail, d as Phone } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
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
function ProfilePage() {
  const {
    session,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });
  reactExports.useEffect(() => {
    if (!isLoading && !session) {
      navigate({
        to: "/login"
      });
    }
  }, [session, isLoading, navigate]);
  reactExports.useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;
      const {
        data,
        error
      } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || ""
        });
      }
    };
    if (session) fetchProfile();
  }, [session]);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    setSaving(true);
    try {
      const {
        error
      } = await supabase.from("profiles").update({
        full_name: formData.full_name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", session.user.id);
      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    } finally {
      setSaving(false);
    }
  };
  if (isLoading || !session) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tracking-widest uppercase text-sm", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-secondary/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-4xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 border-b pb-4 flex justify-between items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl", children: "My Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Manage your personal information and addresses" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          to: "/orders"
        }), className: "text-xs uppercase tracking-widest hover:text-accent", children: "View Order History" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[1fr_2fr] gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-6 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground text-xl", children: profile?.full_name?.charAt(0)?.toUpperCase() || /* @__PURE__ */ jsxRuntimeExports.jsx(User, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-medium", children: profile?.full_name || "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
            " ",
            session.user.email
          ] }),
          profile?.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
            " ",
            profile.phone
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-8 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "uppercase tracking-widest text-sm font-medium border-b pb-4 mb-6", children: "Profile Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-2 block", children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "full_name", value: formData.full_name, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-2 block", children: "Phone Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "phone", type: "tel", value: formData.phone, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "uppercase tracking-widest text-sm font-medium border-b pb-4 mb-6 mt-8", children: "Shipping Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-2 block", children: "Street Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "address", value: formData.address, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-2 block", children: "City" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "city", value: formData.city, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-2 block", children: "State" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "state", value: formData.state, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-2 block", children: "Pincode" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "pincode", value: formData.pincode, onChange: handleChange, className: "w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: saving, type: "submit", className: "bg-foreground text-background px-8 py-3 text-xs uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50", children: saving ? "Saving..." : "Save Changes" }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ProfilePage as component
};
