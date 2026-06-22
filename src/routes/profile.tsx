import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "./index";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MapPin, User as UserIcon, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "My Profile — Sheet.in" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (!isLoading && !session) {
      navigate({ to: "/login" });
    }
  }, [session, isLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
        
      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
        });
      }
    };
    
    if (session) fetchProfile();
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id);
        
      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error("Error updating profile: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !session) {
    return <div className="min-h-screen grid place-items-center"><p className="tracking-widest uppercase text-sm">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 border-b pb-4 flex justify-between items-end">
          <div>
            <h1 className="font-serif text-3xl">My Account</h1>
            <p className="text-sm text-muted-foreground mt-2">Manage your personal information and addresses</p>
          </div>
          <button onClick={() => navigate({ to: "/orders" })} className="text-xs uppercase tracking-widest hover:text-accent">
            View Order History
          </button>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12">
          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border p-6 rounded-lg">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground text-xl">
                {profile?.full_name?.charAt(0)?.toUpperCase() || <UserIcon />}
              </div>
              <h2 className="font-medium">{profile?.full_name || "Customer"}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Mail className="w-4 h-4" /> {session.user.email}
              </div>
              {profile?.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Phone className="w-4 h-4" /> {profile.phone}
                </div>
              )}
            </div>
          </div>

          {/* Edit Form */}
          <div className="bg-card border border-border p-8 rounded-lg">
            <h3 className="uppercase tracking-widest text-sm font-medium border-b pb-4 mb-6">Profile Details</h3>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Full Name</label>
                  <input name="full_name" value={formData.full_name} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Phone Number</label>
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
                </div>
              </div>

              <h3 className="uppercase tracking-widest text-sm font-medium border-b pb-4 mb-6 mt-8">Shipping Address</h3>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Street Address</label>
                <input name="address" value={formData.address} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">City</label>
                  <input name="city" value={formData.city} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">State</label>
                  <input name="state" value={formData.state} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Pincode</label>
                  <input name="pincode" value={formData.pincode} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
                </div>
              </div>

              <div className="pt-4">
                <button disabled={saving} type="submit" className="bg-foreground text-background px-8 py-3 text-xs uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
