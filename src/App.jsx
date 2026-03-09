import { useCallback, useEffect, useMemo, useState } from 'react';
import { m } from 'motion/react';
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
	{ id: 1, text: 'Aprender fundamentos de React', completed: false, priority: 'alta' },
	{ id: 2, text: 'Construir una app de tareas', completed: false, priority: 'media' },
	{ id: 3, text: '¡Desplegar en Vercel con Motion!', completed: false, priority: 'baja' },
];

const PRIORITY_ORDER = { alta: 0, media: 1, baja: 2 };

function App() {
	const [tasks, setTasks] = useLocalStorage('tasks', INITIAL_TASKS);
	const [savedIndicator, setSavedIndicator] = useState(null);
    const [error, setError] = useState(''); // 🆕 Estado para validaciones
	const isFirstRender = useIsFirstRender();
	
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 300);
	const [hideCompleted, toggleHideCompleted] = useToggle(false);

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

	const addTask = (text, priority = 'media') => {
        const trimmedText = text.trim();
        
        // 🆕 Validación: Evitar duplicados
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
		if (debouncedSearch.trim()) {
			const q = debouncedSearch.toLowerCase();
			list = list.filter((t) => t.text.toLowerCase().includes(q));
		}
		return [...list].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
	}, [tasks, hideCompleted, debouncedSearch]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 py-12 px-4 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
			{/* Decoración de fondo */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
				<div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400 dark:bg-indigo-600 rounded-full blur-3xl"></div>
			</div>

			{/* Contenido Principal */}
			<m.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="relative z-10 max-w-7xl mx-auto"
			>
				{/* Header */}
				<div className="text-center mb-12">
					<m.h1
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-3"
					>
						✨ Mi Lista de Tareas
					</m.h1>
					<p className="text-lg text-slate-600 dark:text-slate-400">Organiza tu día con estilo</p>
				</div>

				{/* Grid Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
					{/* Sidebar - Controles */}
					<m.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="lg:col-span-1 space-y-6"
					>
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
						</div>

						{/* Filtros Card */}
						<div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-shadow">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-sm">🔍</div>
								<h3 className="font-bold">Filtros</h3>
							</div>
							<SearchTasksInput value={searchTerm} onChange={setSearchTerm} />
							{tasks.some(t => t.completed) && (
								<m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
									<HideCompletedCheckbox checked={hideCompleted} onChange={toggleHideCompleted} />
								</m.div>
							)}
						</div>

						{/* Stats Card */}
						<div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white">
							<TaskSummary tasks={tasks} />
						</div>

						{/* Reset Button */}
						<m.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<ResetAppButton onReset={handleResetApp} />
						</m.div>
					</m.div>

					{/* Main Content - Lista de Tareas */}
					<m.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 min-h-[50vh] flex flex-col"
					>
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

						{tasks.some(t => t.completed) && (
							<m.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end"
							>
								<ClearCompletedButton count={tasks.filter((t) => t.completed).length} onClear={clearCompleted} />
							</m.div>
						)}
					</m.div>
				</div>
			</m.div>
		</div>
	);
}

export default App;