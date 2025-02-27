import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function FloatingBackButton() {
  const [location, setLocation] = useLocation();
  
  if (location === '/') return null;

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.1,
        filter: "brightness(1.2) drop-shadow(0 0 15px rgba(255, 0, 255, 0.5))"
      }}
      drag
      dragConstraints={{
        top: -300,
        left: -300,
        right: 300,
        bottom: 300,
      }}
    >
      <Button
        size="lg"
        className="
          retro-button 
          rounded-full 
          p-3 
          aspect-square 
          bg-[rgba(20,0,10,0.95)] 
          border 
          border-[rgba(255,0,150,0.3)] 
          shadow-[0_0_20px_rgba(255,0,255,0.3)]
          hover:bg-[rgba(30,0,15,0.95)]
          hover:border-[rgba(255,0,150,0.5)]
          transition-all
          duration-300
        "
        onClick={() => {
          // Add a glitch effect before navigation
          document.body.classList.add('quick-glitch');
          setTimeout(() => {
            setLocation('/');
            document.body.classList.remove('quick-glitch');
          }, 300);
        }}
      >
        <Terminal className="h-6 w-6 text-[#ff069d]" />
      </Button>
    </motion.div>
  );
}
