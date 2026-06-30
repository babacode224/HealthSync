"use client";

import { useState } from "react";

type Product = { id: number; name: string; brand: string; price: number; oldPrice?: number; category: string; rating: number; reviews: number; image: string; prescription: boolean; inStock: boolean; badge?: string };

const products: Product[] = [
  { id: 1, name: "Digital Blood Pressure Monitor", brand: "Omron", price: 18500, category: "Devices", rating: 4.8, reviews: 342, image: "BP", prescription: false, inStock: true, badge: "Best Seller" },
  { id: 2, name: "Vitamin D3 5000 IU (120 caps)", brand: "Nature's Bounty", price: 8200, oldPrice: 9500, category: "Supplements", rating: 4.7, reviews: 218, image: "VD", prescription: false, inStock: true, badge: "Sale" },
  { id: 3, name: "Metformin 500mg (30 tablets)", brand: "Glucophage", price: 3500, category: "Medications", rating: 4.9, reviews: 156, image: "MF", prescription: true, inStock: true },
  { id: 4, name: "Pulse Oximeter Fingertip", brand: "Beurer", price: 12000, category: "Devices", rating: 4.6, reviews: 189, image: "PO", prescription: false, inStock: true },
  { id: 5, name: "Omega-3 Fish Oil 1000mg", brand: "Solgar", price: 6800, category: "Supplements", rating: 4.5, reviews: 127, image: "OM", prescription: false, inStock: true },
  { id: 6, name: "Lisinopril 10mg (30 tablets)", brand: "Zestril", price: 4200, category: "Medications", rating: 4.8, reviews: 93, image: "LS", prescription: true, inStock: true },
  { id: 7, name: "Infrared Thermometer", brand: "Braun", price: 15000, oldPrice: 18000, category: "Devices", rating: 4.7, reviews: 264, image: "IT", prescription: false, inStock: true, badge: "Sale" },
  { id: 8, name: "Multivitamin Complete (90 tabs)", brand: "Centrum", price: 7500, category: "Supplements", rating: 4.4, reviews: 301, image: "MV", prescription: false, inStock: true },
  { id: 9, name: "Amoxicillin 500mg (21 caps)", brand: "Amoxil", price: 2800, category: "Medications", rating: 4.7, reviews: 78, image: "AX", prescription: true, inStock: false },
  { id: 10, name: "First Aid Kit (Complete)", brand: "HealthPlus", price: 9500, category: "Wellness", rating: 4.9, reviews: 412, image: "FA", prescription: false, inStock: true, badge: "Best Seller" },
  { id: 11, name: "Zinc + Vitamin C Lozenges", brand: "Nature Made", price: 3200, category: "Supplements", rating: 4.3, reviews: 167, image: "ZC", prescription: false, inStock: true },
  { id: 12, name: "Blood Glucose Test Strips (50)", brand: "Accu-Chek", price: 11000, category: "Devices", rating: 4.6, reviews: 198, image: "GS", prescription: false, inStock: true },
];

const categories = ["All", "Devices", "Supplements", "Medications", "Wellness"];

type CartItem = { product: Product; qty: number };
type View = "shop" | "cart" | "checkout" | "success";

const imgColors: Record<string, string> = {
  BP: "bg-primary", VD: "bg-secondary", MF: "bg-tertiary", PO: "bg-primary",
  OM: "bg-secondary", LS: "bg-tertiary", IT: "bg-primary", MV: "bg-secondary",
  AX: "bg-tertiary", FA: "bg-primary", ZC: "bg-secondary", GS: "bg-tertiary",
};

