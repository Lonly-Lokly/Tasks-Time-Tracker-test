const toggleTaskStatus = (tasks, taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return tasks;

    if (task.status === "active") {
        const updatedIntervals = task.intervals.map((interval, idx) => {
            if (idx === task.intervals.length - 1 && !interval.stoppedAt) {
                return { ...interval, stoppedAt: Date.now() };
            }
            return interval;
        });
        const pausedTask = {
            ...task,
            status: "pause",
            intervals: updatedIntervals,
        };
        return [...tasks.filter((t) => t.id !== taskId), pausedTask];
    } else if (task.status === "pause") {
        return tasks.map((t) => {
            if (t.id === taskId) {
                return {
                    ...t,
                    status: "active",
                    intervals: [
                        ...t.intervals,
                        { startedAt: Date.now(), stoppedAt: null },
                    ],
                };
            }
            return t;
        });
    }
    return tasks;
};

export default toggleTaskStatus;
