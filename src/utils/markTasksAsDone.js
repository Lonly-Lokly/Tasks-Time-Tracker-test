const markTasksAsDone = (tasks, selectedTaskIds) => {
    if (!selectedTaskIds || selectedTaskIds.length === 0) {
        return { updatedTasks: tasks, completedTasks: [] };
    }

    const now = Date.now();
    const tasksToMove = tasks.filter((task) =>
        selectedTaskIds.includes(task.id)
    );

    const completedTasks = tasksToMove.map((task) => {
        const updatedIntervals = task.intervals.map((interval, idx) => {
            if (idx === task.intervals.length - 1 && !interval.stoppedAt) {
                return { ...interval, stoppedAt: now };
            }
            return interval;
        });
        return {
            ...task,
            status: "done",
            intervals: updatedIntervals,
            finishedAt: now,
        };
    });

    const updatedTasks = tasks.filter(
        (task) => !selectedTaskIds.includes(task.id)
    );

    return { updatedTasks, completedTasks };
};

export default markTasksAsDone;
