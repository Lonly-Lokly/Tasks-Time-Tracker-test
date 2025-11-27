import { useState, useMemo } from 'react';
import './App.scss';
import Task from './components/Task/Task.jsx';
import TaskModal from './components/TaskModal/TaskModal.jsx';
import toggleTaskStatus from './utils/toggleTaskStatus.js';
import markTasksAsDone from './utils/markTasksAsDone.js';
import calculateTotalDoneTime from './utils/calculateTotalDoneTime.js'
import { formatElapsed } from './utils/timeFormat.js';

function App() {
    const [tasks, setTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [inputTaskValue, setInputTaskValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);

    const handleInputTaskValue = (e) => {
        setInputTaskValue(e.target.value);
    };

    const addTask = () => {
        const text = inputTaskValue.trim();
        if (!text) return;

        const newTask = {
            id: Date.now(),
            text,
            status: 'active',
            intervals: [{ startedAt: Date.now(), stoppedAt: null }],
            finishedAt: null,
        };

        setTasks(prev => [newTask, ...prev]);
        setInputTaskValue('');
    };

    const toggleStatus = (taskId) => {
        setTasks(prev => toggleTaskStatus(prev, taskId));
    };

    const openModal = () => {
        setIsModalOpen(true);
        setSelectedTaskIds([]);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTaskIds([]);
    };

    const toggleTaskSelection = (taskId) => {
        setSelectedTaskIds(prev =>
            prev.includes(taskId)
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId]
        );
    };

    const markTasksDone = () => {
        const { updatedTasks, completedTasks } = markTasksAsDone(tasks, selectedTaskIds);
        setTasks(updatedTasks);
        setDoneTasks(prev => [...prev, ...completedTasks]);
        closeModal();
    };

    const totalDoneTime = useMemo(() => calculateTotalDoneTime(doneTasks), [doneTasks]);

    return (
        <>
            <div className="container">
                <div className="input__container">
                    <input
                        id="task__input"
                        type="text"
                        placeholder="Новая задача..."
                        value={inputTaskValue}
                        onChange={handleInputTaskValue}
                        minLength={1}
                        maxLength={100}
                    />

                    <button
                        className="add__button"
                        onClick={addTask}
                        disabled={!inputTaskValue.trim()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="play circle"><path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm0 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z"/><path d="M17.49 11.13c-9.58-5.32-9.31-5.4-10-5S7 6.41 7 17a1 1 0 0 0 1 1c.37 0-.29.3 9.49-5.13a1 1 0 0 0 0-1.74zM9 15.3V8.7l5.94 3.3z"/></g></svg>

                    </button>
                </div>

                <div className="tasks__container">
                    {tasks.map(task => (
                        <Task
                            key={task.id}
                            id={task.id}
                            text={task.text}
                            status={task.status}
                            intervals={task.intervals}
                            finishedAt={task.finishedAt}
                            onToggle={toggleStatus}
                        />
                    ))}
                </div>

                <div className="donetasks__container">
                    <div className="donetasks__content">
                        <div className="donetasks__wrap">
                            <h1 className="donetasks__title">Выполненные задачи</h1>
                            <button className="donetasks__button" onClick={openModal}>
                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 15a7 7 0 1 1 7-7 7 7 0 0 1-7 7z"/><path d="M9 4H7v3H4v2h3v3h2V9h3V7H9V4z"/></svg>
                            </button>
                        </div>
                        {doneTasks.length > 0 && <div className="donetasks__total">{formatElapsed(totalDoneTime)}</div>}
                        
                    </div>


                    {doneTasks.length > 0 ? (
                        <div className="donetask__tasks">
                            {doneTasks.map(task => (
                                <Task
                                    key={task.id}
                                    id={task.id}
                                    text={task.text}
                                    status={task.status}
                                    intervals={task.intervals}
                                    finishedAt={task.finishedAt}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="donetasks__placeholder">
                            Выполненных задач пока нет
                        </div>
                    )}
                </div>
            </div>

            <TaskModal
                isOpen={isModalOpen}
                tasks={tasks}
                selectedTaskIds={selectedTaskIds}
                onToggleSelection={toggleTaskSelection}
                onConfirm={markTasksDone}
                onClose={closeModal}
            />
        </>
    );
}

export default App;