'use client';

import { cn } from '@/lib/utils';
import { FileUp, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

interface FileWithPreview extends File {
  preview?: string;
}

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number; // in bytes
  disabled?: boolean;
  existingFiles?: string[];
  onRemoveExisting?: (fileUrl: string) => void;
  className?: string;
}

export function FileUpload({
  onFilesChange,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    'application/pdf': ['.pdf'],
  },
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB default
  disabled,
  existingFiles = [],
  onRemoveExisting,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setErrors([]);

      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const newErrors: string[] = [];
        rejectedFiles.forEach((rejection) => {
          rejection.errors.forEach((error) => {
            if (error.code === 'file-too-large') {
              newErrors.push(
                `${rejection.file.name} is too large (max ${(maxSize / 1024 / 1024).toFixed(1)}MB)`
              );
            } else if (error.code === 'file-invalid-type') {
              newErrors.push(`${rejection.file.name} has invalid file type`);
            } else {
              newErrors.push(`${rejection.file.name}: ${error.message}`);
            }
          });
        });
        setErrors(newErrors);
      }

      // Process accepted files
      if (acceptedFiles.length > 0) {
        const newFiles = acceptedFiles.map((file) => {
          const fileWithPreview = file as FileWithPreview;
          // Create preview for images
          if (file.type.startsWith('image/')) {
            fileWithPreview.preview = URL.createObjectURL(file);
          }
          return fileWithPreview;
        });

        const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
        setFiles(updatedFiles);
        onFilesChange(updatedFiles);
      }
    },
    [files, maxFiles, maxSize, onFilesChange]
  );

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  // @ts-expect-error - react-dropzone type mismatch with strict TypeScript config
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    disabled: disabled || files.length + existingFiles.length >= maxFiles,
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
          disabled || files.length + existingFiles.length >= maxFiles
            ? 'cursor-not-allowed opacity-50'
            : ''
        )}
      >
        <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
        <FileUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        {isDragActive ? (
          <p className="text-blue-600 dark:text-blue-400 font-medium">Drop the files here...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Drag & drop files here, or click to select
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Max {maxFiles} files • Max {(maxSize / 1024 / 1024).toFixed(1)}MB each
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {files.length + existingFiles.length}/{maxFiles} files selected
            </p>
          </div>
        )}
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-red-600 dark:text-red-400">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Existing Files */}
      {existingFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Existing Files</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {existingFiles.map((fileUrl, index) => (
              <div
                key={`existing-${index}`}
                className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <Image
                  src={fileUrl}
                  alt={`Existing file ${index + 1}`}
                  width={128}
                  height={128}
                  className="w-full h-32 object-cover"
                />
                {onRemoveExisting && (
                  <button
                    type="button"
                    onClick={() => onRemoveExisting(fileUrl)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New File Previews */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            New Files ({files.length})
          </h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`new-${index}`}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                {file.preview ? (
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                    <FileUp className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
