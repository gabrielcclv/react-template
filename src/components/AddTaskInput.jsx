import { useRef, useState } from 'react';

function AddTaskInput({ onAdd }) {
	const [input, setInput] = useState('');
	const [priority, setPriority] = useState('media');
	const [dueDate, setDueDate] = useState('');
	const inputRef = useRef(null);

	const handleSubmit = () => {
		if (input.trim()) {
			onAdd(input, priority, dueDate);
			setInput('');
			setPriority('media');
			setDueDate('');
			inputRef.current?.focus();
		}
	};

	const getTodayDate = () => new Date().toISOString().split('T')[0];

	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-5 space-y-4 shadow-lg border border-blue-200 dark:border-slate-600">
			<div className="flex gap-2">
				<input
					type="text"
					ref={inputRef}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
					placeholder="¿Qué necesitas hacer hoy?"
					className="flex-1 px-4 py-3 border-2 border-blue-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 font-medium transition-all hover:border-blue-300"
				/>
				<button
					onClick={handleSubmit}
					className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-bold shadow-lg hover:shadow-xl active:scale-95"
				>
					✨ Añadir
				</button>
			</div>

			{/* Selector de fecha y prioridad */}
			<div className="grid grid-cols-2 gap-3">
				{/* Fecha de vencimiento */}
				<div className="flex flex-col gap-1">
					<label className="text-xs font-bold text-gray-600 dark:text-slate-300 uppercase">📅 Fecha</label>
					<input
						type="date"
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						min={getTodayDate()}
						className="px-3 py-2 border-2 border-blue-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white text-sm font-medium transition-all"
					/>
				</div>

				{/* Selector de prioridad */}
				<div className="flex flex-col gap-1">
					<label className="text-xs font-bold text-gray-600 dark:text-slate-300 uppercase">⚡ Prioridad</label>
					<div className="flex gap-1">
						{[
							{ value: 'baja', emoji: '🟢' },
							{ value: 'media', emoji: '🟡' },
							{ value: 'alta', emoji: '🔴' },
						].map(({ value, emoji }) => (
							<button
								key={value}
								onClick={() => setPriority(value)}
								className={`flex-1 px-2 py-2 rounded-lg transition-all text-xs font-bold ${
									priority === value
										? 'bg-indigo-600 text-white shadow-lg'
										: 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-500'
								}`}
							>
								{emoji}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddTaskInput;
