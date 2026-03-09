/**
 * Indicador visual temporal de "guardado".
 * Solo presentacional: el padre controla cuándo mostrar (show) y el mensaje.
 */
import { m } from 'motion/react';

function SavedIndicator({ show = false, message = "✅ Cambios guardados automáticamente" }) {
  if (!show) return null;

  return (
    <m.div
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
      className="fixed top-6 right-6 z-50 px-4 py-3 bg-gradient-to-r from-emerald-400 to-green-500 dark:from-emerald-600 dark:to-green-700 text-white rounded-full text-sm font-bold shadow-2xl border border-emerald-300 dark:border-emerald-500 flex items-center gap-2 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <m.span animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
        ✨
      </m.span>
      {message}
    </m.div>
  );
}

export default SavedIndicator;
