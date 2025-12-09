'use client';

import { CreateProjectData, MediaType, ProjectStatus, TechStack } from '@/types/project';
import { X } from 'lucide-react';
import { useState } from 'react';
import MediaUpload from './MediaUpload';

interface MediaFile {
  id: string;
  url: string;
  type: MediaType;
  order: number;
  file?: File;
}

interface ProjectFormProps {
  initialData?: CreateProjectData;
  onSubmit: (data: CreateProjectData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<CreateProjectData>(
    initialData || {
      title: '',
      description: '',
      category: '',
      status: ProjectStatus.IN_PROGRESS,
      isFeatured: false,
    }
  );

  const [techStack, setTechStack] = useState<TechStack>(
    initialData?.techStack || {
      frontend: [],
      backend: [],
      database: [],
      deployment: [],
      tools: [],
    }
  );
  const [features, setFeatures] = useState<string[]>(initialData?.features || []);
  const [challenges, setChallenges] = useState<string[]>(initialData?.challenges || []);
  const [learnings, setLearnings] = useState<string[]>(initialData?.learnings || []);
  const [media, setMedia] = useState<MediaFile[]>([]);

  const [newFeature, setNewFeature] = useState('');
  const [newChallenge, setNewChallenge] = useState('');
  const [newLearning, setNewLearning] = useState('');
  const [newTech, setNewTech] = useState({ category: 'frontend', value: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      features: features.length > 0 ? features : undefined,
      challenges: challenges.length > 0 ? challenges : undefined,
      learnings: learnings.length > 0 ? learnings : undefined,
      techStack: Object.values(techStack).some((arr) => arr.length > 0) ? techStack : undefined,
    });
  };

  const addItem = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    items: string[],
    inputSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.trim()) {
      setter([...items, value.trim()]);
      inputSetter('');
    }
  };

  const removeItem = (
    index: number,
    items: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(items.filter((_, i) => i !== index));
  };

  const addTechStackItem = () => {
    if (newTech.value.trim() && newTech.category) {
      const category = newTech.category as keyof TechStack;
      setTechStack({
        ...techStack,
        [category]: [...(techStack[category] || []), newTech.value.trim()],
      });
      setNewTech({ category: 'frontend', value: '' });
    }
  };

  const removeTechStackItem = (category: keyof TechStack, index: number) => {
    setTechStack({
      ...techStack,
      [category]: (techStack[category] || []).filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Category *</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Status *</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          >
            <option value={ProjectStatus.IN_PROGRESS}>In Progress</option>
            <option value={ProjectStatus.DEVELOPMENT}>Development</option>
            <option value={ProjectStatus.PRODUCTION}>Production</option>
            <option value={ProjectStatus.UPDATED}>Updated</option>
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Client</label>
          <input
            type="text"
            value={formData.client || ''}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Duration</label>
          <input
            type="text"
            placeholder="e.g., 3 months"
            value={formData.duration || ''}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Team Size</label>
          <input
            type="number"
            min="1"
            value={formData.teamSize || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                teamSize: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary rounded focus:ring-2 focus:ring-primary"
            />
            <span className="ml-2 text-xs sm:text-sm font-medium">Featured Project</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">GitHub URL</label>
          <input
            type="url"
            value={formData.githubUrl || ''}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Live URL</label>
          <input
            type="url"
            value={formData.liveUrl || ''}
            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Features</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyPress={(e) =>
              e.key === 'Enter' &&
              (e.preventDefault(), addItem(newFeature, setFeatures, features, setNewFeature))
            }
            placeholder="Add a feature and press Enter"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={() => addItem(newFeature, setFeatures, features, setNewFeature)}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200 text-sm sm:text-base"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {features.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs sm:text-sm"
            >
              {feature}
              <button type="button" onClick={() => removeItem(index, features, setFeatures)}>
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Tech Stack</label>
        <div className="flex flex-col sm:flex-row gap-2 mb-2 sm:mb-3">
          <select
            value={newTech.category}
            onChange={(e) => setNewTech({ ...newTech, category: e.target.value })}
            className="px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="deployment">Deployment</option>
            <option value="tools">Tools</option>
          </select>
          <input
            type="text"
            value={newTech.value}
            onChange={(e) => setNewTech({ ...newTech, value: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStackItem())}
            placeholder="Add technology and press Enter"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={addTechStackItem}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-secondary to-accent hover:from-secondary-hover hover:to-accent-hover text-white rounded-lg transition-all duration-200 text-sm sm:text-base"
          >
            Add
          </button>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {(Object.keys(techStack) as Array<keyof TechStack>).map(
            (category) =>
              techStack[category] &&
              techStack[category]!.length > 0 && (
                <div key={category}>
                  <h4 className="text-xs sm:text-sm font-semibold capitalize mb-1.5 sm:mb-2">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {techStack[category]!.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs sm:text-sm"
                      >
                        {tech}
                        <button type="button" onClick={() => removeTechStackItem(category, index)}>
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* Challenges */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Challenges</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newChallenge}
            onChange={(e) => setNewChallenge(e.target.value)}
            onKeyPress={(e) =>
              e.key === 'Enter' &&
              (e.preventDefault(),
              addItem(newChallenge, setChallenges, challenges, setNewChallenge))
            }
            placeholder="Add a challenge and press Enter"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={() => addItem(newChallenge, setChallenges, challenges, setNewChallenge)}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white rounded-lg transition-all duration-200 text-sm sm:text-base"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {challenges.map((challenge, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 rounded-full text-xs sm:text-sm"
            >
              {challenge}
              <button type="button" onClick={() => removeItem(index, challenges, setChallenges)}>
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Learnings */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Learnings</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newLearning}
            onChange={(e) => setNewLearning(e.target.value)}
            onKeyPress={(e) =>
              e.key === 'Enter' &&
              (e.preventDefault(), addItem(newLearning, setLearnings, learnings, setNewLearning))
            }
            placeholder="Add a learning and press Enter"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={() => addItem(newLearning, setLearnings, learnings, setNewLearning)}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-secondary to-primary hover:from-secondary-hover hover:to-primary-hover text-white rounded-lg transition-all duration-200 text-sm sm:text-base"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {learnings.map((learning, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200 rounded-full text-xs sm:text-sm"
            >
              {learning}
              <button type="button" onClick={() => removeItem(index, learnings, setLearnings)}>
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Media Upload */}
      <MediaUpload media={media} onChange={setMedia} maxFiles={10} />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg disabled:opacity-50 transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}
