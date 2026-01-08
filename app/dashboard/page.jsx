'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { LogOut, Plus } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    verifyAuth();
    fetchTasks();
  }, []);

  const verifyAuth = async () => {
    try {
      const res = await api.get('/auth/verify');
      if (res.data.success) setUser(res.data.user);
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      if (res.data.success) setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await api.post('/auth/logout');
    router.push('/login');
  };

  const handleDeleteTask = async (id) => {
    if (!confirm('Delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const handleToggleStatus = async (id, status) => {
    const newStatus = status === 'Pending' ? 'Completed' : 'Pending';
    await api.put(`/tasks/${id}`, { status: newStatus });
    setTasks(tasks.map(t => (t._id === id ? { ...t, status: newStatus } : t)));
  };

  const handleTaskSaved = (task) => {
    setTasks(prev =>
      editingTask
        ? prev.map(t => (t._id === task._id ? task : t))
        : [task, ...prev]
    );
    setIsModalOpen(false);
  };

  const pending = tasks.filter(t => t.status === 'Pending');
  const completed = tasks.filter(t => t.status === 'Completed');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 animate-pulse">
        <p className="text-lg font-medium text-gray-700">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100">
      
  <header className="sticky top-0 z-30 backdrop-blur bg-black/80 border-b border-white/10 shadow-lg">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-white tracking-wide">
        Task Manager
      </h1>
      {user && (
        <p className="text-sm text-gray-300">
          {user.name}
        </p>
      )}
    </div>

    <Button
      variant="outline"
      onClick={handleLogout}
      className="
        border-white/20 text-black
        hover:bg-red-600 hover:border-red-600
        hover:text-white transition-all duration-200
      "
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  </div>
</header>


    
      <main className="max-w-7xl mx-auto px-6 py-10 animate-slide-up">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Your Tasks Overview
          </h2>

          <Button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
          <section className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-indigo-600 mb-4">
              Pending Tasks ({pending.length})
            </h3>

            <div className="space-y-4">
              {pending.length === 0 ? (
                <p className="text-center text-gray-400 italic py-8">
                   No pending tasks...!!!!
                </p>
              ) : (
                pending.map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={(t) => {
                      setEditingTask(t);
                      setIsModalOpen(true);
                    }}
                    onDelete={handleDeleteTask}
                    onToggleStatus={handleToggleStatus}
                  />
                ))
              )}
            </div>
          </section>

          
          <section className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-green-600 mb-4">
              Completed Tasks ({completed.length})
            </h3>

            <div className="space-y-4">
              {completed.length === 0 ? (
                <p className="text-center text-gray-400 italic py-8">
                  ⏳ Nothing completed yet
                </p>
              ) : (
                completed.map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={(t) => {
                      setEditingTask(t);
                      setIsModalOpen(true);
                    }}
                    onDelete={handleDeleteTask}
                    onToggleStatus={handleToggleStatus}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        onSave={handleTaskSaved}
      />
    </div>
  );
}
