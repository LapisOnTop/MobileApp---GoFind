import { useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import { AnimatePresence } from "framer-motion";
import PhoneFrame from "@/components/PhoneFrame";
import HeaderBar from "@/components/HeaderBar";
import CanvasEditor from "@/components/CanvasEditor";
import BottomToolbar from "@/components/BottomToolbar";
import ScanOverlay from "@/components/ScanOverlay";
import ResultsDrawer, { ProductResult } from "@/components/ResultsDrawer";
import SubscriptionPage from "@/components/SubscriptionPage";

// Mock product data for demo (fallback when no API)
const MOCK_RESULTS: ProductResult[] = [
  {
    title: "Custom Logo Print Cotton T-Shirt",
    price: "$12.99",
    source: "Amazon",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    link: "https://amazon.com",
  },
  {
    title: "Personalized Graphic Tee - Premium",
    price: "$18.50",
    source: "Etsy",
    thumbnail: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=200&h=200&fit=crop",
    link: "https://etsy.com",
  },
  {
    title: "Wholesale Custom Design Shirts Bulk",
    price: "$6.20",
    source: "Alibaba",
    thumbnail: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop",
    link: "https://alibaba.com",
  },
  {
    title: "Streetwear Logo Print Oversized Tee",
    price: "$24.99",
    source: "SHEIN",
    thumbnail: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop",
    link: "https://shein.com",
  },
  {
    title: "DTG Printed Brand Tee - Unisex",
    price: "$15.00",
    source: "Printful",
    thumbnail: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop",
    link: "https://printful.com",
  },
  {
    title: "Custom All-Over Print T-Shirt",
    price: "$22.99",
    source: "Redbubble",
    thumbnail: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&h=200&fit=crop",
    link: "https://redbubble.com",
  },
];

const Index = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [results, setResults] = useState<ProductResult[]>([]);

  const handleLookup = useCallback(async () => {
    if (!canvasRef.current || isSearching) return;

    setIsSearching(true);
    setShowResults(false);

    // Export canvas
    const _dataUrl = canvasRef.current.toDataURL({ format: "png", quality: 1 });

    // Simulate search delay (replace with real API call)
    await new Promise((resolve) => setTimeout(resolve, 2200));

    // Use mock results for demo
    setResults(MOCK_RESULTS);
    setIsSearching(false);
    setShowResults(true);
  }, [isSearching]);

  return (
    <PhoneFrame>
      <HeaderBar onLookup={handleLookup} isSearching={isSearching} />

      <div className="relative flex-1 flex flex-col overflow-hidden">
        <CanvasEditor canvasRef={canvasRef} />

        <AnimatePresence>
          {isSearching && <ScanOverlay />}
        </AnimatePresence>

        <ResultsDrawer
          open={showResults}
          onClose={() => setShowResults(false)}
          results={results}
        />

        <SubscriptionPage
          open={showSubscription}
          onClose={() => setShowSubscription(false)}
        />
      </div>

      <BottomToolbar
        canvasRef={canvasRef}
        onSubscribe={() => setShowSubscription(true)}
      />
    </PhoneFrame>
  );
};

export default Index;
