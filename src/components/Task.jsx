import { useMemo } from 'react';
import { useNow } from '../hook/useNow.js';
import { formatElapsed, formatTime, formatTimeWithoutSec } from '../utils/timeFormat.js';


function Task({ id, text, status, intervals, finishedAt, onToggle }) {
    const now = status !== 'done' ? useNow(1000) : null;

    const elapsedMs = useMemo(() => {
        const total = intervals.reduce((sum, interval) => {
            if (status === 'done') {
                const stop = interval.stoppedAt ?? interval.startedAt;
                return sum + (stop - interval.startedAt);
            } else {
                const stop = interval.stoppedAt ?? (status === 'active' ? now : interval.startedAt);
                return sum + (stop - interval.startedAt);
            }
        }, 0);
        return Math.max(0, total);
    }, [now, status, intervals]);

    const handleClick = () => {
        if (status !== 'done') {
            onToggle(id);
        }
    };

    return (
        <div
            className={`task task--${status}`}
            onClick={handleClick}
            style={{ cursor: status !== 'done' ? 'pointer' : 'default' }}
        >
            <div className="task__content">
                <div className="task__text">{text}</div>
                <div className="task__time">
                    <span>{formatTimeWithoutSec(intervals[0]?.startedAt || Date.now())}</span>
                    <span> - </span>
                    <span>{finishedAt ? formatTimeWithoutSec(finishedAt) : '...'}</span>               
                </div>
            </div>

            <div className='task__timer'>{formatElapsed(elapsedMs)}</div>
        </div>
    );
}

export default Task;