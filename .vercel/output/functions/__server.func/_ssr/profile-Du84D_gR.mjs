import { reactExports, jsxRuntimeExports } from "./server-CIZhL1-P.mjs";
import { useAuth, useNavigate, Header, User, supabase, createLucideIcon, toast } from "./router-D6-O7ZmP.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
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
