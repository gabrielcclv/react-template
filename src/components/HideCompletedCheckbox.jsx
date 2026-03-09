/**
 * Checkbox para alternar la visibilidad de tareas completadas.
 * Presentacional: el padre controla el estado (useToggle) y pasa checked + onChange.
 */
import { m } from 'motion/react';

function HideCompletedCheckbox({ checked, onChange, label = 'Ocultar tareas completadas' }) {
	return (
		<m.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}
			className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700/50"
		>
			<label className="flex items-center gap-3 cursor-pointer flex-1 select-none">
				<m.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<input
						type="checkbox"
						checked={checked}
						onChange={onChange}
						className="w-5 h-5 text-purple-600 dark:text-purple-400 rounded-md cursor-pointer accent-purple-600 dark:accent-purple-400 focus:ring-2 focus:ring-purple-500"
					/>
				</m.div>
				<span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
			</label>
		</m.div>
	);
}

export default HideCompletedCheckbox;
