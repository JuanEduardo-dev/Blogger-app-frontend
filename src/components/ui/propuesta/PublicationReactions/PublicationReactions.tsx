import React, { useState, useEffect } from 'react';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import Loader from '../../Basics/Loader/Loader';
import { mutate } from 'swr';

interface ReactionProps {
  publicationId: string;
}

const PublicationReactions: React.FC<ReactionProps> = ({ publicationId }) => {
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isReacting, setIsReacting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const reactionResponse = await fetch(`/api/publications/reaction/get?post=${publicationId}`);
        const reactionData = await reactionResponse.json();

        const publicationResponse = await fetch(`/api/publications/all/by-id/${publicationId}`);
        const publicationData = await publicationResponse.json();

        if (reactionResponse.ok && publicationResponse.ok) {
          setUserReaction(reactionData.reaction_type);
          setLikesCount(publicationData.data.likes_count || 0);
          setDislikesCount(publicationData.data.dislikes_count || 0);
        } else {
          setError(reactionData.error || publicationData.error || 'Error al cargar datos iniciales');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [publicationId]);

  // Handle like/dislike
  const handleReaction = async (type: 'like' | 'dislike') => {
    // Prevent multiple simultaneous reactions
    if (isReacting) return;

    try {
      setIsReacting(true);
      setError(null);

      const response = await fetch(`/api/publications/reaction/post?post=${publicationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      const result = await response.json();

      if (response.ok) {
        if (userReaction === type) {
          // Remove reaction
          setUserReaction(null);
          if (type === 'like') {
            setLikesCount((prev) => Math.max(0, prev - 1));
          } else {
            setDislikesCount((prev) => Math.max(0, prev - 1));
          }
        } else {
          // Toggle reaction
          if (userReaction === 'like') {
            setLikesCount((prev) => Math.max(0, prev - 1));
          } else if (userReaction === 'dislike') {
            setDislikesCount((prev) => Math.max(0, prev - 1));
          }

          setUserReaction(type);
          if (type === 'like') {
            setLikesCount((prev) => prev + 1);
          } else {
            setDislikesCount((prev) => prev + 1);
          }
        }

        // After change, force revalidation of data
        mutate('/api/publications/all/get-all');
      } else {
        setError(result.error || 'Error al procesar la reacción');
      }
    } finally {
      setIsReacting(false);
    }
  };
  
  if (loading) {
    return (
      <div className='flex items-center justify-center w-full mt-4'>
        <Loader />
      </div>
    );
  }
  

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex flex-row items-center justify-center text-lg w-full my-2">
        <div >
          <div>
            <div className='font-semibold'>¿Qué te pareció esta propuesta?</div>
          </div>
          <div className="flex items-center justify-center text-xl space-x-6 w-full">
            <div
              className={`flex items-center text-gray-700 space-x-1 ${isReacting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => !isReacting && handleReaction('like')}
            >
              {userReaction === 'like' ? <BiSolidLike /> : <BiLike />}
              <span>{likesCount}</span>
            </div>
            <div
              className={`flex items-center text-gray-700 space-x-1 ${isReacting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => !isReacting && handleReaction('dislike')}
            >
              {userReaction === 'dislike' ? <BiSolidDislike /> : <BiDislike />}
              <span>{dislikesCount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicationReactions;