import { m } from 'motion/react';

function TaskSummary({ tasks }) {
	const total = tasks.length;
	const completed = tasks.filter((t) => t.completed).length;
	const pending = total - completed;

	return (
		<m.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="text-white space-y-3"
		>
			<h3 className="text-sm font-bold uppercase opacity-80 tracking-wider">Resumen</h3>
			<div className="grid grid-cols-3 gap-2 text-center">
				<m.div
					whileHover={{ scale: 1.05 }}
					className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20"
				>
					<div className="text-2xl font-black">📊</div>
					<p className="text-xs opacity-90 mt-1">Total</p>
					<p className="text-xl font-bold">{total}</p>
				</m.div>
				<m.div
					whileHover={{ scale: 1.05 }}
					className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20"
				>
					<div className="text-2xl font-black">✅</div>
					<p className="text-xs opacity-90 mt-1">Hecho</p>
					<p className="text-xl font-bold">{completed}</p>
				</m.div>
				<m.div
					whileHover={{ scale: 1.05 }}
					className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20"
				>
					<div className="text-2xl font-black">⏳</div>
					<p className="text-xs opacity-90 mt-1">Falta</p>
					<p className="text-xl font-bold">{pending}</p>
				</m.div>
			</div>
			{total > 0 && (
				<div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
					<m.div
						initial={{ width: 0 }}
						animate={{ width: `${(completed / total) * 100}%` }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="h-full bg-gradient-to-r from-yellow-300 to-emerald-400 rounded-full"
					/>
				</div>
			)}
		</m.div>
	);
}

export default TaskSummary;
