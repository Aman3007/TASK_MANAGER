import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function TaskModal({ isOpen, onClose, task, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        content: task.content
      });
    } else {
      setFormData({
        title: '',
        content: ''
      });
    }
    setErrors({});
    setApiError('');
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let response;
      if (task) {
        response = await api.put(`/tasks/${task._id}`, formData);
      } else {
        response = await api.post('/tasks', formData);
      }

      if (response.data.success) {
        onSave(response.data.task);
        setFormData({ title: '', content: '' });
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message || 'Failed to save task. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ title: '', content: '' });
    setErrors({});
    setApiError('');
    onClose();
  };

  return (
   <Dialog open={isOpen} onOpenChange={handleClose}>
  <DialogContent className="sm:max-w-lg rounded-xl">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold">
        {task ? 'Edit Task' : 'Create New Task'}
      </DialogTitle>
      <p className="text-sm text-gray-500">
        {task
          ? 'Update your task details below'
          : 'Add a new task to stay productive'}
      </p>
    </DialogHeader>

    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. Finish assignment"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Description</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write task details..."
          value={formData.content}
          onChange={handleChange}
          rows={4}
          className={errors.content ? 'border-red-500' : ''}
        />
        {errors.content && (
          <p className="text-xs text-red-500">{errors.content}</p>
        )}
      </div>

      {apiError && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-600">{apiError}</p>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  </DialogContent>
</Dialog>

  );
}