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
import { BiDislike, BiLike} from "react-icons/bi";
import { IoIosMail } from "react-icons/io";
import { SetStateAction, useEffect, useState } from 'react';
import { Degree } from '@/types/user';
import { CreatePublicationForm } from "@/components/ui/mis-propuestas/CreatePublicationForm";
import { PiDotOutlineFill, PiTreeStructure } from "react-icons/pi";
import { DegreeIcon } from "@/utils/user/degreeIcon"
import { IoAddOutline, IoCalendarOutline } from "react-icons/io5";
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useUser } from '@/app/context/UserContext';
import { useUserDataPub } from '@/hooks/publications/userDataPub';
import { forTopicsUserPageConfig } from '@/utils/publications/forTopicUserPageConfig';
import Loader from '@/components/ui/Basics/Loader/Loader';
import { MdOutlineTopic } from 'react-icons/md';


export default function Home() {
  const { toast } = useToast()
  const { publications: userPub, isLoading: userPubDataLoad, mutate: userPubDataMutate,
    sortedPubUserByDate, sortedPubUserByPageDate, tagUserPubCounts, sortedPubUserMostLiked
  } = useUserDataPub();
  const [step, setStep] = useState(1);
  const totalSteps = 2;
  const { user } = useUser();
  const degree: Degree = user?.degreeTitle as Degree;

  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de publicaciones por página

  // Calcular el índice de inicio y fin para las publicaciones en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedPubUserMostLiked.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(sortedPubUserMostLiked.length / itemsPerPage);

  // Función para cambiar a una página específica
  const goToPage = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const goToStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= totalSteps) {
      setStep(newStep);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    // Verifica si estamos en el cliente (para evitar errores en el servidor)
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const stepParam = searchParams.get('step');  // Obtén el valor de "step" desde la URL
      if (stepParam) {
        setStep(Number(stepParam));  // Actualiza el estado "step"
      }
    }
  }, []);

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return renderMain();
      case 2:
        return renderAdd();
      default:
        return null;
    }
  };
  
  const handleSuccessCreate = async () => {
    goToStep(step - 1);
    await userPubDataMutate();
    toast({
      variant: "success",
      title: "Propuesta creada",
      description: "Ahora los usuarios podrán reaccionar y comentar a tu propuesta."
    })
  };
  //RENDERS
  const renderMain = () => (
    <>
      {/* Desktop Only */}
      <div className="lg:w-1/3 relative reveal fade-right mt-6 p-4 space-y-4 order-2 lg:order-1">
        <div className="bg-gray-100 pt-8 pb-8 pr-4 pl-4 border border-gray-300">
          <div className="flex items-center">
            <div className="text-gray-600 absolute top-[-15px] left-1/2 transform -translate-x-1/2 border border-gray-300 bg-white text-4xl rounded-full w-14 h-14 flex items-center justify-center">
              <DegreeIcon degree={degree} size="28px"/>
            </div>
            {!user ? (
            <div className='flex items-center justify-center w-full mt-4'>
              <Loader />
            </div>
            ) : (
              <div className='space-y-4 mx-4'>
                <div>
                  <h3 className="text-2xl font-bold">{user?.name} {user?.lastName}</h3>
                  <p className='text-gray-800'>{degree}</p>
                </div>
                <div className="mt-4 flex space-x-4">
                  <p className="text-gray-400 flex items-center">
                    <IoIosMail className='mr-2'  size={24} />{user?.mail}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='p-4 border border-gray-300'>
          <div className="flex flex-col items-start">
            <p className="text-xl font-semibold mb-2">Propuestas creadas</p>
            <div className="flex space-x-2 w-full">
              <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
              <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
            </div>
          </div>

          {userPub.length === 0 && !userPubDataLoad ? (
            <div className="text-left text-gray-500 mt-4">
              No tienes propuestas
            </div>
          ) : (
          // Filtramos las primeras dos páginas (pageId)
          Object.entries(sortedPubUserByPageDate)
            .map(([pageId, pagePublications]) => {
              const pageConfig = forTopicsUserPageConfig[pageId as unknown as keyof typeof forTopicsUserPageConfig] || {
                icon: <PiTreeStructure className='text-lg' />,
                title: `Página ${pageId}`,
              };
              return (
                <div key={pageId} className='flex items-center justify-between w-full gap-4 mt-4'>
                  <span className='flex items-center text-gray-700'>
                    {pageConfig.icon}
                  </span>
                  <span className='text-left'>
                    {pageConfig.title}
                  </span>
                  <span className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs ml-2">
                    {pagePublications.length}
                  </span>
                </div>
              );
            })
          )}

        </div>
        
        <div className='p-4 border border-gray-300'>
          <div className="flex flex-col items-start">
            <p className="text-xl font-semibold mb-2">Propuestas recientes</p>
            <div className="flex space-x-2 w-full">
              <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
              <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
            </div>
          </div>
            {userPub.length === 0 && !userPubDataLoad ? (
              <div className="text-left text-gray-500 mt-4">
                No tienes propuestas
              </div>
            ) : (     
              <div className={`flex flex-col space-y-4 ${!userPubDataLoad ? 'mt-4' : ''}`}>
              {/* Aquí obtenemos y mostramos solo las últimas 3 publicaciones */}
              {sortedPubUserByDate.slice(0, 3).map((pub) => (
                <div key={pub.id} className="flex flex-col space-y-2">
                  <hr />
                  <div className='flex items-center text-sm text-gray-500 mb-2'>
                    <PiDotOutlineFill  className='text-pallette-10'/>
                    <MdOutlineTopic className='mr-1 '/>
                    {
                      pub?.page.id === 1 ? (
                        <Link href="/temas/organizacion-politica-y-administrativa-del-peru">
                          Organización Política y Administrativa
                        </Link>
                      ) : pub?.page.id === 2 ? (
                        <Link href="/temas/evolucion-de-los-movimientos-sociales-en-el-peru">
                          Evolución de los Movimientos Sociales
                        </Link>
                      ) : null
                    }
                  </div>  
                  {/* Enlace a la publicación */}
                  <Link className="hover:underline hover:text-blue-700" href={`/propuesta?post=${pub.id}`}>
                    <h3 className="text-lg font-semibold">{pub.title}</h3>
                  </Link>
                  {/* Contenido resumido */}
                  <div
                      className="text-sm text-gray-600 mb-2 leading-relaxed"
                      dangerouslySetInnerHTML={{
                      __html: pub.content.length > 200 ? pub.content.substring(0, 200) + '...' : pub.content,
                    }}
                  />
                  {/* Fecha, autor, likes, dislikes */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div>Fecha: {new Date(pub.date).toLocaleString()}</div>
                    {/* Likes y Dislikes */}
                    <div className="flex items-center justify-end">
                      <Link className='flex space-x-6' href={`/propuesta?post=${pub?.id}`}>
                        {/* Botón de "Me gusta" */}
                        <div className="flex items-center text-gray-700 space-x-1 opacity-50">
                          <BiLike />
                          <span>{pub.likes_count}</span>
                        </div>
                        {/* Botón de "No me gusta" */}
                        <div className="flex items-center text-gray-700 space-x-1 opacity-50 ">
                          <BiDislike />
                          <span>{pub.dislikes_count}</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  {/* Etiquetas */}
                  {pub.tags && pub.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {pub.tags.map((tag) => (
                        <span 
                          key={tag.id} 
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {tag.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              </div>
            )}
        </div>

        <div className='p-4 border border-gray-300'>
          <div className="flex flex-col items-start">
            <p className="text-xl font-semibold mb-2">Tags Usados</p>
            <div className="flex space-x-2 w-full">
              <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
              <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
            </div>
            {userPub.length === 0 && !userPubDataLoad ? (
              <div className="text-left text-gray-500 mt-4">
                No usaste tags
              </div>
            ) : (
              <div className={`flex flex-col ${!userPubDataLoad ? 'mt-4' : ''}`}>
              {/* Mostrar los tags y el número de publicaciones */}
              {tagUserPubCounts && Object.keys(tagUserPubCounts).length > 0 ? (
                Object.keys(tagUserPubCounts).map((tag) => (
                  <div key={tag} className="flex items-center text-sm text-gray-700 mb-2">
                    <span className="font-semibold">{tag}</span>
                    <span className="ml-2 text-gray-500">({tagUserPubCounts[tag]})</span>
                  </div>
                ))
              ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full lg:w-2/3 order-1 lg:order-2">
        {/* Desktop View */}
        <div className="p-4 lg:mt-6">
          <div className='bg-white'>
            <div className='space-y-4'>
              <button onClick={() => goToStep(step + 1)}  className='border border-pallette-10 h-9 gap-4 px-4 hover:bg-pallette-10 hover:text-white text-pallette-10 transition-all duration-200 ease-in-out'>
                <div className='flex items-center'>  
                  <IoAddOutline className='w-4 h-4 mr-2'/>
                  Nueva propuesta
                </div>
              </button>
              {userPubDataLoad ? (
              <div className='flex items-center p-8 justify-center border border-gray-300'>
                <Loader />
              </div>
              ) : null}
              {/* Mostrar todas las publicaciones */}
              {userPub.length === 0 && !userPubDataLoad ? (
                <p>No hay propuestas disponibles.</p>
              ) : (
                currentItems.map((pub) => (
                  <div key={pub.id} className="border border-gray-300 p-4 mb-4 shadow-sm space-y-4">
                    <div className='flex flex-wrap md:space-x-4'> 
                      <div className='flex items-center text-sm text-gray-500 mb-2'>
                        <PiDotOutlineFill  className='text-pallette-10'/>
                        <MdOutlineTopic className='mr-1 '/>
                        {
                          pub?.page.id === 1 ? (
                            <Link href="/temas/organizacion-politica-y-administrativa-del-peru">
                              Organización Política y Administrativa
                            </Link>
                          ) : pub?.page.id === 2 ? (
                            <Link href="/temas/evolucion-de-los-movimientos-sociales-en-el-peru">
                              Evolución de los Movimientos Sociales
                            </Link>
                          ) : null
                        }
                      </div>      
                      <div className='flex items-center text-sm text-gray-500 mb-2'>
                        <PiDotOutlineFill  className='text-pallette-10'/>
                        <IoCalendarOutline className='mr-1 '/>
                        {new Date(pub.date).toLocaleString()}
                      </div>
                    </div>
                    <Link className="hover:underline hover:text-blue-700" href={`/propuesta?post=${pub.id}`}>
                      <h3 className="text-xl font-semibold">{pub.title}</h3>
                    </Link>
                    <div
                      className="text-sm text-gray-600 mb-2 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: pub.content.length > 500 ? pub.content.substring(0, 500) + '...' : pub.content,
                      }}
                    />
                    {/* Likes y Dislikes */}
                    <div className="flex items-center">
                      <Link className='flex space-x-6' href={`/propuesta?post=${pub?.id}`}>
                        <div className="flex items-center text-gray-700 space-x-1 opacity-50">
                          <BiLike />
                          <span>{pub.likes_count}</span>
                        </div>
                        <div className="flex items-center text-gray-700 space-x-1 opacity-50">
                          <BiDislike />
                          <span>{pub.dislikes_count}</span>
                        </div>
                      </Link>
                    </div>
                    {/* Mostrar tags asociados */}
                    <div className="mt-2">
                      {pub.tags && pub.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {pub.tags.map((tag) => (
                            <span key={tag.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                              {tag.title}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">No tiene tags asociados</span>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center mt-4">
                  {/* Botones de paginación */}
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => {
                        goToPage(pageNumber);
                        window.scrollTo(0, 0);
                      }}
                      className={`px-4 py-2 m-1 rounded-md ${currentPage === pageNumber ? 'bg-pallette-10 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderAdd = () => (
    <>
      {/* Desktop Only */}
      <div className="lg:w-2/3 relative reveal fade-right p-4 space-y-4">
        <button onClick={() => goToStep(step - 1)}  className='text-sm text-blue-600 hover:text-blue-500 transition-colors cursor-pointer'>
          ← Volver
        </button>
        <div className='p-4 border border-gray-300'>
          <div className="flex flex-col items-start">
            <p className="text-xl font-semibold mb-2">Crea tu propuesta</p>
            <div className="flex space-x-2 w-full">
              <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
            </div>
            <div className='mt-4 w-full'>
              <CreatePublicationForm onSuccess={handleSuccessCreate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <section className="relative h-60">
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

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center max-w-7xl mx-auto mt-2">
        {renderStep(step)}
      </div>
    </>
  );
}