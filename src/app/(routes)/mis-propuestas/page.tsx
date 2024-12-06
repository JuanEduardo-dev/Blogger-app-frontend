'use client'

import Image from 'next/image';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/Shadcn/breadcrumb"

import { LiaSlashSolid } from "react-icons/lia"
import { PiDotOutlineFill } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { TfiComment } from "react-icons/tfi";
import { MdEngineering } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { CiUser } from 'react-icons/ci';
import { IoIosMail } from "react-icons/io";
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { PiTreeStructure } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Shadcn/accordion"

interface User {
  name: string;
  lastName: string;
  mail: string;
  bio: string;
  degreeTitle: string;
}

type Degree = 'No especificado' | 'Estudiante' | 'Bachiller' | 'Licenciado' | 'Magíster' | 'Doctor' | 'Ingeniero' | 'Técnico' | 'Profesor';

const DegreeIcon: React.FC<{ degree: Degree }> = ({ degree }) => {
  switch (degree) {
    case 'Ingeniero':
      return <MdEngineering />;
    case 'Estudiante':
      return <FaUser />;
    case 'Profesor':
      return <FaChalkboardTeacher />;
    case 'Bachiller':
    case 'Licenciado':
    case 'Magíster':
    case 'Doctor':
      return <FaUserGraduate />;
    case 'Técnico':
      return <CiUser />;
    default:
      return <FaUser />;
  }
};

export default function Home() {

  const { data: session } = useSession(); 
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  const degree: Degree = user?.degreeTitle as Degree;

  useEffect(() => {
    // Esta comprobación garantiza que solo se ejecute en el cliente
    if (typeof window !== 'undefined') {
      // Primero, intenta obtener datos de localStorage
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          return;
        } catch (parseError) {
          console.error('Error parsing stored user:', parseError);
        }
      }

      // Si no hay datos en localStorage, realiza la solicitud de fetch
      async function fetchData() {
        try {
          const response = await fetch('/api/user/get');
          const data = await response.json();

          if (response.ok) {
            setUser(data.data);
            localStorage.setItem('user', JSON.stringify(data.data));
          } else {
            setError(data.error);
          }
        } catch (fetchError) {
          console.error('Error:', fetchError);
          setError('Error de servidor');
        }
      }

      fetchData();
    }
  }, []);

  const handleDeleteUser = async () => {
    // Confirmar antes de eliminar
    if (!confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      });

      if (response.ok) {
        // Redirigir después de eliminar
        signOut();
      } else {
        // Manejar errores
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (err) {
      setError('Hubo un error al eliminar la cuenta');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <section className="relative h-96">
        {/* Background Image */}
        <Image 
          src="/images/back-mis-propuestas.png" 
          alt="Background Image" 
          fill
          quality={90}
          priority
          className="absolute inset-0 object-cover z-0 overflow-clip"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-pallette-10-contrast bg-opacity-50 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 h-full w-full text-center flex">
          <div className="animate-fade-in-left max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
            <h1 className="text-3xl lg:text-4xl font-bold max-w-screen-sm lg:max-w-screen-md mb-4">
              Mis Propuestas
            </h1>
            <Breadcrumb>
              <BreadcrumbList className='flex items-center justify-center max-w-screen-sm lg:max-w-screen-md '>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <LiaSlashSolid />
                <BreadcrumbItem>
                  <BreadcrumbPage>Mis propuestas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center max-w-6xl mx-auto mt-2">
        {/* Desktop Only */}
        <div className="lg:w-1/3 relative reveal fade-right mt-6 p-4 space-y-4 order-2 lg:order-1">
          <div className="bg-gray-100 pt-8 pb-8 pr-4 pl-4 border border-gray-300">
            <div className="flex items-center space-x-4">
              <div className="text-pallette-10 absolute top-[-15px] left-1/2 transform -translate-x-1/2 border border-indigo-50 bg-white text-4xl rounded-full w-14 h-14 flex items-center justify-center">
                <DegreeIcon degree={degree} />
              </div>
              {user ? (
              <div className='space-y-4'>
                <div>
                  <h3 className="text-2xl font-bold">{user.name}, {user.lastName}</h3>
                  <p>{user.degreeTitle}</p>
                </div>
                <p className="text-gray-500">{user.bio}</p>
                <div className="mt-4 flex space-x-4">
                  <p className="text-gray-400 flex items-center">
                    <IoIosMail className='mr-2'  size={24} />{user.mail}
                  </p>
                </div>
              </div>
               ) : null}
            </div>
          </div>
          <div className='p-4 border border-gray-300'>
            <div className="flex flex-col items-start">
              <p className="text-xl font-semibold mb-2">Temas de propuestas</p>
              <div className="flex space-x-2 w-full">
                <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>                      
                  <span className='flex items-center gap-2 text-gray-700'>
                    <PiTreeStructure className='text-lg' />
                    Organización política y administrativa
                  </span></AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <span className='flex items-center justify-start gap-2 text-left text-gray-700'>
                    <HiOutlineUserGroup className='text-lg' />
                    Historia y evolución de los movimiento sociales
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className='p-4 border border-gray-300'>
            <div className="flex flex-col items-start">
              <p className="text-xl font-semibold mb-2">Propuestas recientes</p>
              <div className="flex space-x-2 w-full">
                <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
              </div>
            </div>
            
          </div>

          <div className='p-4 border border-gray-300'>
            <div className="flex flex-col items-start">
              <p className="text-xl font-semibold mb-2">Tags</p>
              <div className="flex space-x-2 w-full">
                <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Services Section */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          {/* Desktop View */}
          <div className="lg:grid p-4">
            <div className='flex flex-col justify-start text-gray-600 space-y-2'>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center'>
                  <PiDotOutlineFill  className='text-pallette-10'/>
                  <TfiComment className='mr-1'/>
                  25 Comentarios
                </div>
                <div className='flex items-center'>
                  <PiDotOutlineFill  className='text-pallette-10'/>
                  <IoCalendarOutline className='mr-1'/>
                  3 Diciembre, 2024
                </div>
              </div>
            </div>
            <br />
            <div className="flex justify-between items-center my-8 h-36 border border-gray-200">
              <p>ddsfsdfdsf</p>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}