import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import hero from "@/assets/hero.jpg";
import catRings from "@/assets/cat-rings.jpg";
import catEarrings from "@/assets/cat-earrings.jpg";
import catPendants from "@/assets/cat-pendants.jpg";
import catBracelets from "@/assets/cat-bracelets.jpg";
import catNecklace from "@/assets/cat-necklace.jpg";
import catBangles from "@/assets/cat-bangles.jpg";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";
import { Search, User, ShoppingBag, Menu, Truck, RotateCcw, ShieldCheck, BadgeCheck } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { X, Plus, Minus } from "lucide-react";
import { CheckoutModal } from "@/components/CheckoutModal";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sheet.in — Lab-Grown Diamond Jewellery" },
      { name: "description", content: "Shop exquisite lab-grown diamond rings, earrings, pendants, bracelets and necklaces at Sheet.in. Certified, sustainable, beautifully crafted." },
      { property: "og:title", content: "Sheet.in — Lab-Grown Diamond Jewellery" },
      { property: "og:description", content: "Certified lab-grown diamond jewellery, crafted to shine." },
    ],
  }),
  component: Index,
});

const shapes = [
  "Round", "Oval", "Cushion", "Emerald", "Pear",
  "Heart", "Radiant", "Princess", "Marquise", "Asscher",
];

const categories = [
  { name: "Rings", desc: "Solitaires, halos and cocktail styles for every moment.", img: catRings },
  { name: "Earrings", desc: "From classic studs to graceful dangles.", img: catEarrings },
  { name: "Pendants", desc: "Everyday pieces that complement your style.", img: catPendants },
  { name: "Bracelets", desc: "Modern elegance crafted to shine.", img: catBracelets },
  { name: "Necklace", desc: "Statement pieces of pure sophistication.", img: catNecklace },
  { name: "Bangles", desc: "Tradition and brilliance, beautifully entwined.", img: catBangles },
];

const collections = [
  { name: "Everyday Romance", img: catRings },
  { name: "Wedding Season Ready", img: catNecklace },
  { name: "Rings That Say Yes", img: prod1 },
  { name: "The Gentleman's Edit", img: catBracelets },
];

