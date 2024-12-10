'use client'

import Image from 'next/image';

import { BiDislike, BiLike} from "react-icons/bi";
import { PiDotOutlineFill, PiTreeStructure } from "react-icons/pi";
import Link from 'next/link';
import { useDataPub } from '@/hooks/publications/dataPub';
import { forTopicsUserPageConfig } from '@/utils/publications/forTopicUserPageConfig';
import { IoCalendarOutline } from 'react-icons/io5';

export default function Home() {
  const { publications: pub, isLoading: pubDataLoad,
    sortedPubByDate, sortedPubByPageDate, tagPubCounts,
  } = useDataPub();


  //RENDERS
  const renderMain = () => (
    <>
      {/* Services Section */}
      <div className="w-full lg:w-2/3">
        <div className="p-4 lg:mt-6">
          <div className="bg-white">
            <div className="space-y-8">
              <div className='text-2xl mb-8 font-semibold'>
                Descrubre nuestros temas
              </div>
              <Link className="relative group" href={`/temas/organizacion-politica-y-administrativa-del-peru`}> 
                <div className="relative border border-gray-300 p-4 mb-8 shadow-sm space-y-4 overflow-hidden"> 
                  {/* Imagen de fondo */} 
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110" 
                    style={{ 
                      backgroundImage: "url('/images/tema-1.jpg')",
                      clipPath: "inset(0)",
                      zIndex: 1
                    }} 
                  >
                  <style jsx>{`
                    div::after {
                      content: '';
                      position: absolute;
                      inset: 0;
                      background-color: rgba(0, 89, 120, 0.5); 
                      z-index: 2;
                    }
                  `}</style>
                  </div> 
                  {/* Contenido de la tarjeta */} 
                  <div className="relative z-10 p-12"> 
                    <div className='flex flex-wrap justify-start md:space-x-4'> 
                      <div className='flex items-center text-base text-white mb-2'> 
                        <PiDotOutlineFill className='text-white'/> 
                        <IoCalendarOutline className='mr-1 '/> 3 Diciembre, 2024 
                      </div> 
                    </div> 
                    <h3 className="text-xl font-semibold text-white">La organización política y administrativa del Perú</h3> 
                  </div> 
                </div> 
              </Link>

              <Link className="relative group" href={`/temas/evolucion-de-los-movimientos-sociales-en-el-peru`}> 
                <div className="relative border border-gray-300 p-4 mb-8 shadow-sm space-y-4 overflow-hidden"> 
                  {/* Imagen de fondo */} 
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110" 
                    style={{ 
                      backgroundImage: "url('/images/huelga.jpg')",
                      clipPath: "inset(0)",
                      zIndex: 1
                    }} 
                  >
                  <style jsx>{`
                    div::after {
                      content: '';
                      position: absolute;
                      inset: 0;
                      background-color: rgba(0, 89, 120, 0.5);
                      z-index: 2;
                    }
                  `}</style>
                  </div> 
                  {/* Contenido de la tarjeta */} 
                  <div className="relative z-10 p-12"> 
                    <div className='flex flex-wrap justify-start md:space-x-4'> 
                      <div className='flex items-center text-base text-white mb-2'> 
                        <PiDotOutlineFill className='text-white'/> 
                        <IoCalendarOutline className='mr-1 '/> 3 Diciembre, 2024 
                      </div> 
                    </div> 
                    <h3 className="text-xl font-semibold text-white">Historia y evolución de los movimientos sociales</h3> 
                  </div> 
                </div> 
              </Link>

            </div>
          </div>
        </div>
      </div>
      {/* Desktop Only */}
      <div className="lg:w-1/3 relative reveal fade-right lg:mt-6 p-4 space-y-4">
        <div className='p-4 border border-gray-300'>
          <div className="flex flex-col items-start">
            <p className="text-xl font-semibold mb-2">Propuestas Totales</p>
            <div className="flex space-x-2 w-full">
              <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
              <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
            </div>
          </div>

          {pub.length === 0 && !pubDataLoad ? (
            <div className="text-left text-gray-500 mt-4">
              No tienes propuestas
            </div>
          ) : (
          // Filtramos las primeras dos páginas (pageId)
          Object.entries(sortedPubByPageDate)
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

            {pub.length === 0 && !pubDataLoad ? (
              <div className="text-left text-gray-500 mt-4">
                No tienes propuestas
              </div>
            ) : (     
              <div className={`flex flex-col space-y-4 ${!pubDataLoad ? 'mt-4' : ''}`}>
              {/* Aquí obtenemos y mostramos solo las últimas 3 publicaciones */}
              {sortedPubByDate.slice(0, 3).map((pub) => (
                <div key={pub.id} className="flex flex-col space-y-2">
                  <hr />
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
                    <div>Por: {pub.user.name} {pub.user.lastName}</div>
                  </div>
                  {/* Likes y Dislikes */}
                  <div className="flex items-center justify-start">
                    {/* Botón de "Me gusta" */}
                    <Link className='flex space-x-6' href={`/propuesta?post=${pub.id}`}>
                      <div className="flex items-center text-gray-700  space-x-1 opacity-50">
                        <BiLike />
                        <span>{pub.likes_count}</span>
                      </div>
                      {/* Botón de "No me gusta" */}
                      <div className="flex items-center text-gray-700 space-x-1 opacity-50">
                        <BiDislike />
                        <span>{pub.dislikes_count}</span>
                      </div>
                    </Link>
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
            <p className="text-xl font-semibold mb-2">Tags Más Usados</p>
            <div className="flex space-x-2 w-full">
              <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
              <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
            </div>
            <div>
              {pub.length === 0 && !pubDataLoad ? (
              <div className="text-left text-gray-500 mt-4">
                  No tienes propuestas
                </div>
              ) : (
                <div className={`flex flex-col ${!pubDataLoad ? 'mt-4' : ''}`}>
                {/* Mostrar los tags y el número de publicaciones */}
                {tagPubCounts && Object.keys(tagPubCounts).length > 0 ? (
                  Object.keys(tagPubCounts).map((tag) => (
                    <div key={tag} className="flex items-center text-sm text-gray-700 mb-2">
                      <span className="font-semibold">{tag}</span>
                      <span className="ml-2 text-gray-500">({tagPubCounts[tag]})</span>
                    </div>
                  ))
                ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <section className="relative h-96">
        {/* Background Image */}
        <Image 
          src="/images/back-propuestas.jpg" 
          alt="Background Image" 
          fill
          quality={100}
          priority
          className="absolute inset-0 object-cover z-0 overflow-clip"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-pallette-10-contrast bg-opacity-50 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 h-full w-full text-center flex">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
            <Image
              src="/images/logo-footer.png"
              alt="Buccasan Logo"
              style={{
                width: 'auto', height: '64px',
              }}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center max-w-7xl mx-auto mt-2">
        {renderMain()}
      </div>
    </>
  );
}