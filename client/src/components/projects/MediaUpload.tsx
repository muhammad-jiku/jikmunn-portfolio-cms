'use client';

import { MediaType } from '@/types/project';
import { Image as ImageIcon, Upload, Video, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface MediaFile {
  id: string;
  url: string;
  type: MediaType;
  order: number;
  file?: File;
}

interface MediaUploadProps {
  media: MediaFile[];
  onChange: (media: MediaFile[]) => void;
  maxFiles?: number;
}

export default function MediaUpload({ media, onChange, maxFiles = 10 }: MediaUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    if (media.length + files.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      return isImage || isVideo;
    });

    if (validFiles.length !== files.length) {
      alert('Only image and video files are allowed');
    }

    const newMedia: MediaFile[] = validFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? MediaType.IMAGE : MediaType.VIDEO,
      order: media.length + index,
      file,
    }));

    onChange([...media, ...newMedia]);
  };

  const removeMedia = (id: string) => {
    const updatedMedia = media
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, order: index }));
    onChange(updatedMedia);
  };

  const moveMedia = (fromIndex: number, toIndex: number) => {
    const updatedMedia = [...media];
    const [movedItem] = updatedMedia.splice(fromIndex, 1);
    updatedMedia.splice(toIndex, 0, movedItem);
    const reorderedMedia = updatedMedia.map((item, index) => ({ ...item, order: index }));
    onChange(reorderedMedia);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
        Media (Images/Videos)
      </label>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors ${
          dragActive
            ? 'border-primary bg-purple-50 dark:bg-purple-900/20'
            : 'border-zinc-300 dark:border-zinc-700'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleChange}
          className="hidden"
        />

        <Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-zinc-400" />
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-2">
          Drag & drop files here, or click to select
        </p>
        <button
          type="button"
          onClick={onButtonClick}
          className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200"
        >
          Select Files
        </button>
        <p className="text-[10px] sm:text-xs text-zinc-500 mt-2">
          Max {maxFiles} files. Supported: Images & Videos
        </p>
      </div>

      {/* Media Preview Grid */}
      {media.length > 0 && (
        <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {media.map((item, index) => (
            <div
              key={item.id}
              className="relative group border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                moveMedia(fromIndex, index);
              }}
            >
              {/* Media Content */}
              <div className="aspect-video relative">
                {item.type === MediaType.IMAGE ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video src={item.url} className="w-full h-full object-cover" />
                )}

                {/* Type Badge */}
                <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black/50 rounded text-[10px] sm:text-xs text-white flex items-center gap-1">
                  {item.type === MediaType.IMAGE ? (
                    <ImageIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  ) : (
                    <Video className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  )}
                  {item.type}
                </div>

                {/* Order Badge */}
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-black/50 rounded-full flex items-center justify-center text-[10px] sm:text-xs text-white font-semibold">
                  {index + 1}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeMedia(item.id)}
                  className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Reorder Hint */}
              <div className="p-1.5 sm:p-2 text-[10px] sm:text-xs text-center text-zinc-600 dark:text-zinc-400">
                Drag to reorder
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
