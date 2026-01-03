import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask, fetchStats } from '../../store/taskSlice';
import { X, Save, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const TaskForm = ({ task, onClose }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'Todo',
    });

    const { title, description, status } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return toast.error('Title is required');

        setIsLoading(true);
        try {
            if (task) {
                await dispatch(updateTask({ id: task.id, taskData: formData })).unwrap();
                toast.success('Task updated');
            } else {
                await dispatch(createTask(formData)).unwrap();
                toast.success('Task created');
            }
            dispatch(fetchStats());
            onClose();
        } catch (error) {
            toast.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
            <div className="glass animate-fade" style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: 'var(--bg-dark)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{task ? 'Edit Task' : 'New Task'}</h2>
                    <button onClick={onClose} className="btn glass" style={{ padding: '0.5rem' }}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <label className="input-label">Task Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            className="input"
                            placeholder="What needs to be done?"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Description (Optional)</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={onChange}
                            className="input"
                            placeholder="Add some details..."
                            rows="4"
                            style={{ resize: 'none' }}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Status</label>
                        <select
                            name="status"
                            value={status}
                            onChange={onChange}
                            className="input"
                        >
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="button" onClick={onClose} className="btn glass" style={{ flex: 1, justifyContent: 'center' }}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> {task ? 'Update Task' : 'Create Task'}</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
