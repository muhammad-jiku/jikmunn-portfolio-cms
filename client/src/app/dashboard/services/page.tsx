'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ServiceForm from '@/components/services/ServiceForm';
import ServicesTable from '@/components/services/ServicesTable';
import { servicesApi } from '@/lib/api/services';
import { CreateServiceData, Service, UpdateServiceData } from '@/types/service';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | undefined>();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await servicesApi.getServices();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingService(undefined);
    setShowForm(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateServiceData | UpdateServiceData) => {
    if (editingService) {
      await servicesApi.updateService(editingService.id, data);
    } else {
      await servicesApi.createService(data as CreateServiceData);
    }
    await fetchServices();
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await servicesApi.deleteService(id);
      await fetchServices();
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-zinc-500 dark:text-zinc-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Services
            </h1>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
              Manage your portfolio services
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Add Service
          </button>
        </div>

        <ServicesTable services={services} onEdit={handleEdit} onDelete={handleDelete} />

        {showForm && (
          <ServiceForm
            service={editingService}
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
