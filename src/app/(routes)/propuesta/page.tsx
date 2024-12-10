'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Publication } from '@/types/publications';
import { Degree, degreeMap } from '@/types/user';
import { DegreeIcon } from '@/utils/user/degreeIcon';
import { IoIosMail } from 'react-icons/io';
import HyvorComments, { HyvorCommentCount } from '@/components/ui/HyvorComments/HyvorComments';
import { PiDotOutlineFill } from 'react-icons/pi';
import { TfiComment } from 'react-icons/tfi';
import { IoCalendarOutline } from 'react-icons/io5';
import { BiDislike, BiLike } from 'react-icons/bi';
import { MdDelete, MdModeEdit, MdOutlineTopic } from "react-icons/md";
import Loader from '@/components/ui/Basics/Loader/Loader';
import PublicationReactions from '@/components/ui/propuesta/PublicationReactions/PublicationReactions';
import { useSession } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';
import EditPublicationForm from '@/components/ui/propuesta/EditPublicationForm/EditPublicationForm';
import { useUser } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PublicationDetailPage() {
  const router = useRouter();
  
  const websiteId = 12265;

  const searchParams = useSearchParams();
  const publicationId = searchParams.get('post');
  const postId = searchParams.get('post') as string;

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { data: session } = useSession();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const { user } = useUser();
  const totalSteps = 2;

  const degree: Degree = (publication?.user.degreeId !== undefined && publication?.user.degreeId !== null)
    ? degreeMap[publication.user.degreeId] || 'Sin grado académico'
    : 'Sin grado académico';

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

  const goToStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= totalSteps) {
      setStep(newStep);
      window.scrollTo(0, 0);
    }
  };

  const handleSuccessEdit = async () => {
    // goToStep(step - 1);
    toast({
      variant: "success",
      title: "Propuesta actualizada",
      description: "Todos los cambios fueron guardados correctamente."
    });
  
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleDeletePub = async (e: React.MouseEvent) => {
    setLoadingDelete(true);
    e.preventDefault();
  
    try {
      console.log('Deleting publication with ID:', publicationId); // Log the ID
  
      // Send DELETE request to the server
      const response = await fetch(`/api/publications/me/delete?post=${publicationId}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        toast({
          variant: "success",
          title: "Propuesta eliminada",
          description: "Se eliminaron todos los comentarios y reacciones de tu propuesta."
        })
        router.push('/mis-propuestas');
      }

    } finally {
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    if (!publicationId) {
      setLoading(false);
      return;
    }

    const fetchPublication = async () => {
      try {
        const response = await fetch(`/api/publications/all/by-id?post=${publicationId}`);
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.error || 'Error al obtener la publicación');
        }
        setPublication(responseData.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [publicationId]);

  // Verificar si publication.date existe y formatearla
  const publicationDate = publication?.date;
  let formattedDate = '';
  if (publicationDate) {
    const date = new Date(publicationDate);
    formattedDate = date.toLocaleString('es-ES', {
      weekday: 'long', // Día de la semana
      year: 'numeric', // Año
      month: 'long', // Mes
      day: 'numeric', // Día
      hour: 'numeric', // Hora
      minute: 'numeric', // Minutos
      second: 'numeric', // Segundos
    });
  }
  
  //RENDERS
  const renderMain = () => (
    <>
      {/* Services Section */}
      <div className="w-full lg:w-2/3">
        {/* Desktop View */}
        <div className="p-4 lg:mt-6">
          <div className='flex flex-col justify-start text-gray-600 space-y-2'>
            <div className='flex items-center space-y-2 sm:space-y-0 lg:space-x-2 flex-wrap'>
              <div className='flex items-center'>
                <PiDotOutlineFill  className='text-pallette-10'/>
                <TfiComment className='mr-1'/>
                <HyvorCommentCount 
                  websiteId={websiteId} 
                  pageId={postId} 
                />
              </div>
              <div className='flex items-center'>
                <PiDotOutlineFill  className='text-pallette-10'/>
                <IoCalendarOutline className='mr-1'/>
                {formattedDate}
              </div>
            </div>
          </div>
          <div className='bg-white'>
            <div className='space-y-4 mt-4'>
              {!publication && !loading ? (
                <p>No hay propuestas disponibles.</p>
              ) : (
                <div className="border border-gray-300 p-4 mb-4 shadow-sm">
                  <div className='flex justify-between'>
                    <div className='flex items-center text-sm text-gray-500 mb-2'>
                      <PiDotOutlineFill  className='text-pallette-10'/>
                      <MdOutlineTopic className='mr-1 '/>
                      {
                        publication?.page.id === 1 ? (
                          <Link href="/temas/organizacion-politica-y-administrativa-del-peru">
                            Organización Política y Administrativa
                          </Link>
                        ) : publication?.page.id === 2 ? (
                          <Link href="/temas/evolucion-de-los-movimientos-sociales-en-el-peru">
                            Evolución de los Movimientos Sociales
                          </Link>
                        ) : null
                      }
                    </div>  
                    <div>
                      {/* Solo mostramos el botón de eliminar si no está cargando y hay una publicación */}
                      {!loading && publication && publication?.user?.mail === user?.mail && (
                        <button onClick={openDialog}>
                          <div className='flex items-center'>  
                            <MdDelete className='h-5 w-5'/>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex'>
                      <h3 className="text-lg font-semibold">{publication?.title}</h3>
                      {/* Solo mostramos el botón de editar si no está cargando y hay una publicación */}
                      {!loading && publication && publication?.user?.mail === user?.mail && (
                        <button onClick={() => goToStep(step + 1)}>
                          <div className='flex items-center'>  
                            <MdModeEdit className='h-5 w-5 ml-2'/>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                  <div
                    className="text-sm text-gray-600 mb-2 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: publication?.content || '',
                    }}
                  />
                  {/* Solo mostramos el componente si el usuario está autenticado */}
                  {session ? (
                    <div className="flex items-center space-x-6">
                      {publicationId && <PublicationReactions publicationId={publicationId} />}
                    </div>
                  ) : (
                    <Link href={'/auth/login'}>
                      <div className='text-md justify-center flex mb-2'>
                        <div className='font-semibold'>¿Qué te pareció esta propuesta?</div>
                      </div>
                      <div className="flex items-center space-x-6 justify-center text-xl">
                        <div className="flex items-center text-gray-700 space-x-1 opacity-50">
                          <BiLike />
                          <span>{publication?.likes_count}</span>
                        </div>
                        <div className="flex items-center text-gray-700 space-x-1 opacity-50">
                          <BiDislike />
                          <span>{publication?.dislikes_count}</span>
                        </div>
                      </div>
                    </Link>
                  )}
                  <hr className='my-4'/>
                  <div className="mt-2">
                    {publication?.tags && publication?.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {publication?.tags.map((tag) => (
                          <span key={tag.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                            {tag.title}
                          </span>
                        ))}
                      </div>
                    ) : (
                      !loading && <span className="text-gray-500">No tiene tags asociados</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 lg:col-span-4">
          <HyvorCommentCount 
            websiteId={websiteId} 
            pageId={postId} 
          />
          {/* Sección de comentarios */}
          <HyvorComments 
            websiteId={websiteId}
            pageId={postId}
          />
        </div>
      </div>
      {/* Desktop Only */}
      <div className="lg:w-1/3 relative reveal fade-right mt-6 lg:mt-16 p-4 space-y-4">
        <div className="bg-gray-100 pt-8 pb-8 pr-4 pl-4 border border-gray-300">
          <div className="flex items-center">
            <div className="text-gray-600 absolute top-[-15px] left-1/2 transform -translate-x-1/2 border border-gray-300 bg-white text-4xl rounded-full w-14 h-14 flex items-center justify-center">
              <DegreeIcon degree={degree} size="28px"/>
            </div>
            {loading ? (
              <div className='flex items-center justify-center w-full mt-4'>
                <Loader />
              </div>
            ) : (
              <div className='space-y-4 mx-4'>
                <div>
                  <h3 className="text-2xl font-bold">{publication?.user.name} {publication?.user.lastName}</h3>
                  <p className='text-gray-800'>{degree}</p>
                </div>
                <div>
                  <p className='text-gray-800'>
                    {publication?.user.bio ? publication.user.bio : 'Sin biografía'}
                  </p>
                </div>
                <div className="mt-4 flex space-x-4">
                  <p className="text-gray-400 flex items-center">
                    <IoIosMail className='mr-2'  size={24} />{publication?.user.mail}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='p-4 border border-gray-300'>
          <div className="flex flex-col items-start">
            <p className="text-xl font-semibold mb-2">Tags</p>
            <div className="flex space-x-2 w-full">
              <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
              <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
            </div>
            {/* Etiquetas */}
            {publication?.tags && publication.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {publication.tags.map((tag) => (
                  <span 
                    key={tag.id} 
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            )}
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
            <p className="text-xl font-semibold mb-2">Edita tu propuesta</p>
            <div className="flex space-x-2 w-full">
              <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
            </div>
            <div className='mt-4 w-full'>
              {publication ? (
                <EditPublicationForm publication={publication} onSuccess={handleSuccessEdit} />
              ) : (
                <p>No hay publicación para editar</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center max-w-7xl mx-auto mt-2">
        {renderStep(step)}
      </div>
      {/* modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 lg:w-2/6 p-6">
            {/* Header del modal */}
            <h2 className="text-xl font-semibold mb-4">¿Estás completamente seguro?</h2>
            <p className="text-gray-700 mb-6">
              Esta acción no se puede deshacer. Eliminará permanentemente su propuesta de la base de datos.
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
                onClick={handleDeletePub}
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
    </>
  );
}