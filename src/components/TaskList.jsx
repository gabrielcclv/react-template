import TaskItem from "./TaskItem";
import { AnimatePresence, m } from "motion/react";

function TaskList({ tasks, onRemoveTask, onToggleTask, onEditTask, searchTerm }) {
  // 🆕 Mejora: Estado vacío inteligente
  if (tasks.length === 0) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center py-16"
      >
        <p className="text-6xl mb-4 animate-bounce">📭</p>
        {searchTerm ? (
          <>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">No hay coincidencias</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Para: <span className="font-bold">"{searchTerm}"</span></p>
          </>
        ) : (
          <>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">¡Comienza ahora!</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Añade una tarea en el panel izquierdo</p>
          </>
        )}
      </m.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onRemoveTask={onRemoveTask}
            onToggleTask={onToggleTask}
            onEditTask={onEditTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default TaskList;