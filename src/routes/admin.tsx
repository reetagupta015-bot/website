import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Panel — Sheet.in" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("adminAuth") === "true";
  });
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
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
    return (
      <div className="min-h-screen bg-secondary/30 grid place-items-center p-4">
        <div className="bg-card border border-border w-full max-w-md p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-2">Enter credentials to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">ID</label>
              <input
                required
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Password</label>
              <input
                required
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-accent transition-colors mt-4"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState("products");
  const [productSearch, setProductSearch] = useState("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: profiles, isLoading: isLoadingProfiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error && error.code !== '42P01') throw error; // Ignore if table doesn't exist yet
      return data || [];
    },
  });

  const filteredProducts = products?.filter((p: any) => p.name.toLowerCase().includes(productSearch.toLowerCase())) || [];

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => toast.error(error.message),
  });

  const addMutation = useMutation({
    mutationFn: async (product: any) => {
      const { error } = await supabase.from("products").insert([product]);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product added successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsAdding(false);
    },
    onError: (error: any) => toast.error(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: async (product: any) => {
      const { id, ...rest } = product;
      const { error } = await supabase.from("products").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsEditing(null);
    },
    onError: (error: any) => toast.error(error.message),
  });

  if (isLoading || isLoadingProfiles || isLoadingOrders) {
    return <div className="min-h-screen grid place-items-center"><p>Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-secondary/30 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="font-serif text-3xl">Admin Dashboard</h1>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex-1 md:flex-none border px-4 py-2 text-sm uppercase tracking-widest ${activeTab === "products" ? "bg-foreground text-background border-foreground" : "bg-background border-border hover:bg-secondary"}`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`flex-1 md:flex-none border px-4 py-2 text-sm uppercase tracking-widest ${activeTab === "customers" ? "bg-foreground text-background border-foreground" : "bg-background border-border hover:bg-secondary"}`}
            >
              Customers ({profiles?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 md:flex-none border px-4 py-2 text-sm uppercase tracking-widest ${activeTab === "orders" ? "bg-foreground text-background border-foreground" : "bg-background border-border hover:bg-secondary"}`}
            >
              Orders ({orders?.length || 0})
            </button>
            <button
              onClick={() => navigate({ to: "/" })}
              className="flex-1 md:flex-none bg-background border border-border px-4 py-2 text-sm hover:bg-secondary uppercase tracking-widest"
            >
              Store
            </button>
            {activeTab === "products" && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex-1 md:flex-none bg-foreground text-background px-4 py-2 text-sm flex items-center justify-center gap-2 hover:bg-accent uppercase tracking-widest"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            )}
          </div>
        </div>

        {activeTab === "products" ? (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Search products by name..." 
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="w-full md:w-1/3 bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <div className="bg-card border border-border rounded-lg overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Image</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Name</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Price</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">MRP</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs text-center">Off (%)</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: any) => (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                    <td className="p-4">
                      <img src={product.img} alt={product.name} className="w-12 h-12 object-cover rounded bg-muted border border-border" />
                    </td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4">₹{product.price?.toLocaleString("en-IN")}</td>
                    <td className="p-4 text-muted-foreground line-through">₹{product.mrp?.toLocaleString("en-IN")}</td>
                    <td className="p-4 text-center">{product.off}%</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setIsEditing(product)}
                        className="p-2 text-muted-foreground hover:text-accent transition-colors inline-block"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this product?")) {
                            deleteMutation.mutate(product.id);
                          }
                        }}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors inline-block ml-2"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No products found.

                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        ) : activeTab === "orders" ? (
          <div className="bg-card border border-border rounded-lg overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Order ID</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Customer</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Date</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Total</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order: any) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                    <td className="p-4 font-medium text-xs font-mono">{order.id.slice(0, 8)}...</td>
                    <td className="p-4">
                      <div>{order.customer_name}</div>
                      <div className="text-xs text-muted-foreground">{order.customer_email}</div>
                    </td>
                    <td className="p-4 text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="p-4">₹{order.total_amount?.toLocaleString("en-IN")}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-widest ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!orders || orders.length === 0) && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Name</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Email</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Phone</th>
                  <th className="p-4 font-medium uppercase tracking-wider text-xs">Joined</th>
                </tr>
              </thead>
              <tbody>
                {profiles?.map((profile: any) => (
                  <tr key={profile.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                    <td className="p-4 font-medium">{profile.full_name || "—"}</td>
                    <td className="p-4">{profile.email || "—"}</td>
                    <td className="p-4">{profile.phone || "—"}</td>
                    <td className="p-4 text-muted-foreground">{new Date(profile.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {(!profiles || profiles.length === 0) && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit / Add Modal */}
        {(isEditing || isAdding) && (
          <ProductModal
            product={isEditing}
            onClose={() => {
              setIsEditing(null);
              setIsAdding(false);
            }}
            onSave={(data: any) => {
              const formattedData = {
                ...data,
                images: data.images ? data.images.split(",").map((s: string) => s.trim()).filter(Boolean) : null,
                metal_qualities: data.metal_qualities ? data.metal_qualities.split(",").map((s: string) => s.trim()).filter(Boolean) : null,
                metal_colors: data.metal_colors ? data.metal_colors.split(",").map((s: string) => s.trim()).filter(Boolean) : null,
                diamond_qualities: data.diamond_qualities ? data.diamond_qualities.split(",").map((s: string) => s.trim()).filter(Boolean) : null,
              };
              if (isEditing) {
                updateMutation.mutate({ ...formattedData, id: isEditing.id });
              } else {
                addMutation.mutate(formattedData);
              }
            }}
            isLoading={updateMutation.isPending || addMutation.isPending}
          />
        )}
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onSave, isLoading }: any) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    mrp: product?.mrp || 0,
    off: product?.off || 0,
    img: product?.img || "",
    description: product?.description || "",
    images: product?.images?.join(", ") || "",
    metal_qualities: product?.metal_qualities?.join(", ") || "",
    metal_colors: product?.metal_colors?.join(", ") || "",
    diamond_qualities: product?.diamond_qualities?.join(", ") || "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, img: data.publicUrl }));
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(error.message || "Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Auto-calculate discount percentage if mrp and price are entered
  useEffect(() => {
    if (formData.mrp > 0 && formData.price > 0 && formData.price < formData.mrp) {
      const discount = Math.round(((formData.mrp - formData.price) / formData.mrp) * 100);
      setFormData((prev) => ({ ...prev, off: discount }));
    }
  }, [formData.price, formData.mrp]);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border w-full max-w-xl p-6 shadow-lg transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
        <h2 className="font-serif text-2xl mb-6">{product ? "Edit Product" : "Add Product"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Name</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Price (₹)</label>
              <input
                required
                type="number"
                step="any"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">MRP (₹)</label>
              <input
                required
                type="number"
                step="any"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Discount (%)</label>
              <input
                readOnly
                type="number"
                name="off"
                value={formData.off}
                className="w-full bg-secondary/50 border border-border px-4 py-2.5 text-sm cursor-not-allowed text-muted-foreground focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Image</label>
              <div className="flex gap-2">
                <input
                  required
                  type="text"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                  placeholder="URL..."
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <label className="bg-foreground text-background px-4 py-2.5 text-sm flex items-center justify-center cursor-pointer hover:bg-accent whitespace-nowrap shrink-0">
                  {uploadingImage ? "Uploading..." : "Upload"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange as any}
              rows={3}
              className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Additional Images (comma separated URLs)</label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Metal Qualities</label>
              <input
                type="text"
                name="metal_qualities"
                value={formData.metal_qualities}
                onChange={handleChange}
                placeholder="14K, 18K"
                className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Metal Colors</label>
              <input
                type="text"
                name="metal_colors"
                value={formData.metal_colors}
                onChange={handleChange}
                placeholder="Yellow, White"
                className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Diamond Qualities</label>
              <input
                type="text"
                name="diamond_qualities"
                value={formData.diamond_qualities}
                onChange={handleChange}
                placeholder="VS-EF, VVS-EF"
                className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
          {formData.img && (
            <div className="mt-2 text-center">
               <span className="text-xs text-muted-foreground block mb-2">Image Preview:</span>
               <img src={formData.img} alt="Preview" className="w-20 h-20 object-cover mx-auto border border-border" onError={(e: any) => e.target.style.display='none'} />
            </div>
          )}
          <div className="flex gap-4 mt-8 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 border border-border bg-background text-foreground py-3 text-xs uppercase tracking-widest hover:bg-secondary disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
