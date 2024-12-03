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
import { CiUser } from "react-icons/ci";
import { PiDotOutlineFill } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { TfiComment } from "react-icons/tfi";

export default function Home() {
  return (
    <>
      <section className="relative h-96">
        {/* Background Image */}
        <Image 
          src="/images/back-organizacion.jpg" 
          alt="Background Image" 
          fill
          quality={90}
          priority
          className="absolute inset-0 object-cover z-0"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-pallette-10-contrast bg-opacity-50 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 h-full w-full text-center flex">
          <div className="animate-fade-in-left max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
            <h1 className="text-3xl font-bold max-w-screen-sm mb-4">
              Organización política y administrativa del Perú
            </h1>
            <Breadcrumb>
              <BreadcrumbList className='flex items-center justify-center max-w-screen-sm'>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <LiaSlashSolid />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Temas</BreadcrumbLink>
                </BreadcrumbItem>
                <LiaSlashSolid />
                <BreadcrumbItem>
                  <BreadcrumbPage>Organización política y administrativa del Perú</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>


      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center max-w-7xl mx-auto mt-4">
        {/* Services Section */}
        <div className="w-full lg:w-2/3">
          {/* Desktop View */}
          <div className="lg:grid p-4">
            <div className='flex flex-col justify-start text-gray-600 space-y-2'>
              <div className='flex items-center'>
                <p><CiUser className='mr-1 inline'/>Por: Gómez Rojas Juan, Esteban Esquivel Leydy, Esquivel Lino Rimsky, Lázaro Arratea Nilson, León Esteban James
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center'>
                  <PiDotOutlineFill  className='text-pallette-10'/>
                  <TfiComment className='mr-1'/>
                  25 Comentarios
                </div>
                <div className='flex items-center'>
                  <PiDotOutlineFill  className='text-pallette-10'/>
                  <IoCalendarOutline className='mr-1'/>
                  3 Diciembre, 24
                </div>
              </div>
            </div>
            <br />
            <div>
              <p className='text-3xl font-semibold text-gray-800'>La organización política y administrativa del Perú</p>
              <p>d</p>
              <p>d</p>
              <p>d</p>
              <p>d</p>
              <p>d</p>
              <p>d</p>
              <p>d</p>
              <p>d</p>
              <p>d</p>
              <p>d</p>
              <p>d</p>
            </div>
          </div>
        </div>
        
        {/* Doctor Image - Desktop Only */}
        <div className="lg:w-1/3 relative reveal fade-right">
          <div className="relative w-full text-center p-4">
            <p className='text-pallette-10-contrast font-medium font-sans'>Dr. Ivan Rick Velasquez Rodriguez</p>
            <p className='text-pallette-10-contrast font-sans text-sm'>Especialista en periodoncia e implantología</p>
          </div>
        </div>
      </div>
    </>
  );
}