function TaskModal({ isOpen, tasks, selectedTaskIds, onToggleSelection, onConfirm, onClose }) {
    if (!isOpen) return;

    return (
        <div className="task-modal__overlay" onClick={onClose}>
            <div
                className="task-modal__content"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="task-modal__title">
                    Выберите задачи для завершения
                </h2>

                {tasks.length === 0 ? (
                    <p>Нет активных задач</p>
                ) : (
                    <>
                        <div className="task-modal__tasks-list">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`task-modal__task-item ${selectedTaskIds.includes(task.id) ? 'is-selected' : ''}`}
                                    onClick={() => onToggleSelection(task.id)}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            onToggleSelection(task.id);
                                        }
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        className="task-modal__checkbox"
                                        checked={selectedTaskIds.includes(task.id)}
                                        onChange={() => onToggleSelection(task.id)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <span>{task.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="task-modal__buttons">
                            <button
                                onClick={onConfirm}
                                disabled={selectedTaskIds.length === 0}
                            >
                                Завершить выбранные
                            </button>
                            <button onClick={onClose}>Отмена</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TaskModal;