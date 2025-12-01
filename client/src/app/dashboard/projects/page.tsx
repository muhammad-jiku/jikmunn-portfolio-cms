'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProjectForm from '@/components/projects/ProjectForm';
import ProjectsTable from '@/components/projects/ProjectsTable';
import { projectsApi } from '@/lib/api/projects';
import { CreateProjectData, Project } from '@/types/project';
import { Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsApi.getProjects({ limit: 100 });
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      alert('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (data: CreateProjectData) => {
    try {
      setIsSubmitting(true);
      const newProject = await projectsApi.createProject(data);
      setProjects([...projects, newProject]);
      setShowForm(false);
      alert('Project created successfully!');
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProject = async (data: CreateProjectData) => {
    if (!editingProject) return;

    try {
      setIsSubmitting(true);
      const updatedProject = await projectsApi.updateProject(editingProject.id, data);
      setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
      setEditingProject(null);
      alert('Project updated successfully!');
    } catch (error) {
      console.error('Failed to update project:', error);
      alert('Failed to update project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? It will be moved to trash.')) {
      return;
    }

    try {
      await projectsApi.deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  const handleViewProject = (project: Project) => {
    window.location.href = `/dashboard/projects/${project.id}`;
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading projects...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your portfolio projects</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />
        </div>

        {/* Form Modal */}
        {(showForm || editingProject) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h2>
              <ProjectForm
                initialData={editingProject ? undefined : undefined}
                onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProject(null);
                }}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        )}

        {/* Projects Table */}
        <ProjectsTable
          projects={filteredProjects}
          onEdit={(project) => setEditingProject(project)}
          onDelete={handleDeleteProject}
          onView={handleViewProject}
        />
      </div>
    </DashboardLayout>
  );
}
