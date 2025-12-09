'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { projectsApi } from '@/lib/api/projects';
import { MediaType, Project, ProjectStatus } from '@/types/project';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  ExternalLink,
  Eye,
  Github,
  Star,
  Trash2,
  Users,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchProject(params.id as string);
    }
  }, [params.id]);

  const fetchProject = async (id: string) => {
    try {
      setLoading(true);
      const data = await projectsApi.getProject(id);
      setProject(data);
    } catch (error) {
      console.error('Failed to fetch project:', error);
      alert('Failed to load project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!project || !confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsApi.deleteProject(project.id);
      alert('Project deleted successfully!');
      router.push('/dashboard/projects');
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    const colors = {
      [ProjectStatus.IN_PROGRESS]:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      [ProjectStatus.DEVELOPMENT]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      [ProjectStatus.PRODUCTION]:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      [ProjectStatus.UPDATED]:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return colors[status] || colors[ProjectStatus.IN_PROGRESS];
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-zinc-600 dark:text-zinc-400">Loading project...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-lg text-zinc-600 dark:text-zinc-400">Project not found</div>
          <button
            onClick={() => router.push('/dashboard/projects')}
            className="px-4 py-2 bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200"
          >
            Back to Projects
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/dashboard/projects')}
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/dashboard/projects/edit/${project.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Project Title & Status */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {project.title}
                </h1>
                {project.isFeatured && <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />}
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">{project.category}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}
            >
              {project.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Media Gallery */}
        {project.media && project.media.length > 0 && (
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              {project.media[selectedMediaIndex].type === MediaType.IMAGE ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.media[selectedMediaIndex].url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={project.media[selectedMediaIndex].url}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-6 gap-2">
              {project.media.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedMediaIndex(index)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedMediaIndex === index
                      ? 'border-purple-500'
                      : 'border-zinc-300 dark:border-zinc-700 hover:border-purple-300'
                  }`}
                >
                  {item.type === MediaType.IMAGE ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video src={item.url} className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Project Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {project.client && (
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Client</div>
              <div className="font-semibold">{project.client}</div>
            </div>
          )}
          {project.duration && (
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                <Clock className="w-4 h-4" />
                Duration
              </div>
              <div className="font-semibold">{project.duration}</div>
            </div>
          )}
          {project.teamSize && (
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                <Users className="w-4 h-4" />
                Team Size
              </div>
              <div className="font-semibold">{project.teamSize} members</div>
            </div>
          )}
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-1">
              <Eye className="w-4 h-4" />
              Views
            </div>
            <div className="font-semibold">{project.viewCount.toLocaleString()}</div>
          </div>
        </div>

        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <Github className="w-5 h-5" />
                View Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </div>
        )}

        {/* Description */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl font-bold mb-3">Description</h2>
          <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        {project.techStack &&
          Object.values(project.techStack).some((arr) => arr && arr.length > 0) && (
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
              <div className="space-y-4">
                {Object.entries(project.techStack).map(
                  ([category, techs]) =>
                    techs &&
                    techs.length > 0 && (
                      <div key={category}>
                        <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase mb-2">
                          {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {techs.map((tech: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-bold mb-3">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-bold mb-3">Challenges</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
              {project.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Learnings */}
        {project.learnings && project.learnings.length > 0 && (
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-bold mb-3">Key Learnings</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
              {project.learnings.map((learning, index) => (
                <li key={index}>{learning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Dates */}
        {(project.startDate || project.endDate || project.createdAt) && (
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-bold mb-3">Timeline</h2>
            <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
              {project.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                </div>
              )}
              {project.endDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Completed: {new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
