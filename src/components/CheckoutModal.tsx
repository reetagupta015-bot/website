import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";

export function CheckoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { session } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"address" | "payment">("address");

  const [formData, setFormData] = useState({
    name: "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "Cash on Delivery",
  });

  // Reset step to address and prefill email when opened
  useEffect(() => {
    if (isOpen) {
      setStep("address");
      if (session?.user?.email) {
        setFormData((prev) => ({ ...prev, email: session.user.email || "" }));
      }
    }
  }, [isOpen, session]);

  // Load profile data
  useEffect(() => {
    if (isOpen && session?.user?.id) {
      supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setFormData((prev) => ({
              ...prev,
              name: data.full_name || prev.name,
              phone: data.phone || prev.phone,
              address: data.address || prev.address,
              city: data.city || prev.city,
              state: data.state || prev.state,
              pincode: data.pincode || prev.pincode,
            }));
          }
        });
    }
  }, [isOpen, session]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateAddressStep = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter your shipping address");
      return false;
    }
    if (!formData.city.trim()) {
      toast.error("Please enter your city");
      return false;
    }
    if (!formData.state.trim()) {
      toast.error("Please enter your state");
      return false;
    }
    if (!formData.pincode.trim()) {
      toast.error("Please enter your pincode");
      return false;
    }
    return true;
  };

  const handleContinueToPayment = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateAddressStep()) {
      setStep("payment");
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
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
    if (!validateAddressStep()) {
      setStep("address");
      return;
    }

    setLoading(true);
    try {
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
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
          pincode: formData.pincode,
        },
        items: cart,
        total_amount: cartTotal,
        payment_method: formData.paymentMethod,
        status: "Pending",
      };

      const { error } = await supabase.from("orders").insert([orderData]);
      if (error) throw error;

      // Send Admin Email Notification (Placeholder)
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
    } catch (error: any) {
      toast.error("Checkout failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col relative">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <div className="p-6 md:p-8 border-b">
          <h2 className="font-serif text-2xl font-semibold">Secure Checkout</h2>
          <p className="text-sm text-muted-foreground mt-1">Complete your purchase in two simple steps</p>
        </div>
        
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {/* Step Indicator */}
          <div className="flex items-center gap-6 mb-8 border-b border-border/60 pb-4">
            <button
              type="button"
              onClick={() => {
                if (step === "payment") setStep("address");
              }}
              disabled={step === "address"}
              className={`flex items-center gap-2 text-xs uppercase tracking-widest font-semibold transition-colors ${
                step === "address" ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                step === "address" ? "bg-accent text-accent-foreground border-accent" : "border-muted-foreground"
              }`}>1</span>
              Address Details
            </button>
            <span className="text-muted-foreground/40 text-sm">→</span>
            <div
              className={`flex items-center gap-2 text-xs uppercase tracking-widest font-semibold ${
                step === "payment" ? "text-accent" : "text-muted-foreground"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                step === "payment" ? "bg-accent text-accent-foreground border-accent" : "border-muted-foreground"
              }`}>2</span>
              Payment Option
            </div>
          </div>

          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
            {step === "address" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground border-b pb-2">Contact Info</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Full Name</label>
                      <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Email Address</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Phone Number</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground border-b pb-2">Shipping Address</h3>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Street Address</label>
                    <input required name="address" value={formData.address} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">City</label>
                      <input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">State</label>
                      <input required name="state" value={formData.state} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Pincode</label>
                      <input required name="pincode" value={formData.pincode} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground border-b pb-2">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-start gap-4 p-4 border border-border bg-background hover:bg-secondary/20 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash on Delivery"
                        checked={formData.paymentMethod === "Cash on Delivery"}
                        onChange={handleChange}
                        className="mt-1 accent-accent"
                      />
                      <div>
                        <p className="text-sm font-semibold">Cash on Delivery (COD)</p>
                        <p className="text-xs text-muted-foreground mt-1">Pay with cash when your package is delivered to your door.</p>
                      </div>
                    </label>
                    
                    <label className="flex items-start gap-4 p-4 border border-border bg-background hover:bg-secondary/20 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={formData.paymentMethod === "UPI"}
                        onChange={handleChange}
                        className="mt-1 accent-accent"
                      />
                      <div>
                        <p className="text-sm font-semibold">UPI / Online Payment</p>
                        <p className="text-xs text-muted-foreground mt-1">Pay securely via Google Pay, PhonePe, Paytm, or net banking.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-4 p-4 border border-border bg-background hover:bg-secondary/20 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Credit Card"
                        checked={formData.paymentMethod === "Credit Card"}
                        onChange={handleChange}
                        className="mt-1 accent-accent"
                      />
                      <div>
                        <p className="text-sm font-semibold">Credit / Debit Card</p>
                        <p className="text-xs text-muted-foreground mt-1">Accepting Visa, Mastercard, RuPay, and American Express.</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        
        <div className="p-6 md:p-8 border-t bg-secondary/10">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm uppercase tracking-widest font-semibold">Total Amount</span>
            <span className="font-serif text-2xl font-semibold">₹{cartTotal.toLocaleString("en-IN")}</span>
          </div>
          {step === "address" ? (
            <button
              type="button"
              onClick={handleContinueToPayment}
              className="w-full bg-foreground text-background py-4 text-xs uppercase tracking-widest font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Continue to Payment
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep("address")}
                className="w-1/3 border border-border bg-background text-foreground py-4 text-xs uppercase tracking-widest font-semibold hover:bg-secondary transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="flex-1 bg-foreground text-background py-4 text-xs uppercase tracking-widest font-semibold hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
