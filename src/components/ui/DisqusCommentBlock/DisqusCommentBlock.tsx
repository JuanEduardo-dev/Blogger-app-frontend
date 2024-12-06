"use client"
import { DiscussionEmbed } from 'disqus-react';
import React from 'react';

interface DisqusCommentBlockProps {
  shortname?: string;
  config?: {
    url?: string;
    identifier?: string;
    title?: string;
    language?: string;
  }
}

const DisqusCommentBlock: React.FC<DisqusCommentBlockProps> = ({ shortname, config }) => { 
  return (
    <div>
      <DiscussionEmbed
        shortname={shortname || 'defaultShortname'} // Asegúrate de que shortname nunca sea undefined
        config={{
          url: config?.url,
          identifier: config?.identifier,
          title: config?.title,
          language: config?.language || 'en_EN' 
        }}
      />
    </div>
  )
}

export default DisqusCommentBlock;