function ShapeIcon({ name }: { name: string }) {
  const common = "stroke-foreground fill-none";
  const map: Record<string, ReactNode> = {
    Round: <circle cx="20" cy="20" r="13" className={common} strokeWidth="1.2" />,
    Oval: <ellipse cx="20" cy="20" rx="10" ry="14" className={common} strokeWidth="1.2" />,
    Cushion: <rect x="7" y="7" width="26" height="26" rx="7" className={common} strokeWidth="1.2" />,
    Emerald: <rect x="9" y="6" width="22" height="28" className={common} strokeWidth="1.2" />,
    Pear: <path d="M20 6 C12 14 12 24 20 34 C28 24 28 14 20 6 Z" className={common} strokeWidth="1.2" />,
    Heart: <path d="M20 33 C8 24 8 13 14 11 C17.5 10 19 12 20 14 C21 12 22.5 10 26 11 C32 13 32 24 20 33 Z" className={common} strokeWidth="1.2" />,
    Radiant: <polygon points="13,6 27,6 33,12 33,28 27,34 13,34 7,28 7,12" className={common} strokeWidth="1.2" />,
    Princess: <rect x="8" y="8" width="24" height="24" className={common} strokeWidth="1.2" />,
    Marquise: <path d="M20 6 C8 20 8 20 20 34 C32 20 32 20 20 6 Z" className={common} strokeWidth="1.2" />,
    Asscher: <g className={common} strokeWidth="1.2"><rect x="9" y="9" width="22" height="22" /><rect x="13" y="13" width="14" height="14" /></g>,
  };
  return (
    <svg viewBox="0 0 40 40" className="h-12 w-12">
      {map[name]}
    </svg>
  );
}

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { data: searchResults, isLoading: searching } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${searchQuery}%`)
        .limit(5);
      if (error) throw error;
      return data;
    },
    enabled: searchQuery.length > 0,
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    setOpen(false);
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
      <div className="bg-foreground text-background text-center text-xs py-2 tracking-wider uppercase">
        20% off on diamonds &nbsp;+&nbsp; 50% off on making charges
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-8 flex items-center justify-between h-16">
        <button className="lg:hidden p-2"><Menu className="h-5 w-5" /></button>
        <Link to="/" className="font-serif text-3xl tracking-tight">
          Sheet<span className="text-accent">.in</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-wider">
          <a href="/#new" className="hover:text-accent">New</a>
          <a href="/#categories" className="hover:text-accent">Rings</a>
          <a href="/#categories" className="hover:text-accent">Earrings</a>
          <a href="/#categories" className="hover:text-accent">Necklace</a>
          <a href="/#categories" className="hover:text-accent">Bracelets</a>
          <a href="/#categories" className="hover:text-accent">Pendants</a>
          <a href="/#about" className="hover:text-accent">About</a>
        </nav>
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Search"><Search className="h-5 w-5 hover:text-accent transition-colors" /></button>
            </SheetTrigger>
            <SheetContent side="top" className="pt-16 pb-8">
              <SheetHeader>
                <SheetTitle className="sr-only">Search Products</SheetTitle>
              </SheetHeader>
              <div className="max-w-2xl mx-auto space-y-8">
                <input
                  type="text"
                  placeholder="Search for rings, earrings, pendants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-2xl md:text-4xl font-serif bg-transparent border-b-2 border-foreground/20 focus:border-foreground outline-none pb-4 transition-colors"
                  autoFocus
                />
                {searching && <p className="text-sm text-muted-foreground uppercase tracking-widest">Searching...</p>}
                {!searching && searchResults && searchResults.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {searchResults.map((product) => (
                      <Link key={product.id} to="/product/$id" params={{ id: product.id }} className="group block space-y-2">
                        <div className="aspect-square bg-muted overflow-hidden">
                          <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">₹{product.price?.toLocaleString("en-IN")}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {!searching && searchQuery && searchResults?.length === 0 && (
                  <p className="text-muted-foreground text-center py-8 uppercase tracking-widest text-sm">No results found for "{searchQuery}"</p>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {user ? (
            <div className="relative">
              <button
                aria-label="Account"
                onClick={() => setOpen((v) => !v)}
                className="h-8 w-8 rounded-full bg-accent text-accent-foreground grid place-items-center text-xs font-medium uppercase hover:opacity-90 transition-opacity"
              >
                {(user.user_metadata?.full_name || user.email || "?").charAt(0)}
              </button>
              {open && (
                <div className="absolute right-0 top-10 w-56 bg-card border border-border shadow-lg py-2 text-sm">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="font-medium truncate">{user.user_metadata?.full_name || "Account"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  {user.email === 'admin@admin.com' && (
                    <Link to="/admin" className="w-full block text-left px-4 py-2 hover:bg-secondary">Admin Dashboard</Link>
                  )}
                  <button className="w-full text-left px-4 py-2 hover:bg-secondary">My Orders</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-secondary">Wishlist</button>
                  <button onClick={signOut} className="w-full text-left px-4 py-2 hover:bg-secondary text-destructive">Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" aria-label="Sign in" className="hidden sm:flex items-center gap-1.5 text-sm hover:text-accent">
              <User className="h-5 w-5" />
              <span className="hidden md:inline">Sign In</span>
            </Link>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Cart" className="relative group">
                <ShoppingBag className="h-5 w-5 group-hover:text-accent transition-colors" />
                <span className="absolute -right-2 -top-2 bg-accent text-accent-foreground text-[10px] rounded-full h-4 w-4 grid place-items-center font-medium">
                  {cartCount}
                </span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="font-serif text-2xl">Shopping Cart ({cartCount})</SheetTitle>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                    <ShoppingBag className="h-12 w-12 opacity-20" />
                    <p className="uppercase tracking-widest text-sm">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-6 last:border-0 last:pb-0">
                      <div className="w-24 h-24 bg-muted overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm font-medium">₹{item.price.toLocaleString("en-IN")}</p>
                        
                        <div className="text-xs text-muted-foreground space-y-0.5 pt-1">
                          {item.metalColor && <span>{item.metalColor}</span>}
                          {item.metalQuality && <span> • {item.metalQuality}</span>}
                          {item.diamondQuality && <span> • {item.diamondQuality}</span>}
                          {item.size && <div>Size: {item.size}</div>}
                          {item.engraving && <div className="truncate">Engraving: "{item.engraving}"</div>}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex items-center border border-border">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                            <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-6 bg-secondary/20 space-y-4">
                  <div className="flex justify-between items-center font-medium">
                    <span className="uppercase tracking-widest text-sm">Subtotal</span>
                    <span className="text-lg">₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Shipping & taxes calculated at checkout</p>
                  <button onClick={() => setIsCheckoutOpen(true)} className="w-full bg-foreground text-background py-4 uppercase tracking-widest text-sm font-medium hover:opacity-90 transition-opacity">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </SheetContent>
          </Sheet>

          <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

        </div>
      </div>
    </header>
  );
}

function Index() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative">
        <img src={hero} alt="Lab-grown diamond necklace and bracelet" width={1920} height={1080} className="w-full h-[60vh] md:h-[80vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-10 md:bottom-16 text-center text-background px-4">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 opacity-90">New Collection</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl">Brilliance, Reimagined.</h1>
          <p className="mt-3 text-sm md:text-base opacity-90 max-w-xl mx-auto">Certified lab-grown diamonds, ethically crafted into timeless jewellery.</p>
          <a href="#categories" className="inline-block mt-6 bg-background text-foreground px-8 py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors">
            Shop the Edit
          </a>
        </div>
      </section>

      {/* Shop by Shape */}
      <section id="new" className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-serif text-3xl md:text-4xl mb-12">Shop By Shape</h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-6">
            {shapes.map((s) => (
              <a href="#" key={s} className="group flex flex-col items-center gap-2">
                <div className="h-20 w-20 rounded-full border border-border grid place-items-center bg-card group-hover:border-accent transition-colors">
                  <ShapeIcon name={s} />
                </div>
                <span className="text-xs tracking-wide">{s}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section id="categories" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-serif text-3xl md:text-4xl mb-12">Shop By Category</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((c) => (
              <a href="#" key={c.name} className="group relative overflow-hidden block aspect-[4/5] bg-muted">
                <img src={c.img} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 text-background">
                  <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-wide">{c.name}</h3>
                  <p className="text-xs md:text-sm opacity-90 mt-1 hidden md:block">{c.desc}</p>
                  <span className="inline-block mt-3 text-xs uppercase tracking-widest border-b border-background pb-0.5">Explore</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Promo strip */}
      <section className="bg-foreground text-background py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Limited Time</p>
          <h2 className="font-serif text-3xl md:text-5xl">Up to 50% off on Making Charges</h2>
          <p className="mt-3 text-sm opacity-80">On every certified lab-grown diamond piece, this season.</p>
          <a href="#bestsellers" className="inline-block mt-6 bg-accent text-accent-foreground px-8 py-3 text-xs uppercase tracking-widest hover:opacity-90">Shop Now</a>
        </div>
      </section>

      {/* Explore Collections */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-serif text-3xl md:text-4xl mb-12">Explore Collections</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {collections.map((c) => (
              <a key={c.name} href="#" className="group block">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="mt-3 text-center text-sm uppercase tracking-widest">{c.name}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y bg-secondary/30 py-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: RotateCcw, label: "Free 14-Day Returns" },
            { icon: Truck, label: "Free Shipping Both Ways" },
            { icon: ShieldCheck, label: "Assured Buy-Back" },
            { icon: BadgeCheck, label: "Certified Jewellery" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className="h-7 w-7 text-accent" />
              <span className="text-xs uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section id="bestsellers" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-serif text-3xl md:text-4xl mb-12">Best Sellers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products?.map((p: any) => (
              <Link key={p.id || p.name} to="/product/$id" params={{ id: p.id }} className="group block">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 bg-background text-foreground text-[10px] uppercase tracking-widest px-2 py-1">{p.off}% off</span>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-sm font-medium">{p.name}</h3>
                  <div className="mt-1 flex items-center justify-center gap-2 text-sm">
                    <span className="font-medium">₹{p.price?.toLocaleString("en-IN")}</span>
                    <span className="text-muted-foreground line-through text-xs">₹{p.mrp?.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#e0bfa6] border border-border" title="Rose Gold" />
                    <span className="h-3 w-3 rounded-full bg-[#e8c97b] border border-border" title="Yellow Gold" />
                    <span className="h-3 w-3 rounded-full bg-[#e9eaec] border border-border" title="White Gold" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About / Newsletter */}
      <section id="about" className="bg-secondary/40 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">A New Standard of Brilliance</h2>
          <p className="mt-4 text-muted-foreground">
            At Sheet.in, every diamond is grown with care — chemically, physically and optically identical to mined diamonds, without the environmental cost. Crafted into jewellery you'll wear for a lifetime.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="Your email address" className="flex-1 bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent" />
            <button className="bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 grid md:grid-cols-4 gap-10">
          <div>
            <p className="font-serif text-2xl">Sheet<span className="text-accent">.in</span></p>
            <p className="mt-3 text-sm opacity-70">Lab-grown diamond jewellery, crafted with intent.</p>
          </div>
          {[
            { title: "Shop", items: ["Rings", "Earrings", "Necklace", "Bracelets", "Pendants"] },
            { title: "Support", items: ["Contact", "Shipping", "Returns", "Care Guide", "FAQ"] },
            { title: "Company", items: ["About", "Sustainability", "Certifications", "Stores", "Press"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-widest mb-4 text-accent">{col.title}</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {col.items.map((i) => <li key={i}><a href="#" className="hover:opacity-100 hover:text-accent">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-4 lg:px-8 mt-12 pt-6 border-t border-background/10 text-xs opacity-60 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Sheet.in — All rights reserved.</span>
          <span>Made with care in India.</span>
        </div>
      </footer>
    </div>
  );
}
