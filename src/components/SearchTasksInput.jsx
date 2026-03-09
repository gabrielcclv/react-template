/**
 * Input controlado para filtrar tareas por texto.
 * El padre debe controlar cuándo mostrarlo (p. ej. solo si tasks.length > 1).
 */
import { m } from 'motion/react';

function SearchTasksInput({ value, onChange, placeholder = 'Buscar tareas...' }) {
	return (
		<m.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 font-medium transition-all hover:border-slate-300 dark:hover:border-slate-500"
				aria-label="Buscar tareas"
			/>
		</m.div>
	);
}

export default SearchTasksInput;
