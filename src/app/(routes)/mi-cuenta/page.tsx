'use client'

import Image from 'next/image';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/Shadcn/breadcrumb"

import React, { useEffect, useState } from 'react';
import { useUser } from '@/app/context/UserContext';

import { Button } from '@/components/ui/Shadcn/button';
import { LiaSlashSolid } from 'react-icons/lia';
import { signOut } from 'next-auth/react';

interface Degree {
  id: number;
  title: string;
}

export default function UpdateProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    bio: '',
    degreeId: ''
  });
  
  const { user, setUser } = useUser();
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Bloquear el deslizamiento
      document.body.style.overflow = 'hidden';
    } else {
      // Restaurar el deslizamiento
      document.body.style.overflow = 'auto';
    }

    // Limpiar al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const response = await fetch('/api/degrees');
        if (response.ok) {
          const data = await response.json();
          setDegrees(data);
        }
      } catch (error) {
        console.error('Failed to fetch degrees', error);
      }
    };
  
    fetchDegrees();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDeleteUser = async (e: React.MouseEvent) => {
    setLoadingDelete(true);
    setError('');
    e.preventDefault(); 
    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      });

      if (response.ok) {
        signOut();
      } else {
        const errorText = await response.text();
        setError(errorText);
      }
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    // Filtrar solo los campos que tienen valor
    const updateData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => {
        return value !== '';
      })
    );

    try {
      const response = await fetch('/api/user/put', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(
          result.error || 
          result.detail || 
          'Error al actualizar el perfil'
        );
      }
  
      // Actualizar solo los campos que han cambiado
      setUser(prevUser => {
        if (!prevUser) return prevUser;
        
        return {
          ...prevUser,
          ...(updateData.name && { name: updateData.name }),
          ...(updateData.lastName && { lastName: updateData.lastName }),
          ...(updateData.bio && { bio: updateData.bio }),
          ...(updateData.degreeId && { degreeId: updateData.degreeId })
        };
      });
      
      sessionStorage.clear();
      localStorage.clear();

      setFormData(prevState => ({ ...prevState, name: '', lastName: '', bio: '' }));
      
      setSuccess(result.message || 'Perfil actualizado exitosamente');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Hubo un error al actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative h-64">
        {/* Background Image */}
        <Image 
          src="/images/back-perfil.jpg" 
          alt="Background Image" 
          fill
          priority
          className="absolute inset-0 object-cover z-0 overflow-clip"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-pallette-10-contrast bg-opacity-50 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 h-full w-full text-center flex">
          <div className="animate-fade-in-left max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
            <h1 className="text-3xl lg:text-4xl font-bold max-w-screen-sm lg:max-w-screen-md mb-4">
              Mi cuenta
            </h1>
            <Breadcrumb>
              <BreadcrumbList className='flex items-center justify-center max-w-screen-sm lg:max-w-screen-md '>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <LiaSlashSolid />
                <BreadcrumbItem>
                  <BreadcrumbPage>Mi cuenta</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>
      <div className="max-w-7xl lg:mx-auto m-4 lg:my-10 p-6 bg-white border border-gray-300 flex flex-col lg:flex-row">
        <div className='lg:w-2/3'>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1>Edita tu cuenta</h1>
            <hr />
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded-md text-sm">
                {success}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombres
              </label>
              <input
                type="text"
                id="name"
                name="name"
                // Establecemos el valor del input. Si no hay datos en formData, usamos los datos de 'user'
                value={formData.name || user?.name || ''}
                onChange={handleChange}
                placeholder={user?.name || 'Cargando nombres...'}
                className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500
                  transition-colors duration-300 ease-in-out custom-placeholder"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Apellidos
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                // Establecemos el valor del input de la misma forma, usando formData, luego 'user' y por último una cadena vacía
                value={formData.lastName || user?.lastName || ''}
                onChange={handleChange}
                placeholder={user?.lastName || 'Cargando apellidos...'}
                className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500
                  transition-colors duration-300 ease-in-out custom-placeholder"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                Biografía
              </label>
              <textarea
                id="bio"
                name="bio"
                // En este caso, igual aseguramos que el valor del textarea esté en 'formData' o 'user'
                value={formData.bio || user?.bio || ''}
                onChange={handleChange}
                placeholder={user?.bio || 'Sin biografía'}
                rows={4}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500
                  transition-colors duration-300 ease-in-out custom-placeholder"
              />
              <p className="text-xs text-gray-500 mt-1">
                Máximo 500 caracteres
              </p>
            </div>

            <div>
              <label htmlFor="degreeId" className="block text-sm font-medium text-gray-700 mb-2">
                Grado Académico
              </label>
              <select
                id="degreeId"
                name="degreeId"
                value={formData.degreeId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
                focus:outline-none focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-300 ease-in-out"
              >
                <option value="">{user?.degreeTitle || 'Seleccione una opción'}</option>
                {degrees.map((degree) => (
                  <option key={degree.id} value={degree.id}>
                    {degree.title}
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-md flex justify-center
                transition-all duration-300 
              
                ${loading ? 'bg-gray-400' 
                  : 'bg-pallette-10 hover:bg-pallette-10-contrast focus:outline-none focus:ring-2 focus:ring-pallette-10 focus:ring-offset-2'}`}
            >
              {loading ? (
                <>
                  <svg aria-hidden="true" className="inline w-8 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                </>
              ) : (
                'Actualizar Perfil'
              )}
            </button>
          </form>
        </div>
        <div className='block lg:hidden'>
          <br /><hr /><br />
        </div>
        <div className='lg:w-1/3 lg:ml-5 lg:border-l-2 lg:border-gray-100'>
          <div className='flex justify-between lg:p-4'>
            <div className='mr-2 lg:mr-4'>
              <p className='font-semibold'>Eliminar cuenta</p>
              <p className='text-sm'>Si eliminas tu cuenta todas tus propuestas se eliminarán por completo.</p>
            </div>
            <div className='items-center pt-5 lg:pt-3'>
            <Button onClick={openDialog} className='bg-red-600 hover:bg-red-800'>Eliminar</Button>
            {/* modal */}
            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-80 lg:w-2/6 p-6">
                  {/* Header del modal */}
                  <h2 className="text-xl font-semibold mb-4">¿Estás completamente seguro?</h2>
                  <p className="text-gray-700 mb-6">
                    Esta acción no se puede deshacer. Eliminará permanentemente su cuenta
                    y eliminará sus datos de nuestros servidores.
                  </p>

                  {/* Footer con botones */}
                  <div className="flex justify-end space-x-4">
                    <button 
                      onClick={closeDialog}
                      className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded transition-all duration-200 ease-in-out"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="button"
                      disabled={loadingDelete}
                      className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
                      onClick={handleDeleteUser}
                    >
                      {loadingDelete ? (
                        <svg
                          aria-hidden="true"
                          className="inline w-8 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-900"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      ) : (
                        'Continuar'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}