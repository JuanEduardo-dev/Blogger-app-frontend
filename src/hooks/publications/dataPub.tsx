import useSWR from 'swr';
import { Publication } from '@/types/publications';
import { useMemo } from 'react';
import { fetcher } from "@/utils/fetcher";

type TagCounts = { [tag: string]: number };

// Custom hook should start with 'use'
export const useDataPub = () => {
  const { 
    data, 
    error, 
    isLoading, 
    mutate 
  } = useSWR<Publication[]>('/api/publications/all/get-all', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 30000,
    errorRetryCount: 2,
    errorRetryInterval: 1000,
  });

  // Usar useMemo para obtener las publicaciones ordenadas por likes
  const sortedPubMostLiked = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => b.likes_count - a.likes_count); // Copiar el array antes de ordenar
  }, [data]);

  // Usar useMemo para obtener las ultimas 4 publicaciones ordenadas por likes
  const lastedMostLikePubFour = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => b.likes_count - a.likes_count).slice(0, 4); // Copiar el array antes de ordenar
  }, [data]);

  // Usar useMemo para obtener las publicaciones ordenadas por fecha
  const sortedPubByDate = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ); // Copiar el array antes de ordenar
  }, [data]);

  // Usar useMemo para agrupar publicaciones por página
  const sortedPubByPageDate = useMemo(() => {
    if (!data) return {};

    const grouped = data.reduce((acc, pub) => {
      if (!acc[pub.page_id]) {
        acc[pub.page_id] = [];
      }
      acc[pub.page_id].push(pub);
      return acc;
    }, {} as Record<number, Publication[]>);

    // Ordenar publicaciones dentro de cada grupo por fecha
    Object.keys(grouped).forEach(pageId => {
      grouped[Number(pageId)].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });

    return grouped;
  }, [data]);

  // Contar las publicaciones por tag
  const tagPubCounts = useMemo<TagCounts>(() => {
    if (!data) return {};

    const counts: TagCounts = {}; 
    data.forEach((pub) => {
      if (pub.tags) {
        pub.tags.forEach((tag) => {
          const tagTitle = tag.title; // Accedemos al 'title' del tag
          counts[tagTitle] = (counts[tagTitle] || 0) + 1; // Contamos las publicaciones por tag
        });
      }
    });

    return counts;
  }, [data]);

  return {
    publications: data || [],
    sortedPubByDate,
    sortedPubByPageDate,
    tagPubCounts,
    sortedPubMostLiked,
    lastedMostLikePubFour,
    isLoading,
    error,
    mutate
  };
};
