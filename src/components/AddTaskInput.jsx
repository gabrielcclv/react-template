import { useRef, useState } from 'react';

function AddTaskInput({ onAdd }) {
	const [input, setInput] = useState('');
	const [priority, setPriority] = useState('media'); // 🆕 Estado para prioridad

	const inputRef = useRef(null);

	// Al enviar: validamos, avisamos al padre, reseteamos el formulario y devolvemos el foco.
	// Orden importante: primero onAdd (el padre actualiza su estado) y después setInput/setPriority
	// (reseteamos el nuestro), así la UI queda coherente. inputRef.current?.focus() devuelve el
	// foco al input para poder escribir otra tarea sin hacer clic; ?. evita error si la ref no está.
	const handleSubmit = () => {
		if (input.trim()) {
			onAdd(input, priority);
			setInput('');
			setPriority('media');
			inputRef.current?.focus();
		}
	};

	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-5 space-y-4 shadow-lg border border-blue-200 dark:border-slate-600">
			<div className="flex gap-2">
				<input
					type="text"
					ref={inputRef}
					value={input}
					onChange((e) => setInput(e.target.value)}
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

			{/* 🆕 Selector de prioridad */}
			<div className="flex items-center gap-2 text-sm">
				<span className="text-gray-600 font-medium">Prioridad:</span>
				<div className="flex gap-2">
					{['baja', 'media', 'alta'].map((p) => (
						<button
							key={p}
							onClick={() => setPriority(p)}
							className={`px-3 py-1 rounded-full transition-all ${
								priority === p ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
							}`}>
							{p.charAt(0).toUpperCase() + p.slice(1)}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default AddTaskInput;
