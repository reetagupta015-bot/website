import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Header } from "./index"; // Need to extract Header from index or copy it. Wait, I'll copy the header or just navigate without it? Let's use a simpler header or just import it. Actually, Header in index.tsx is not exported. Let me just create a standalone simplified header here for now or I can extract it later.
import { Truck, ShieldCheck, Heart, BadgeCheck, Plus, Minus, ChevronDown, MessageCircle, Video } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/contexts/CartContext";
import { DispatchButton } from "@/components/DispatchButton";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
  });

  const [activeImage, setActiveImage] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDiamond, setSelectedDiamond] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [engraving, setEngraving] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showBreakup, setShowBreakup] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen grid place-items-center"><p className="tracking-widest uppercase text-sm">Loading...</p></div>;
  }

  if (!product) {
    return <div className="min-h-screen grid place-items-center"><p>Product not found.</p></div>;
  }

  const allImages = [product.img, ...(product.images || [])].filter(Boolean);
  const metalQualities = product.metal_qualities?.length ? product.metal_qualities : ["14K", "18K"];
  const metalColors = product.metal_colors?.length ? product.metal_colors : ["Yellow Gold", "White Gold", "Rose Gold"];
  const diamondQualities = product.diamond_qualities?.length ? product.diamond_qualities : ["VS-EF", "VS-GH", "VVS-EF", "VVS-GH"];
  const sizes = ["4", "5", "6", "7", "8", "9", "10", "11", "12"];

  // Fallback defaults
  if (!selectedQuality && metalQualities.length) setSelectedQuality(metalQualities[0]);
  if (!selectedColor && metalColors.length) setSelectedColor(metalColors[0]);
  if (!selectedDiamond && diamondQualities.length) setSelectedDiamond(diamondQualities[0]);

  const { addToCart } = useCart();

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
      engraving,
    });
  };

  const getColorCode = (color: string) => {
    if (color.toLowerCase().includes("rose")) return "bg-[#e0bfa6]";
    if (color.toLowerCase().includes("white")) return "bg-[#e9eaec]";
    return "bg-[#e8c97b]"; // yellow default
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b h-16 flex items-center px-4 lg:px-8">
        <Link to="/" className="font-serif text-2xl tracking-tight">
          Sheet<span className="text-accent">.in</span>
        </Link>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12 md:grid md:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left Column: Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted border border-border rounded-lg overflow-hidden relative">
            <button className="absolute top-4 right-4 z-10"><Heart className="w-6 h-6 text-muted-foreground hover:text-red-500 transition-colors" /></button>
            <img src={allImages[activeImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          
          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 flex-shrink-0 border rounded overflow-hidden ${activeImage === idx ? 'border-foreground' : 'border-border opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="mt-8 md:mt-0 space-y-8">
          
          {/* Header & Price */}
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{product.name}</h1>
            <div className="flex items-center gap-3">
              <span className="text-xl md:text-2xl font-medium">₹{product.price.toLocaleString("en-IN")}</span>
              <span className="text-muted-foreground line-through text-sm">₹{product.mrp.toLocaleString("en-IN")}</span>
              <span className="bg-accent text-accent-foreground px-2 py-0.5 text-xs font-medium uppercase tracking-widest rounded-sm">Save ₹{(product.mrp - product.price).toLocaleString("en-IN")}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Tax included. <span className="underline cursor-pointer">Shipping</span> and discounts calculated at checkout.</p>
          </div>

          {/* Price Breakup Collapsible */}
          <div className="border border-border rounded">
            <button 
              onClick={() => setShowBreakup(!showBreakup)} 
              className="w-full flex items-center justify-between p-3 bg-secondary/30 text-sm font-medium hover:bg-secondary/50 transition-colors"
            >
              Price Breakup
              <ChevronDown className={`w-4 h-4 transition-transform ${showBreakup ? 'rotate-180' : ''}`} />
            </button>
            {showBreakup && (
              <div className="p-4 text-sm space-y-2 border-t border-border bg-background">
                <div className="flex justify-between"><span className="text-muted-foreground">Gold Value</span><span>₹{Math.round(product.price * 0.6).toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Diamond Value</span><span>₹{Math.round(product.price * 0.3).toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Making Charges</span><span>₹{Math.round(product.price * 0.07).toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">GST (3%)</span><span>₹{Math.round(product.price * 0.03).toLocaleString("en-IN")}</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-medium"><span>Total</span><span>₹{product.price.toLocaleString("en-IN")}</span></div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Metal Quality */}
            <div>
              <p className="text-sm mb-2 text-muted-foreground">Metal Quality: <span className="text-foreground font-medium">{selectedQuality}</span></p>
              <div className="flex gap-2">
                {metalQualities.map(q => (
                  <button key={q} onClick={() => setSelectedQuality(q)} className={`px-4 py-2 text-sm border ${selectedQuality === q ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:border-muted-foreground'} transition-colors`}>{q}</button>
                ))}
              </div>
            </div>

            {/* Metal Color */}
            <div>
              <p className="text-sm mb-2 text-muted-foreground">Metal Color: <span className="text-foreground font-medium">{selectedColor}</span></p>
              <div className="flex gap-3">
                {metalColors.map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)} className={`w-8 h-8 rounded-full border-2 ${selectedColor === c ? 'border-foreground p-0.5' : 'border-transparent'} transition-all`} title={c}>
                    <div className={`w-full h-full rounded-full border border-border ${getColorCode(c)}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Diamond Quality */}
            <div>
              <p className="text-sm mb-2 text-muted-foreground">Diamond Quality & Tone: <span className="text-foreground font-medium">{selectedDiamond}</span></p>
              <div className="flex flex-wrap gap-2">
                {diamondQualities.map(d => (
                  <button key={d} onClick={() => setSelectedDiamond(d)} className={`px-4 py-2 text-sm border ${selectedDiamond === d ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:border-muted-foreground'} transition-colors`}>{d}</button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-sm mb-2 text-muted-foreground">Size <span className="text-red-500">*</span></p>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full md:w-1/2 p-2.5 border border-border bg-background text-sm focus:outline-none focus:border-accent">
                <option value="" disabled>Select Size *</option>
                {sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Engraving */}
            <div>
              <p className="text-sm mb-2 text-foreground font-medium">Add Engraving</p>
              <input 
                type="text" 
                placeholder="Enter Engraving Instructions" 
                value={engraving} 
                onChange={(e) => setEngraving(e.target.value)}
                maxLength={20}
                className="w-full p-2.5 border border-border bg-background text-sm focus:outline-none focus:border-accent" 
              />
              <p className="text-xs text-muted-foreground italic mt-2 leading-relaxed">
                Max 20 characters. We suggest 15 characters or less. More characters will make the font size smaller. Engraving will appear on the side of the ring on the inside.
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border border-border py-2 text-sm hover:bg-secondary transition-colors"><Video className="w-4 h-4"/> Schedule A Video Call</button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-border py-2 text-sm hover:bg-secondary transition-colors"><MessageCircle className="w-4 h-4"/> Need Help? Chat With Us</button>
          </div>

          {/* Add to Cart Actions */}
          <div className="space-y-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Quantity</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex border border-border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-secondary"><Minus className="w-4 h-4" /></button>
                <div className="px-4 py-2 border-x border-border min-w-[3rem] text-center">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-secondary"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 border border-foreground bg-background text-foreground py-3 uppercase tracking-widest text-xs font-medium hover:bg-secondary transition-colors">
                Add To Cart
              </button>
            </div>
            <DispatchButton 
              onClick={handleAddToCart} 
              className="w-full bg-foreground text-background uppercase tracking-widest text-sm font-medium hover:opacity-95 transition-opacity" 
            />
          </div>

          {/* Badges */}
          <div className="grid grid-cols-4 gap-2 pt-8 border-t border-border text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-6 h-6 font-light" strokeWidth={1} />
              <span className="text-[10px] text-muted-foreground uppercase">Free Shipping & Returns</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BadgeCheck className="w-6 h-6 font-light" strokeWidth={1} />
              <span className="text-[10px] text-muted-foreground uppercase">Certified Jewellery</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Heart className="w-6 h-6 font-light" strokeWidth={1} />
              <span className="text-[10px] text-muted-foreground uppercase">Committed to give back</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-6 h-6 font-light" strokeWidth={1} />
              <span className="text-[10px] text-muted-foreground uppercase">Great Collection</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
             <p className="text-xs text-muted-foreground">Learn more on about our <span className="underline font-medium cursor-pointer text-foreground">Terms & Policies</span></p>
          </div>

          {/* Product Details Text */}
          <div className="pt-8 border-t border-border">
            <h3 className="font-serif text-2xl mb-4">Product Details</h3>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
              {product.description ? (
                product.description.split('\n').map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>
                  A symbol of pure elegance and enduring love, this beautiful piece celebrates the timeless beauty of simplicity. At its heart lies a magnificent lab-grown diamond — expertly cut to maximize brilliance, fire, and clarity.
                </p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
