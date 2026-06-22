import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "./index";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [{ title: "My Orders — Sheet.in" }],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const { session, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !session) {
      navigate({ to: "/login" });
    }
  }, [session, authLoading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.id) return;
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });
          
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
    return <div className="min-h-screen grid place-items-center"><p className="text-muted-foreground uppercase tracking-widest text-sm">Loading Orders...</p></div>;
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8 border-b pb-4 flex justify-between items-end">
          <div>
            <h1 className="font-serif text-3xl">My Orders</h1>
            <p className="text-sm text-muted-foreground mt-2">View your past purchases and their status</p>
          </div>
          <button onClick={() => navigate({ to: "/profile" })} className="text-xs uppercase tracking-widest hover:text-accent">
            Back to Profile
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-card border border-border p-12 text-center">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
            <button onClick={() => navigate({ to: "/" })} className="mt-4 bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent transition-colors">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-card border border-border overflow-hidden">
                <div className="bg-secondary/50 border-b border-border p-4 md:p-6 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Order Placed</p>
                      <p className="text-sm font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Total Amount</p>
                      <p className="text-sm font-medium">₹{order.total_amount?.toLocaleString("en-IN")}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Order ID</p>
                      <p className="text-sm font-medium font-mono">{order.id}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1.5 text-xs font-medium uppercase tracking-widest border ${
                      order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                      order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                      order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  <div className="space-y-6">
                    {order.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-20 h-20 bg-muted overflow-hidden shrink-0">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.metalColor} {item.metalQuality && `• ${item.metalQuality}`} {item.diamondQuality && `• ${item.diamondQuality}`}
                          </p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-sm font-medium">₹{item.price?.toLocaleString("en-IN")}</span>
                            <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
