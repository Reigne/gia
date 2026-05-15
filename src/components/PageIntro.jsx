import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function PageIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#111110',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        >
          {/* bottom shadow that the logo rises through */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '70%',
              background: 'linear-gradient(to top, #111110 0%, #111110 30%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          <motion.img
            src="/logo2.png"
            alt="Gia"
            style={{ height: 64, width: 'auto', borderRadius: 14, position: 'relative', zIndex: 2 }}
            initial={{ opacity: 0, y: 280 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
