import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, fetchStats } from '../../store/taskSlice';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import StatsChart from '../dashboard/StatsChart';
import { Plus, ListFilter, LayoutGrid, Loader2 } from 'lucide-react';

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, isLoading, stats } = useSelector((state) => state.tasks);
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        dispatch(fetchTasks());
        dispatch(fetchStats());
    }, [dispatch]);

    const filteredTasks = filter === 'All'
        ? tasks
        : tasks.filter(task => task.status === filter);

    return (
        <div className="animate-fade">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: '2rem', alignItems: 'start' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Your Tasks</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>You have {tasks.length} tasks in total</p>
                        </div>
                        <button onClick={() => setShowForm(true)} className="btn btn-primary">
                            <Plus size={20} /> Add Task
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {['All', 'Todo', 'In Progress', 'Completed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`btn ${filter === f ? 'btn-primary' : 'glass'}`}
                                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '4rem' }}>
                            <Loader2 className="animate-spin" size={40} color="var(--primary)" />
                        </div>
                    ) : filteredTasks.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                            {filteredTasks.map((task) => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </div>
                    ) : (
                        <div className="glass" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                            <LayoutGrid size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                            <p>No tasks found in this category.</p>
                        </div>
                    )}
                </div>

                <div style={{ position: 'sticky', top: '6rem' }}>
                    <div className="glass" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Task Distribution</h3>
                        <StatsChart stats={stats} />
                    </div>
                </div>
            </div>

            {showForm && <TaskForm onClose={() => setShowForm(false)} />}
        </div>
    );
};

export default TaskList;
