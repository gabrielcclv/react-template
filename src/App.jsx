import { useCallback, useEffect, useMemo, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import AddTaskInput from './components/AddTaskInput';
import ClearCompletedButton from './components/ClearCompletedButton';
import ResetAppButton from './components/ResetAppButton';
import SavedIndicator from './components/SavedIndicator';
import HideCompletedCheckbox from './components/HideCompletedCheckbox';
import SearchTasksInput from './components/SearchTasksInput';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';
import { useIsFirstRender } from './hooks/useIsFirstRender';
import useToggle from './hooks/useToggle';
import useDebounce from './hooks/useDebounce';
import { useLocalStorage } from './hooks/useLocalStorage';

const INITIAL_TASKS = [
	{ id: 1, text: 'Aprender fundamentos de React', completed: false, priority: 'alta', dueDate: new Date().toISOString().split('T')[0] },
	{ id: 2, text: 'Construir una app de tareas', completed: false, priority: 'media', dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
	{ id: 3, text: '¡Desplegar en Vercel con Motion!', completed: false, priority: 'baja', dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0] },
];

const PRIORITY_ORDER = { alta: 0, media: 1, baja: 2 };

function App() {
	const [tasks, setTasks] = useLocalStorage('tasks', INITIAL_TASKS);
	const [savedIndicator, setSavedIndicator] = useState(null);
	const [error, setError] = useState('');
	const isFirstRender = useIsFirstRender();
	
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 300);
	const [hideCompleted, toggleHideCompleted] = useToggle(false);
	const [priorityFilter, setPriorityFilter] = useState(null); // 'alta', 'media', 'baja' o null

	useEffect(() => {
		const message = isFirstRender
			? '✅ Lista restaurada'
			: '✅ Cambios guardados automáticamente';
		setSavedIndicator({ message });
		const timer = setTimeout(() => setSavedIndicator(null), 2000);
		return () => clearTimeout(timer);
	}, [tasks, isFirstRender]);

	const handleResetApp = () => {
		setTasks([]);
		setSearchTerm('');
	};

	const addTask = (text, priority = 'media', dueDate = '') => {
		const trimmedText = text.trim();
		
		if (tasks.some(t => t.text.toLowerCase() === trimmedText.toLowerCase())) {
			setError('⚠️ Esta tarea ya existe en la lista.');
			setTimeout(() => setError(''), 3000);
			return;
		}

		const newTask = {
			id: Date.now(),
			text: trimmedText,
			completed: false,
			priority: priority,
			dueDate: dueDate || new Date().toISOString().split('T')[0],
		};
		setTasks((prev) => [...prev, newTask]);
		setError('');
	};

	const removeTask = useCallback((id) => setTasks((prev) => prev.filter((t) => t.id !== id)), [setTasks]);

	const toggleTask = useCallback((id) => {
		setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
	}, [setTasks]);

	const editTask = useCallback((id, newText) => {
		setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)));
	}, [setTasks]);

	const clearCompleted = () => setTasks((prev) => prev.filter((t) => !t.completed));

	const visibleTasks = useMemo(() => {
		let list = tasks;
		if (hideCompleted) list = list.filter((t) => !t.completed);
		if (priorityFilter) list = list.filter((t) => t.priority === priorityFilter);
		if (debouncedSearch.trim()) {
			const q = debouncedSearch.toLowerCase();
			list = list.filter((t) => t.text.toLowerCase().includes(q));
		}
		return [...list].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
	}, [tasks, hideCompleted, debouncedSearch, priorityFilter]);

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 py-12 px-4 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-hidden relative">
			{/* Decoración de fondo */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
				<div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400 dark:bg-indigo-600 rounded-full blur-3xl"></div>
			</div>

			{/* Contenido Principal */}
			<div className="relative z-10 max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
						✨ Mi Lista de Tareas
					</h1>
					<p className="text-lg text-slate-600 dark:text-slate-400">Organiza tu día con estilo</p>
				</div>

				{/* Grid Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
					{/* Sidebar - Controles */}
					<div className="lg:col-span-1 space-y-6">
						{/* Card Principal */}
						<div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-shadow">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl">📝</div>
								<div>
									<h2 className="text-lg font-bold">Nueva Tarea</h2>
									<p className="text-xs text-slate-500 dark:text-slate-400">Crea y organiza</p>
								</div>
							</div>
							
							<AddTaskInput onAdd={addTask} />
							<AnimatePresence>
								{error && (
									<m.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0 }}
										className="text-rose-500 text-sm mt-2 font-medium flex items-center gap-2"
									>
										⚠️ {error}
									</m.p>
								)}
							</AnimatePresence>
						</div>

						{/* Filtros Card */}
						<div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-shadow space-y-6">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-lg">🎯</div>
								<h3 className="text-lg font-bold">Filtros Avanzados</h3>
							</div>
							
							{/* Búsqueda - Sección destacada */}
							<div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-700/50 dark:to-slate-700/30 p-4 rounded-xl border-2 border-indigo-200 dark:border-indigo-500/30">
								<label className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide block mb-3">🔎 Buscar Tarea</label>
								<SearchTasksInput value={searchTerm} onChange={setSearchTerm} />
								{searchTerm && (
									<m.p
										initial={{ opacity: 0, y: -5 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-xs text-indigo-600 dark:text-indigo-400 mt-3 font-semibold"
									>
										✨ Encontradas: <span className="text-lg">{visibleTasks.length}</span> tarea{visibleTasks.length !== 1 ? 's' : ''}
									</m.p>
								)}
							</div>

							{/* Filtro por Prioridad */}
							<div className="space-y-2">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">⚡ Filtrar por prioridad</label>
								<div className="grid grid-cols-3 gap-2">
									{[
										{ value: 'alta', label: '🔴 Alta', color: 'from-red-500 to-rose-500' },
										{ value: 'media', label: '🟡 Media', color: 'from-amber-500 to-orange-500' },
										{ value: 'baja', label: '🟢 Baja', color: 'from-emerald-500 to-teal-500' },
									].map(({ value, label, color }) => (
										<m.button
											key={value}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => setPriorityFilter(priorityFilter === value ? null : value)}
											className={`px-3 py-2 rounded-lg font-semibold text-sm text-white transition-all border-2 ${
												priorityFilter === value
													? `bg-gradient-to-r ${color} border-white/50 shadow-lg`
													: 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-300 dark:hover:bg-slate-600'
											}`}
										>
											{label}
										</m.button>
									))}
								</div>
								{priorityFilter && (
									<p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
										Mostrando tareas de prioridad <span className="font-bold capitalize">{priorityFilter}</span>
									</p>
								)}
							</div>

							{/* Filtro por estado */}
							{tasks.length > 0 && (
								<div className="border-t border-slate-200/50 dark:border-slate-700/50 pt-4">
									<label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-3">✓ Filtrar por estado</label>
									<m.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => toggleHideCompleted()}
										className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-all border-2 flex items-center justify-between ${
											hideCompleted
												? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-white/50 shadow-lg'
												: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600'
										}`}
									>
										<span>{hideCompleted ? '👁️ Ocultando completadas' : '👀 Ver todas'}</span>
										<span className="text-lg">{tasks.filter(t => t.completed).length}</span>
									</m.button>
								</div>
							)}
						</div>

						{/* Stats Card */}
						<div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-2xl shadow-xl text-white overflow-hidden relative">
							<div className="absolute inset-0 opacity-10">
								<div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
							</div>
							<div className="relative z-10">
								<TaskSummary tasks={tasks} />
							</div>
						</div>

						{/* Motivación y Stats Card */}
						<div className="bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 p-6 rounded-2xl shadow-xl text-white overflow-hidden relative">
							<div className="absolute inset-0 opacity-10">
								<div className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-full blur-2xl"></div>
								<div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-full blur-2xl"></div>
							</div>
							<div className="relative z-10 space-y-4">
								<div>
									<p className="text-xs font-bold uppercase opacity-80 tracking-wider">Productividad</p>
									<h4 className="text-lg font-black mt-1">¡Sigue adelante! 🚀</h4>
								</div>

								{tasks.length > 0 ? (
									<div>
										<div className="space-y-2">
											<div className="flex justify-between items-center text-xs">
												<span className="opacity-90">Tareas completadas</span>
												<span className="font-bold">{tasks.filter(t => t.completed).length}/{tasks.length}</span>
											</div>
											<div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
												<m.div
													initial={{ width: 0 }}
													animate={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
													transition={{ duration: 0.8 }}
													className="h-full bg-gradient-to-r from-yellow-300 to-emerald-400"
												/>
											</div>
										</div>
										<div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
											<div className="bg-white/10 rounded-lg p-2 backdrop-blur">
												<p className="opacity-80">🔴 Alta</p>
												<p className="font-bold text-sm">{tasks.filter(t => t.priority === 'alta').length}</p>
											</div>
											<div className="bg-white/10 rounded-lg p-2 backdrop-blur">
												<p className="opacity-80">🟡 Media</p>
												<p className="font-bold text-sm">{tasks.filter(t => t.priority === 'media').length}</p>
											</div>
											<div className="bg-white/10 rounded-lg p-2 backdrop-blur">
												<p className="opacity-80">🟢 Baja</p>
												<p className="font-bold text-sm">{tasks.filter(t => t.priority === 'baja').length}</p>
											</div>
										</div>
									</div>
								) : (
									<div>
										<p className="text-sm font-semibold">📝 ¡Añade tu primera tarea!</p>
										<p className="text-xs opacity-80 mt-1">Empieza a organizar tu día</p>
									</div>
								)}

								<m.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.95 }}
									onClick={handleResetApp}
									className="w-full mt-2 px-3 py-2 text-xs font-bold bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-all border border-white/30 hover:border-white/50"
								>
									🗑️ Limpiar todo
								</m.button>
							</div>
						</div>
					</div>

					{/* Main Content - Lista de Tareas */}
					<div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 min-h-[50vh] flex flex-col">
						<div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200/50 dark:border-slate-700/50">
							<h2 className="text-2xl font-bold flex items-center gap-3">
								<span className="text-3xl">📋</span>
								Tareas Activas
							</h2>
							<SavedIndicator show={!!savedIndicator} message={savedIndicator?.message} />
						</div>

						<div className="flex-1 overflow-y-auto">
							<TaskList 
								tasks={visibleTasks} 
								onRemoveTask={removeTask} 
								onToggleTask={toggleTask} 
								onEditTask={editTask}
								searchTerm={debouncedSearch}
							/>
						</div>

						<AnimatePresence>
							{tasks.some(t => t.completed) && (
								<m.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
									className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end"
								>
									<ClearCompletedButton count={tasks.filter((t) => t.completed).length} onClear={clearCompleted} />
								</m.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
