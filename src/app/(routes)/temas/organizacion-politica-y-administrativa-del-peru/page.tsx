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
            <h1 className="text-3xl lg:text-4xl font-bold max-w-screen-sm lg:max-w-screen-md mb-4">
              Organización política y administrativa del Perú
            </h1>
            <Breadcrumb>
              <BreadcrumbList className='flex items-center justify-center max-w-screen-sm lg:max-w-screen-md '>
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
              <div className='flex items-center space-x-2'>
                <div className='flex items-center'>
                  <PiDotOutlineFill  className='text-pallette-10'/>
                  <TfiComment className='mr-1'/>
                  25 Comentarios
                </div>
                <div className='flex items-center'>
                  <PiDotOutlineFill  className='text-pallette-10'/>
                  <IoCalendarOutline className='mr-1'/>
                  3 Diciembre, 2024
                </div>
              </div>
            </div>
            <br />
            <div>
              <p className='text-3xl font-semibold text-gray-800'>La organización política y administrativa del Perú</p>
              <br />
              <div className='text-gray-600 mb-4 leading-relaxed space-y-4'>
                <p>
                  De acuerdo con la Constitución, la República del Perú se define su gobierno como un estado unitario, representativo y descentralizado, y se organiza según el principio de la separación de poderes.
                </p>
                <p>
                  El Perú se integra mediante 4 tipos de demarcaciones territoriales según la constitución: región, departamento, provincia y distrito.
                </p>
                <p>
                  En el ámbito interno, se organiza en 24 departamentos, 196 provincias y 1874 distritos. Según datos obtenidos hasta el 3 de diciembre de 2021.
                </p>
                <p>
                  La Provincia Constitucional del Callao tiene la categoría de organización política departamental junto a los demás departamentos según la constitución política de 1993.
                </p>
                <p>
                  El Perú se divide en tres niveles de gobierno: nacional, regional y local (municipal).
                </p>
                <p>
                  El gobierno a nivel nacional comprende a los tres poderes del Estado y a los Organismos Constitucionalmente Autónomos.
                </p>
                <p>
                  En el ámbito regional es ejercida en las regiones y departamentos.
                </p>
                <p>
                  El ámbito a nivel local es ejercido en las provincias, distritos y los centros poblados.
                </p>
                <div className="w-full">
                  <Image 
                    src="/images/organizacion/entrada-1.png" 
                    alt="Dental consultation" 
                    className="w-full h-full object-cover"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{width: 'auto', height: '100%'}}
                  />
                </div>
                <p className='text-2xl font-semibold text-gray-800'>Importancia de estructura en la gobernanza del país</p>
                <p><strong>Gobernanza</strong></p>
                <p>
                  Cada gobierno regional tiene autonomía, o el derecho de normar, regular y administrar los asuntos públicos de su competencia.
                </p>
                <p>
                  La autonomía puede ser política para adoptar y concordar políticas, aprobar y expedir normas, decidir a través de sus órganos de gobierno y desarrollar sus funciones.
                </p>
                <p>
                  La autonomía administrativa se refiere a la facultad de organizarse además de reglamentar y determinar los servicios públicos.
                </p>
                <p>
                  Finalmente, la autonomía económica es la facultad de crear, recaudar y administrar sus rentas e ingresos propios, así como aprobar sus presupuestos institucionales.
                </p>

                <p><strong>Descentralización</strong></p>
                <p>
                  La descentralización consiste en la separación de competencias y funciones entre los tres niveles de gobierno (gobierno nacional, regional y local) así como un equilibrado ejercicio del poder en beneficio de la población.
                </p>
                <p>
                  Debe ser un proceso permanente, dinámico, irreversible, democrático, integral, subsidiario y gradual.
                </p>

                <p><strong>Importancia</strong></p>
                <p>
                  La importancia de la estructura en la gobernanza de un país radica en la capacidad de organizar y coordinar de manera eficiente los diferentes niveles y sectores del gobierno para asegurar el cumplimiento de las políticas públicas, la administración efectiva de recursos, y la prestación de servicios a la población.
                </p>
                <p>
                  La estructura en la gobernanza es fundamental para asegurar que el país pueda enfrentar de manera efectiva sus desafíos internos y externos, garantizando un desarrollo sostenible y un bienestar generalizado para la población.
                </p>
              </div>

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

{/*
<div className="flex flex-col lg:flex-row lg:items-start lg:justify-center max-w-7xl mx-auto mt-4">
        <div className="w-full lg:w-2/3">
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
        </div>*/}