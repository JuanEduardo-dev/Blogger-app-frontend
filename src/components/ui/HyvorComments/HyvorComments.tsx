"use client";
import React, { useEffect } from "react";
import { Comments, CommentCount } from "@hyvor/hyvor-talk-react";
import { CommentCounts } from "@hyvor/hyvor-talk-base";

interface HyvorCommentsProps {
  websiteId: number;
  pageId: string;
  title?: string;
}

const HyvorComments: React.FC<HyvorCommentsProps> = ({
  websiteId,
  pageId,
  title,
}) => {
  useEffect(() => {
    // Cargar contadores de comentarios
    CommentCounts.load({
      "website-id": websiteId,
    });
  }, [websiteId]);

  return (
    <div>
      <Comments 
        website-id={websiteId} 
        page-id={pageId}
        page-title={title}
      />
    </div>
  );
};

// Componente separado para el conteo de comentarios
export const HyvorCommentCount: React.FC<{ 
  websiteId: number, 
  pageId: string 
}> = ({ websiteId, pageId }) => {
  return <CommentCount page-id={pageId} website-id={websiteId} />;
};

export default HyvorComments;
