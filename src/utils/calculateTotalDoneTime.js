const calculateTotalDoneTime = (doneTasks) => {
    if (!doneTasks || doneTasks.length === 0) {
        return 0;
    }

    return doneTasks.reduce((totalTime, task) => {
        const taskTime = task.intervals.reduce((sum, interval) => {
            const stop = interval.stoppedAt ?? interval.startedAt;
            return sum + (stop - interval.startedAt);
        }, 0);
        return totalTime + taskTime;
    }, 0);
};

export default calculateTotalDoneTime;
