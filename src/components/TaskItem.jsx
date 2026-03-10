import { memo, useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

function TaskItem({ task, onRemoveTask, onToggleTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      onEditTask(task.id, editText.trim());
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  // 🆕 Añadidos colores para modo oscuro (dark:bg-... dark:border-...)
  const priorityStyles = {
    baja: "border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
    media: "border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20",
    alta: "border-l-4 border-rose-500 bg-rose-50 dark:bg-rose-900/20",
  };

  const priorityIcons = { baja: "🟢", media: "🟡", alta: "🔴" };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return new Intl.DateTimeFormat('es-ES', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    }).format(date);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`rounded-xl shadow-sm p-4 flex items-center gap-3 transition-colors ${priorityStyles[task.priority]} dark:border-y-0 dark:border-r-0`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
        aria-label={`Marcar ${task.text} como completada`}
        className="w-5 h-5 text-indigo-600 rounded cursor-pointer focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
      />

      <span className="text-xs select-none">{priorityIcons[task.priority]}</span>

      {isEditing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="flex-1 px-2 py-1 text-sm border-b-2 border-indigo-500 focus:outline-none bg-transparent dark:text-white"
        />
      ) : (
        <div className="flex-1">
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`block cursor-text transition-all ${
                task.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-100"
            }`}
            title="Doble clic para editar"
          >
            {task.text}
          </span>
          {task.dueDate && (
            <span className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
              isOverdue 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-semibold' 
                : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
            }`}>
              📅 {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      )}

      <span
        className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-bold select-none shadow-sm ${
          task.priority === "alta"
            ? "bg-rose-200 text-rose-800 dark:bg-rose-800 dark:text-rose-100"
            : task.priority === "media"
              ? "bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-100"
              : "bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100"
        }`}
      >
        {task.priority}
      </span>

      {!isEditing && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsEditing(true)}
          aria-label="Editar tarea"
          className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-full transition-colors"
          title="Editar tarea"
        >
          ✏️
        </motion.button>
      )}

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onRemoveTask(task.id)}
        aria-label="Eliminar tarea"
        className="p-2 text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-full transition-colors"
        title="Eliminar tarea"
      >
        🗑️
      </motion.button>
    </motion.div>
  );
}

export default memo(TaskItem);