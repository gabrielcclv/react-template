/**
 * Input controlado para filtrar tareas por texto.
 * El padre debe controlar cuándo mostrarlo (p. ej. solo si tasks.length > 1).
 */
import { m } from 'motion/react';

function SearchTasksInput({ value, onChange, placeholder = 'Escribe para buscar...' }) {
	return (
		<m.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="relative"
		>
			<div className="relative">
				<span className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none">🔍</span>
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className="w-full pl-12 pr-12 py-3 bg-white dark:bg-slate-600 border-2 border-indigo-300 dark:border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white dark:placeholder-slate-300 font-semibold transition-all hover:border-indigo-400 dark:hover:border-indigo-400 shadow-md"
					aria-label="Buscar tareas"
				/>
				{value && (
					<m.button
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						type="button"
						onClick={() => onChange('')}
						className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors font-bold text-lg"
					>
						✕
					</m.button>
				)}
			</div>
		</m.div>
	);
}

export default SearchTasksInput;
