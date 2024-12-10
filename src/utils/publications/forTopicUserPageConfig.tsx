
import React from 'react';
import Link from 'next/link';
import { PiTreeStructure } from 'react-icons/pi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { Publication } from '@/types/publications';

// Configuration for page mapping
export const forTopicsUserPageConfig = {
  1: {
    icon: <PiTreeStructure className='text-lg' />,
    title: "Organización política y administrativa"
  },
  2: {
    icon: <HiOutlineUserGroup className='text-lg' />,
    title: "Historia y evolución de los movimientos sociales",
  }
};