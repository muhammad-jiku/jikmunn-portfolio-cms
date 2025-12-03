'use client';

import { projectsApi } from '@/lib/api/projects';
import { generateOGImageUrl, updatePageMetadata } from '@/lib/client-metadata';
import { MediaType, Project, ProjectStatus } from '@/types/project';
import { ArrowLeft, Calendar, Clock, ExternalLink, Eye, Github, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PublicProjectPage() {
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

  // Update metadata when project loads
  useEffect(() => {
    if (project) {
      const ogImage = generateOGImageUrl({
        title: project.title,
        type: 'project',
        category: project.category,
        status: project.status,
      });

      updatePageMetadata({
        title: `${project.title} | Jikmunn Portfolio`,
        description: project.description,
        image: ogImage,
        keywords: [
          project.category,
          ...(project.techStack?.frontend || []),
          ...(project.techStack?.backend || []),
        ].join(', '),
      });
    }
  }, [project]);

  const fetchProject = async (id: string) => {
    try {
      setLoading(true);
      // Use public endpoint for visitor access
      const data = await projectsApi.getProject(id);
      setProject(data);
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setLoading(false);
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600 dark:text-gray-400">Loading project...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="text-lg text-gray-600 dark:text-gray-400">Project not found</div>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Portfolio
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Project Header */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h1>
                  {project.isFeatured && (
                    <Star className="w-7 h-7 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-400">{project.category}</p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}
              >
                {project.status.replace('_', ' ')}
              </span>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              {project.client && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Client:</span>
                  <span>{project.client}</span>
                </div>
              )}
              {project.duration && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{project.duration}</span>
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{project.teamSize} members</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Eye className="w-4 h-4" />
                <span>{project.viewCount.toLocaleString()} views</span>
              </div>
            </div>

            {/* Action Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="flex flex-wrap gap-4 mt-6">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    View Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Live Demo
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Media Gallery */}
          {project.media && project.media.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Gallery</h2>
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
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
                {project.media.length > 1 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                    {project.media.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedMediaIndex(index)}
                        className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          selectedMediaIndex === index
                            ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                            : 'border-gray-300 dark:border-gray-700 hover:border-blue-300'
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
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              About This Project
            </h2>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          {project.techStack &&
            Object.values(project.techStack).some((arr) => arr && arr.length > 0) && (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Technologies Used
                </h2>
                <div className="space-y-6">
                  {Object.entries(project.techStack).map(
                    ([category, techs]) =>
                      techs &&
                      techs.length > 0 && (
                        <div key={category}>
                          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-3 tracking-wide">
                            {category}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech: string, index: number) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm font-medium"
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
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Key Features
              </h2>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <span className="shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-sm font-semibold mt-0.5">
                      {index + 1}
                    </span>
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Challenges & Solutions
              </h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <span className="shrink-0 w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span className="flex-1">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Learnings */}
          {project.learnings && project.learnings.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {project.learnings.map((learning, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <span className="shrink-0 w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span className="flex-1">{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timeline */}
          {(project.startDate || project.endDate || project.createdAt) && (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Timeline</h2>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                {project.startDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span>
                      <span className="font-semibold">Started:</span>{' '}
                      {new Date(project.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                {project.endDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span>
                      <span className="font-semibold">Completed:</span>{' '}
                      {new Date(project.endDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span>
                    <span className="font-semibold">Published:</span>{' '}
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
