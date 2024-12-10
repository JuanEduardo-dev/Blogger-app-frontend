'use client'

import { useDataPub } from '@/hooks/publications/dataPub';
import { useEffect, useMemo, useState } from 'react';

import { BiDislike, BiLike} from "react-icons/bi";
import { SetStateAction } from 'react';
import { Publication } from '@/types/publications';

export default function Home() {

  const { publications: pub, isLoading: pubDataLoad, mutate: userPubDataMutate,
    sortedPubByDate, sortedPubByPageDate, tagPubCounts, sortedPubMostLiked, lastedMostLikePubFour
  } = useDataPub();
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Número de publicaciones por página

  // Calcular el índice de inicio y fin para las publicaciones en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedPubMostLiked.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(sortedPubMostLiked.length / itemsPerPage);

  // Función para cambiar a una página específica
  const goToPage = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const goToStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= totalSteps) {
      setStep(newStep);
      window.scrollTo(0, 0);
    } else {
      if (newStep == 7) {
        setStep(1);
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <>
    <div className="max-w-7xl mx-auto">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {lastedMostLikePubFour.map((pub) => (
          <div
            key={pub.id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden group"
          >
            {/* Imagen de fondo */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: `url('/images/movimientos/fondo.jpg')` }}
            ></div>
            <div className="relative p-4 z-10">
              <h3 className="text-lg font-bold mb-2">{pub.title}</h3>
              <div
                className="text-gray-600 mb-4"
                dangerouslySetInnerHTML={{
                  __html:
                    pub.content.length > 100
                      ? pub.content.substring(0, 100) + '...'
                      : pub.content,
                }}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span>{pub.likes_count}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
    </>
  );
}