import { m } from 'motion/react';

// Componente presentacional para el botón "Limpiar completadas"
function ClearCompletedButton({ count = 0, onClear }) {
  if (!count) return null;

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <m.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
      >
        🗑️ Limpiar {count} completada{count > 1 ? 's' : ''}
      </m.button>
    </m.div>
  );
}

export default ClearCompletedButton;
