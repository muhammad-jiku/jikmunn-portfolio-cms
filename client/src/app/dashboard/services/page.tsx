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
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Services</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your portfolio services</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
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
