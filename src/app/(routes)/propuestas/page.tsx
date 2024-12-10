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
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User, Degree } from '@/types/user';
import { PiDotOutlineFill, PiTreeStructure } from "react-icons/pi";
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useUser } from '@/app/context/UserContext';
import { useDataPub } from '@/hooks/publications/dataPub';
import { forTopicsUserPageConfig } from '@/utils/publications/forTopicUserPageConfig';
import Loader from '@/components/ui/Basics/Loader/Loader';
import { IoCalendarOutline } from 'react-icons/io5';
import { CiUser } from 'react-icons/ci';

export default function Home() {

  const { data: session } = useSession(); 
  const { toast } = useToast();
  const { publications: pub, isLoading: pubDataLoad, mutate: userPubDataMutate,
    sortedPubByDate, sortedPubByPageDate, tagPubCounts, sortedPubMostLiked, lastedMostLikePubFour
  } = useDataPub();
  // 1. Real-time Search
  const [searchQuery, setSearchQuery] = useState("");
  
  // 2. Time Filter with Updated Options
  const [filterTime, setFilterTime] = useState('all'); // 'all', 'last1h', 'last25h', 'last7d'
  
  // 3. Comprehensive Filter Dropdown
  const [filterType, setFilterType] = useState('date'); // 'likes', 'dislikes', 'tags', 'date'
  
  // 4. Sort Direction Toggle
  const [sortDirection, setSortDirection] = useState('desc');
  
  // 5. Tag Filtering
  const [selectedTags, setSelectedTags] = useState<{[key: string]: boolean}>({});

  // Extract unique tags
  const uniqueTags = Array.from(new Set(
    pub.flatMap(publication => publication.tags.map(tag => tag.title))
  ));

  // Toggle tag selection
  const toggleTagSelection = (tag: string) => {
    setSelectedTags(prev => ({
      ...prev,
      [tag]: !prev[tag]
    }));
  };

  // Comprehensive Filtering Function
  const filterPublications = () => {
    return pub.filter((publication) => {
      // Search Filter
      const matchesSearch = !searchQuery || 
        publication.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Time Filter
      const currentTime = new Date();
      let timeFilter = true;
      if (filterTime === 'last1h') {
        timeFilter = (new Date(publication.date).getTime() > currentTime.getTime() - 1 * 60 * 60 * 1000);
      } else if (filterTime === 'last24h') {
        timeFilter = (new Date(publication.date).getTime() > currentTime.getTime() - 24 * 60 * 60 * 1000);
      } else if (filterTime === 'last7d') {
        timeFilter = (new Date(publication.date).getTime() > currentTime.getTime() - 7 * 24 * 60 * 60 * 1000);
      }

      // Tag Filter
      const hasSelectedTags = Object.keys(selectedTags).filter(tag => selectedTags[tag]).length > 0;
      const matchesTags = !hasSelectedTags || 
        publication.tags.some(tag => selectedTags[tag.title]);

      return matchesSearch && timeFilter && matchesTags;
    });
  };

  // Sorting Function
  const sortPublications = (publications: any[]) => {
    return publications.sort((a, b) => {
      let compareValue = 0;
      
      switch(filterType) {
        case 'likes':
          compareValue = a.likes_count - b.likes_count;
          break;
        case 'dislikes':
          compareValue = a.dislikes_count - b.dislikes_count;
          break;
        case 'tags':
          compareValue = a.tags.length - b.tags.length;
          break;
        default: // date
          compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
      }

      return sortDirection === 'desc' ? compareValue * -1 : compareValue;
    });
  };

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const filteredAndSortedPublications = sortPublications(filterPublications());
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedPublications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedPublications.length / itemsPerPage);


  //RENDERS
  const renderMain = () => (
    <>
    
      {/* Services Section */}
      <div className="w-full lg:w-2/3">
        
        {/* Filters Container */}
        <div className="flex items-center space-x-4 mb-6">
          {/* 1. Search Input */}
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded"
          />

          {/* 2. Time Filter */}
          <select 
            value={filterTime}
            onChange={(e) => setFilterTime(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="all">Todo el tiempo</option>
            <option value="last1h">Última hora</option>
            <option value="last24h">Últimas 24 horas</option>
            <option value="last7d">Última semana</option>
          </select>

          {/* 3. Filter Type Dropdown */}
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="date">Fecha</option>
            <option value="likes">Likes</option>
            <option value="dislikes">Dislikes</option>
            <option value="tags">Número de Tags</option>
          </select>

          {/* 4. Sort Direction Toggle */}
          <button 
            onClick={() => setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc')}
            className="p-2 border border-gray-300 rounded"
          >
            {sortDirection === 'desc' ? '↓' : '↑'}
          </button>
        </div>

        {/* 5. Tags Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {uniqueTags.map(tag => (
            <label key={tag} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedTags[tag] || false}
                onChange={() => toggleTagSelection(tag)}
                className="form-checkbox"
              />
              <span className="ml-2">{tag}</span>
            </label>
          ))}
        </div>


        <div className="p-4 lg:mt-6">
          <div className="bg-white">
            <div className="space-y-4">
              {pubDataLoad ? (
                <div className='flex items-center p-8 justify-center border border-gray-300'>
                  <Loader />
                </div>
              ) : null}
              {pub.length === 0 && !pubDataLoad ? (
                <p>No hay propuestas disponibles.</p>
              ) : (
                currentItems.map((pub) => (
                  <div key={pub.id} className="border border-gray-300 p-4 mb-4 shadow-sm space-y-4"> 
                    <div className='flex flex-wrap justify-start md:space-x-4'>
                      <div className='flex items-center text-base text-gray-500 mb-2'>
                        <CiUser  className='mr-1'/>
                        Por: {pub.user.name} {pub.user.lastName}
                      </div>
                      <div className='flex items-center text-base text-gray-500 mb-2'>
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
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center text-gray-700 space-x-1">
                        <BiLike />
                        <span>{pub.likes_count}</span>
                      </div>
                      <div className="flex items-center text-gray-700 space-x-1">
                        <BiDislike />
                        <span>{pub.dislikes_count}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      {pub.tags && pub.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {pub.tags.map((tag: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
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
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentPage(i + 1);
                        window.scrollTo(0, 0);
                      }}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === i + 1 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Only */}
      <div className="lg:w-1/3 relative reveal fade-right mt-6 p-4 space-y-4">
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
                  <div className="flex items-center space-x-6 justify-start">
                    {/* Botón de "Me gusta" */}
                    <div className="flex items-center text-gray-700  space-x-1">
                      <BiLike />
                      <span>{pub.likes_count}</span>
                    </div>
                    {/* Botón de "No me gusta" */}
                    <div className="flex items-center text-gray-700 space-x-1">
                      <BiDislike />
                      <span>{pub.dislikes_count}</span>
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
          <div className="animate-fade-in-left max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
            <h1 className="text-3xl lg:text-4xl font-bold max-w-screen-sm lg:max-w-screen-md mb-4">
              Propuestas
            </h1>
            <Breadcrumb>
              <BreadcrumbList className='flex items-center justify-center max-w-screen-sm lg:max-w-screen-md '>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <LiaSlashSolid />
                <BreadcrumbItem>
                  <BreadcrumbPage>Prupuestas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center max-w-7xl mx-auto mt-2">
        {renderMain()}
      </div>
    </>
  );
}