export default function MarketplacePage() {
  const [view, setView] = useState<View>("shop");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sortBy, setSortBy] = useState("popular");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((i) => i.product.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter((i) => i.qty > 0));
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filtered = products
    .filter((p) => (category === "All" || p.category === category) && (p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => sortBy === "price-low" ? a.price - b.price : sortBy === "price-high" ? b.price - a.price : b.reviews - a.reviews);

  if (view === "success") {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-on-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Order Placed!</h2>
        <p className="text-sm text-on-surface-variant mb-2">Your order <strong>#HS-78432</strong> has been confirmed.</p>
        <p className="text-xs text-on-surface-variant mb-6">Estimated delivery: 2-3 business days. Prescription items will be verified by our pharmacy team.</p>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 text-left mb-6">
          <h3 className="text-sm font-bold text-on-surface mb-3">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm py-1.5 border-b border-outline-variant last:border-0">
              <span className="text-on-surface-variant">{item.product.name} x{item.qty}</span>
              <span className="font-medium text-on-surface">₦{(item.product.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-bold text-on-surface pt-3 mt-2 border-t border-outline-variant">
            <span>Total</span>
            <span>₦{cartTotal.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <button onClick={() => { setCart([]); setView("shop"); }} className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:opacity-90 transition-all">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (view === "checkout") {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => setView("cart")} className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          Back to Cart
        </button>
        <h2 className="text-xl font-bold text-on-surface">Checkout</h2>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            {/* Delivery */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
              <h3 className="text-sm font-bold text-on-surface mb-4">Delivery Address</h3>
              <div className="space-y-3">
                <input placeholder="Full Name" className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                <input placeholder="Phone Number" className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                <input placeholder="Street Address" className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="City" className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                  <input placeholder="State" className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
              <h3 className="text-sm font-bold text-on-surface mb-4">Payment Method</h3>
              <div className="space-y-2">
                {[
                  { label: "Pay with Paystack", sub: "Card, Bank Transfer, USSD", icon: "💳" },
                  { label: "Pay on Delivery", sub: "Cash or POS at your doorstep", icon: "🚚" },
                  { label: "Health Wallet", sub: "Balance: ₦45,200", icon: "👛" },
                ].map((method, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant hover:border-primary cursor-pointer transition-all has-[:checked]:border-primary has-[:checked]:bg-primary-fixed/30">
                    <input type="radio" name="payment" defaultChecked={i === 0} className="w-4 h-4 accent-[var(--color-primary)]" />
                    <span className="text-lg">{method.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-on-surface">{method.label}</div>
                      <div className="text-xs text-on-surface-variant">{method.sub}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {cart.some((i) => i.product.prescription) && (
              <div className="flex items-start gap-3 bg-tertiary-fixed/30 border border-tertiary-fixed-dim/30 rounded-lg p-4">
                <svg className="w-5 h-5 text-tertiary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <strong className="text-tertiary">Prescription Required:</strong> Some items in your cart require a valid prescription. Our pharmacy team will verify your prescription before dispatching these items.
                </p>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 sticky top-24">
              <h3 className="text-sm font-bold text-on-surface mb-3">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-xs py-1.5">
                    <span className="text-on-surface-variant truncate mr-2">{item.product.name} x{item.qty}</span>
                    <span className="font-medium text-on-surface whitespace-nowrap">₦{(item.product.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-outline-variant pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-on-surface-variant">Subtotal</span><span className="text-on-surface">₦{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Delivery</span><span className="text-secondary font-medium">Free</span></div>
                <div className="flex justify-between font-bold text-on-surface pt-2 border-t border-outline-variant"><span>Total</span><span>₦{cartTotal.toLocaleString()}</span></div>
              </div>
              <button onClick={() => setView("success")} className="w-full mt-4 py-3 rounded-lg bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                Place Order • ₦{cartTotal.toLocaleString()}
              </button>
              <p className="text-[10px] text-outline text-center mt-2">Secured by Paystack • 256-bit SSL encryption</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "cart") {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => setView("shop")} className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          Continue Shopping
        </button>
        <h2 className="text-xl font-bold text-on-surface">Your Cart ({cartCount} items)</h2>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
            </div>
            <h3 className="text-sm font-bold text-on-surface mb-1">Your cart is empty</h3>
            <p className="text-xs text-on-surface-variant mb-4">Browse the marketplace to add health products.</p>
            <button onClick={() => setView("shop")} className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:opacity-90 transition-all">Browse Products</button>
          </div>
        ) : (
          <>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              {cart.map((item, i) => (
                <div key={item.product.id} className={`flex items-center gap-4 p-4 ${i < cart.length - 1 ? "border-b border-outline-variant" : ""}`}>
                  <div className={`w-14 h-14 rounded-xl ${imgColors[item.product.image]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {item.product.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-on-surface truncate">{item.product.name}</h3>
                    <p className="text-xs text-on-surface-variant">{item.product.brand}</p>
                    {item.product.prescription && (
                      <span className="text-[10px] font-semibold text-tertiary bg-tertiary-fixed/30 px-2 py-0.5 rounded-full mt-1 inline-block">Rx Required</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => updateQty(item.product.id, -1)} className="w-8 h-8 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
                    </button>
                    <span className="text-sm font-bold text-on-surface w-6 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.product.id, 1)} className="w-8 h-8 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    </button>
                  </div>
                  <div className="text-right shrink-0 w-24">
                    <div className="text-sm font-bold text-on-surface">₦{(item.product.price * item.qty).toLocaleString()}</div>
                    <div className="text-[10px] text-on-surface-variant">₦{item.product.price.toLocaleString()} each</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
              <div className="flex justify-between text-sm mb-2"><span className="text-on-surface-variant">Subtotal ({cartCount} items)</span><span className="text-on-surface">₦{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm mb-3"><span className="text-on-surface-variant">Delivery</span><span className="text-secondary font-medium">Free</span></div>
              <div className="flex justify-between text-lg font-bold text-on-surface pt-3 border-t border-outline-variant"><span>Total</span><span>₦{cartTotal.toLocaleString()}</span></div>
              <button onClick={() => setView("checkout")} className="w-full mt-4 py-3 rounded-lg bg-primary text-on-primary text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-sm">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Shop view
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Health Marketplace</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Verified health products delivered to your door.</p>
        </div>
        <button onClick={() => setView("cart")} className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm font-semibold text-on-surface hover:border-primary transition-all self-start">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
          Cart
          {cartCount > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">{cartCount}</span>}
        </button>
      </div>

      {/* Search + sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products, brands..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${category === cat ? "bg-primary text-on-primary border-primary" : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <div key={product.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
            <div className={`h-36 ${imgColors[product.image]} flex items-center justify-center relative`}>
              <span className="text-white/80 text-3xl font-bold">{product.image}</span>
              {product.badge && (
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${product.badge === "Sale" ? "bg-error text-on-error" : "bg-secondary text-on-secondary"}`}>
                  {product.badge}
                </span>
              )}
              {product.prescription && (
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-tertiary text-on-tertiary">Rx</span>
              )}
            </div>
            <div className="p-4">
              <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">{product.brand}</p>
              <h3 className="text-sm font-semibold text-on-surface mt-0.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="flex items-center gap-0.5 text-xs font-semibold text-tertiary">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  {product.rating}
                </span>
                <span className="text-[10px] text-on-surface-variant">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <span className="text-base font-bold text-on-surface">₦{product.price.toLocaleString()}</span>
                  {product.oldPrice && <span className="text-xs text-outline line-through ml-1.5">₦{product.oldPrice.toLocaleString()}</span>}
                </div>
              </div>
              <button
                onClick={() => product.inStock && addToCart(product)}
                disabled={!product.inStock}
                className={`w-full mt-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  !product.inStock
                    ? "bg-surface-container-high text-outline cursor-not-allowed"
                    : cart.some((i) => i.product.id === product.id)
                      ? "bg-secondary text-on-secondary"
                      : "bg-primary text-on-primary hover:opacity-90 active:scale-[0.98]"
                }`}
              >
                {!product.inStock ? "Out of Stock" : cart.some((i) => i.product.id === product.id) ? "Added to Cart ✓" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-on-surface-variant">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}
