import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask, fetchStats } from '../../store/taskSlice';
import { Trash2, Edit3, CheckCircle2, Circle, Clock, MoreVertical } from 'lucide-react';
import { toast } from 'react-toastify';
import TaskForm from './TaskForm';

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const onDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(task.id));
            dispatch(fetchStats());
            toast.success('Task deleted');
        }
    };

    const onStatusChange = (newStatus) => {
        dispatch(updateTask({ id: task.id, taskData: { status: newStatus } }));
        dispatch(fetchStats());
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <CheckCircle2 size={20} color="var(--success)" />;
            case 'In Progress': return <Clock size={20} color="var(--warning)" />;
            default: return <Circle size={20} color="var(--text-muted)" />;
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed': return { background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' };
            case 'In Progress': return { background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' };
            default: return { background: 'rgba(148, 163, 184, 0.1)', color: 'var(--text-muted)' };
        }
    };

    return (
        <>
            <div className="glass" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.2s', cursor: 'default' }}>
                <button
                    onClick={() => onStatusChange(task.status === 'Completed' ? 'Todo' : 'Completed')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                    {getStatusIcon(task.status)}
                </button>

                <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, textDecoration: task.status === 'Completed' ? 'line-through' : 'none', opacity: task.status === 'Completed' ? 0.5 : 1 }}>
                        {task.title}
                    </h4>
                    {task.description && (
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{task.description}</p>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontWeight: 600, ...getStatusStyle(task.status) }}>
                        {task.status}
                    </span>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setIsEditing(true)} className="btn glass" style={{ padding: '0.4rem', borderRadius: '0.4rem' }}>
                            <Edit3 size={16} />
                        </button>
                        <button onClick={onDelete} className="btn glass" style={{ padding: '0.4rem', borderRadius: '0.4rem', color: 'var(--danger)' }}>
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {isEditing && <TaskForm task={task} onClose={() => setIsEditing(false)} />}
        </>
    );
};

export default TaskItem;
