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
    <m.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      onClick={handleClick}
      className="w-full px-4 py-3 text-sm font-bold bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white rounded-xl shadow-lg transition-all hover:shadow-xl active:shadow-md"
    >
      {label}
    </m.button>
  );
}

export default ResetAppButton;
