/**
 * Botón para resetear la aplicación (borrar todas las tareas de localStorage).
 * Pide confirmación antes de llamar a onReset.
 */
import { m } from 'motion/react';

function ResetAppButton({
  onReset,
  confirmMessage = "⚠️ ¿Seguro que quieres eliminar todas las tareas? Esta acción no se puede deshacer.",
  label = "🗑️ Resetear aplicación",
}) {
  const handleClick = () => {
    if (window.confirm(confirmMessage)) {
      onReset();
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <m.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={handleClick}
        className="w-full px-4 py-3 text-sm font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 underline transition-colors hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg"
      >
        {label}
      </m.button>
    </m.div>
  );
}

export default ResetAppButton;
