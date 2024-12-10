'use client'

import Image from 'next/image';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/Shadcn/breadcrumb"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Shadcn/accordion"

import { LiaSlashSolid } from "react-icons/lia"
import { PiDotOutlineFill } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { TfiComment } from "react-icons/tfi";
import { CiUser } from 'react-icons/ci';
import HyvorComments, { HyvorCommentCount } from '@/components/ui/HyvorComments/HyvorComments';
import Link from 'next/link';
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5"
import { useState } from 'react';

export default function Home() {
  const slug = "evolucion-de-los-movimientos-sociales-en-el-peru";
  const websiteId = 12265; // Tu ID de sitio web de Hyvor Talk

  const renderStep1 = () => (
    <div>
      <p className='text-3xl font-semibold text-gray-800'>¿Qué es un Movimiento Social?</p>
      <br />
      <div className='text-gray-600 mb-4 leading-relaxed space-y-4'>
        <p>Un movimiento social es una agrupación de individuos que comparten ciertos rasgos identitarios (etnia, género, clase social, orientación sexual) o ciertos objetivos (políticos, sociales, culturales, medioambientales) y que desafían conjuntamente el punto de vista dominante sobre determinado aspecto de la realidad social.</p>
        <div className="w-full">
          <Image 
            src="/images/movimientos/que-es.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'><strong>Origen del Concepto</strong></p>
        <p>Las palabras Movimiento Social tuvieron un uso común en el campo de la política. Su origen se atribuye al sociólogo alemán Lorenz Von Stein (1815-1890), quien en su libro de 1850 <em>Historia del movimiento social francés desde 1789 hasta el presente</em>, lo definió como una agrupación de sectores sociales para alcanzar una cierta influencia colectiva sobre el Estado.</p>
        <div className="flex items-center justify-center">
          <Image 
            src="/images/movimientos/lorenz.jpg" 
            alt="Dental consultation" 
            className="object-cover  border border-gray-300"
            width={200}
            height={200}
          />
        </div>
        <p>Sin embargo, el concepto empezó a utilizarse con el sentido actual en el siglo XX y adquirió popularidad a partir de las décadas de 1960 y 1970.</p>

        <p className='text-2xl'><strong>Características de los Movimientos Sociales</strong></p>
        
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li><strong>Actores Colectivos:</strong> Compuestos por una cantidad variable de individuos que comparten un cierto sentido de identidad o una causa común.</li>
          
          <li><strong>Formas de Manifestación:</strong> Suelen manifestarse a través de actos multitudinarios, acciones en la calle o en las redes sociales y llamados a realizar boicots.</li>
          
          <li><strong>Temáticas:</strong> Los temas en los que se comprometen suelen ser de índole identitaria, social, étnica, racial, cultural, económica, ecológica o política. Sus integrantes pueden pertenecer a distintas orientaciones ideológicas.</li>
          
          <li><strong>Estructura Organizativa:</strong> Tienen un carácter informal, pueden tener voceros, referentes y pautas de organización, pero carecen de una estructura fija y una representación única.</li>
          
          <li><strong>Duración:</strong> Pueden ser transitorios o duraderos. Surgen para hacer frente a un asunto concreto y, una vez logrado el objetivo, pueden desarticularse o transformarse.</li>
          
          <li><strong>Origen y Financiamiento:</strong> Suelen tener un origen espontáneo o autoconvocado, carecen de grandes financiamientos y también de una dirigencia formal.</li>
        </ul>
        
        <p className='text-2xl mt-4'><strong>Importancia Social</strong></p>
        <p>Los movimientos sociales representan una forma fundamental de participación ciudadana, permitiendo a grupos diversos expresar sus demandas, desafiar estructuras de poder establecidas y promover cambios significativos en la sociedad.</p>
        <div className="w-full">
          <Image 
            src="/images/movimientos/fondo.png" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <div className='flex items-center mb-4'>
        <p className='text-gray-600 flex items-center'> 
          <CiUser className='mr-1'/>
          Por: Esteban Esquivel Leydy
        </p>
      </div>
      <p className='text-3xl font-semibold text-gray-800'>Primeros movimientos (Siglo XIX - 1919)</p>
      <br />
      <div className='text-gray-600 mb-4 leading-relaxed space-y-4'>
        <p className='text-2xl'><strong>Movimientos Sociales en el Siglo XIX y XX</strong></p>
        
        <p>En el siglo XIX, los primeros movimientos sociales de la historia contemporánea surgieron en el seno de la sociedad industrial. Algunos ejemplos fundacionales fueron el movimiento obrero y el movimiento feminista, que incluyó corrientes como el sufragismo en la lucha por los derechos de las mujeres.</p>
        <div className="w-full">
          <Image 
            src="/images/movimientos/primeros.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl mb-4'><strong>Evolución de los Movimientos Sociales</strong></p>
        <p>Desde mediados del siglo XX hasta 1980, los reclamos se expandieron más allá de lo económico y político, incorporando demandas identitarias y medioambientales.</p>
        <p>Surgieron movimientos emblemáticos como:</p>
        <ul className="leading-relaxed space-y-4" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Movimiento por los Derechos Civiles en Estados Unidos (liderado por Martin Luther King)</li>
          <li>Segunda ola del Feminismo</li>
          <li>Movimiento Hippie y Pacifismo</li>
          <li>Movimiento por los Derechos LGBTQ</li>
          <li>Movimiento Ecologista</li>
          <li>Movimiento Autonomista</li>
        </ul>
        <p>En décadas posteriores, cobraron fuerza el movimiento antiglobalización y los movimientos por los derechos de pueblos indígenas y campesinos.</p>
        <div className="w-full">
          <Image 
            src="/images/movimientos/lgbt.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'><strong>Movimientos Sociales en el Perú: Periodo Temprano (1533-1781)</strong></p>
        <p>Durante el periodo colonial, el Perú experimentó numerosos levantamientos y movimientos de resistencia:</p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>1533-1572: Resistencia de Vilcabamba</li>
          <li>1742-1752: Movimiento de Juan Santos Atahualpa</li>
          <li>1780-1781: La rebelión de Túpac Amaru II - considerada la primera gran revolución y precedente de las guerras de independencia</li>
        </ul>
        <p>Estos movimientos se caracterizaron por:</p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Focalización localizada</li>
          <li>Desorganización interna</li>
          <li>Dificultad para articular demandas entre diferentes zonas</li>
          <li>Represión sistemática por parte de la Corona Española</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/movimientos/atahualpa.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'><strong>Desarrollo del Movimiento Obrero Peruano (1850-1919)</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li><strong>1850:</strong> Primeras asociaciones gremiales y mutualistas</li>
          <li><strong>1880:</strong> Circulación de ideas socialistas entre trabajadores</li>
          <li><strong>1886:</strong> Fundación de la Confederación de Artesanos Unión Universal (CAUU)</li>
          <li><strong>1901:</strong> Primer Congreso Nacional Obrero</li>
          <li><strong>1911:</strong> Predominio de la influencia anarquista</li>
          <li><strong>1912-1913:</strong> Intensificación de huelgas por jornada laboral y salarios</li>
          <li><strong>1919:</strong> Culminación del anarco-sindicalismo con la conquista de la jornada de ocho horas</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/movimientos/obreros.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='italic text-center'>Los movimientos sociales representan la capacidad de transformación de las sociedades, manifestando la lucha continua por derechos, reconocimiento e igualdad.</p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <div className='flex items-center mb-4'>
        <p className='text-gray-600 flex items-center'> 
          <CiUser className='mr-1'/>
          Por: Gómez Rojas Juan Eduardo
        </p>
      </div>
      <p className='text-3xl font-semibold text-gray-800'>Consolidación de Movimientos Sociales (1919-1940)</p>
      <br />
      <div className='text-gray-600 mb-4 leading-relaxed space-y-4'>
        <p className='text-2xl'><strong>Antecedente: La Revuelta de Haymarket (1886)</strong></p>
        
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>El 1 de mayo de 1886 en Chicago, Illinois, se realizó una protesta con más de 20 mil participantes exigiendo reducir las horas laborales a 8 horas.</li>
          <li>Tras la protesta, 31 trabajadores fueron acusados y 5 condenados a la horca.</li>
          <li>Durante la revolución industrial, las jornadas laborales oscilaban entre 14 y 16 horas diarias.</li>
        </ul>
        
        <div className="w-full">
          <Image 
            src="/images/movimientos/haymarket.webp" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>

        <p className='text-2xl'><strong>Movimiento Obrero: Pioneros de los Derechos Laborales</strong></p>
        
        <p className='text-xl mb-4'><strong>Logros y Conquistas</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Callao, 1913: Primera conquista de la jornada laboral de 8 horas</li>
          <li>16 de enero de 1919: El presidente José Pardo y Barreda aprobó la jornada laboral de 8 horas a nivel nacional</li>
          <li>Antes de la reforma, las jornadas laborales variaban entre 10 y 16 horas</li>
          <li>Logros principales: 8 horas de jornada laboral y 10% de aumento salarial</li>
        </ul>
        
        <p className='text-xl mt-4'><strong>Eventos Importantes</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Década de 1920: Formación de sindicatos en diversas industrias, especialmente agricultura y minería</li>
          <li>1929: Fundación de la CGTP (Confederación General de Trabajadores del Perú), unificando sindicatos bajo una organización representativa</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/movimientos/jornada.avif" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'><strong>Movimiento Indígena: Lucha por el Reconocimiento</strong></p>
        
        <p>El movimiento indígena buscaba defender los derechos de los pueblos originarios contra la explotación, el despojo de tierras y la discriminación cultural.</p>
        
        <p className='text-xl mt-4'><strong>Sublevaciones y Contexto</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>1915-1919: Grandes sublevaciones indígenas en Puno y Cusco contra los abusos de hacendados</li>
          <li>Extrema explotación: Trabajadores indígenas laboraban hasta 16 horas diarias sin pago en haciendas</li>
        </ul>
        
        <p className='text-xl mt-4'><strong>Logros Históricos</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>1919: Creación del Comité Pro-Derecho Indígena Tahuantinsuyo, primera organización nacional indígena</li>
          <li>1920: Primer reconocimiento legal de comunidades indígenas en la Constitución, protegiendo sus tierras comunales</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/movimientos/indigenas.avif" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'><strong>Primer Impulso hacia la Democracia</strong></p>
        
        <p>En 1940, sectores excluidos de la población comenzaron a organizarse para exigir mayores derechos y participación política.</p>
        
        <p className='text-xl mt-4'><strong>Principales Protagonistas</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Movimiento obrero y movimiento indígena como principales impulsores</li>
          <li>Colocaron en la agenda pública temas sociales previamente ignorados</li>
          <li>Impulsaron una visión de democracia más inclusiva y participativa</li>
        </ul>
        
        <p className='text-xl mt-4'><strong>Contexto Político</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Auge de movimientos nacionalistas y antiimperialistas</li>
          <li>Surgimiento de partidos políticos como APRA y Partido Comunista</li>
          <li>Manuel Prado ganó las elecciones, pero se buscó incluir sectores sociales y establecer derechos sindicales</li>
        </ul>

        <div className="w-full">
          <Image 
            src="/images/movimientos/impulso.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div>
      <div className='flex items-center mb-4'>
        <p className='text-gray-600 flex items-center'> 
          <CiUser className='mr-1'/>
          Por: Esquivel Lino Rimsky David
        </p>
      </div>
      <p className='text-3xl font-semibold text-gray-800'>Transformación y Desarrollo de Movimientos Sociales (1940-1970)</p>
      <br />
      <div className='text-gray-600 mb-4 leading-relaxed space-y-4'>
        <p className='text-2xl'><strong>Contexto Histórico</strong></p>
        
        <p className='text-xl mb-4'><strong>Cambios Socioeconómicos</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Urbanización e industrialización acelerada, especialmente en Lima</li>
          <li>Migración masiva de zonas rurales a ciudades</li>
          <li>Incremento de la desigualdad social</li>
          <li>Surgimiento de una nueva clase trabajadora urbana</li>
        </ul>
        
        <p className='text-xl mt-4'><strong>Transformación Política</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Mayor participación de partidos progresistas y socialistas</li>
          <li>Protagonismo del APRA (Alianza Popular Revolucionaria Americana)</li>
          <li>Impulso de reformas para reducir la brecha social</li>
        </ul>
        
        <p className='text-xl mt-4'><strong>Influencia Internacional</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Impacto de la Revolución Cubana (1959)</li>
          <li>Inspiración para movimientos de justicia social</li>
          <li>Fortalecimiento de ideologías anticoloniales</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/movimientos/aprismo.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'><strong>Movimiento Agrario (1956-1964)</strong></p>
        
        <p className='text-xl mb-4'><strong>Causas y Liderazgo</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Explotación y falta de derechos en el campo</li>
          <li>Confederación Campesina del Perú (CCP) como actor principal</li>
          <li>Protestas en Cusco y Ayacucho por redistribución de tierras</li>
          <li>Formación de organizaciones de autodefensa campesina</li>
        </ul>
        
        <p className='text-xl mt-4'><strong>Reforma Agraria de 1964</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Impulsada por el presidente Fernando Belaúnde</li>
          <li>Primera reforma agraria parcial en Perú</li>
          <li>Limitada en su alcance, pero sentó bases para reformas posteriores</li>
          <li>Precedente para la reforma de 1969 de Juan Velasco Alvarado</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/movimientos/agrario.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'><strong>Organizaciones Barriales (1950-1968)</strong></p>
        
        <p className='text-xl mb-4'><strong>Origen y Contexto</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Surgimiento de barrios pobres alrededor de Lima</li>
          <li>Ejemplo emblemático: Villa El Salvador</li>
          <li>Respuesta a migración masiva y falta de servicios básicos</li>
        </ul>

        <p className='text-xl mt-4'><strong>Acciones y Estrategias</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Autogestión para obtener servicios básicos</li>
          <li>Organización de pueblos jóvenes</li>
          <li>Lucha por agua potable, electricidad y vivienda digna</li>
          <li>Empoderamiento comunitario y presión al Estado</li>
        </ul>
        
        <div className="w-full">
          <Image 
            src="/images/movimientos/barrial.webp" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'><strong>Movimientos Estudiantiles (1940-1968)</strong></p>
        
        <p className='text-xl mb-4'><strong>Motivaciones</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Demandas de mejor educación</li>
          <li>Defensa de derechos democráticos</li>
          <li>Inspiración en luchas sociales latinoamericanas</li>
          <li>Universidades como centros de activismo político</li>
        </ul>
        
        <p className='text-xl mt-4'><strong>Acciones Destacadas</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Protestas en universidades como San Marcos y La Cantuta</li>
          <li>Huelgas contra la represión política</li>
          <li>Solidaridad con luchas campesinas y barriales</li>
          <li>Introducción de temas de discusión pública</li>
        </ul>
        
        <div className="w-full">
          <Image 
            src="/images/movimientos/universitario.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-xl mt-4'><strong>Impacto Social</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Presión al Estado para responder a demandas</li>
          <li>Formación de una generación crítica</li>
          <li>Influencia en futuros líderes políticos y sociales</li>
          <li>Resistencia frente a la represión</li>
        </ul>
      </div>
      
    </div>
  );

  const renderStep5 = () => (
    <div>
      <div className='flex items-center mb-4'>
        <p className='text-gray-600 flex items-center'> 
          <CiUser className='mr-1'/>
          Por: León Esteban Ian James
        </p>
      </div>
      <p className='text-3xl font-semibold text-gray-800'>Nuevos Movimientos (1970 - 1990)</p>
      <br />
      <div className='text-gray-600 mb-4 leading-relaxed space-y-4'>
        <p className='text-2xl'>
          <strong>Movimiento de Mujeres Populares</strong>
        </p>
        <p>
          El movimiento de mujeres populares surgió a fines de los setenta con las ollas comunes en respuesta a la crisis económica, y se institucionalizó en los ochenta con la creación de Federaciones de Comedores Populares y los Comités del Vaso de Leche bajo la administración de Barrantes.
          El movimiento tiene tres componentes principales: comités del vaso de leche, comedores populares y clubes de madres, apoyados por ONGs y parroquias.
        </p>
        
        <div className="w-full">
          <Image 
            src="/images/movimientos/mujeres.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'>
          <strong>Comedores Autogestionarios</strong>
        </p>
        <p>
          Evolucionaron de las ollas comunes después de los paros y despidos de la década de setenta y que defienden su dependencia celosamente y evidencian una ideología progresista y hasta clasista.
        </p>
        <p className='text-2xl'>
          <strong>Comedores Populares</strong>
        </p>
        <p>
          Creados durante los gobiernos acciopopulista y aprista de la década de ochenta y que miran nuevamente al gobierno para un apoyo y preferencia.
        </p>
        <p className='text-2xl'>
          <strong>Gobierno Fujimori</strong>
        </p>
        <p>
          Comedores creados durante el gobierno de Fujimori de la década de noventa y que luchan para mantener sus vínculos preferenciales con el Estado (Blondet y Trivelli 2004).
        </p>
        
        <div className="w-full">
          <Image 
            src="/images/movimientos/fujimori.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'>
          <strong>Evolución del Movimiento de Mujeres Populares</strong>
        </p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li><strong>1970:</strong> Inicio de los comedores populares: Surgen organizaciones comunitarias para enfrentar la crisis económica y la falta de recursos. Los comedores populares empiezan a organizarse de manera informal.</li>
          <li><strong>1980:</strong> Las ollas comunes se convierten en una herramienta fundamental para enfrentar la pobreza. Programas de vasos de leche.</li>
          <li><strong>1990:</strong> En los 90, las mujeres consolidan su participación en organizaciones barriales y comedores populares.</li>
          <li><strong>2000:</strong> Las mujeres populares continúan organizándose en los comedores y ollas comunes, articulando demandas de justicia social, acceso a la salud, educación y derechos laborales.</li>
          <li><strong>2010:</strong> Organizaciones de base de mujeres en las comunidades rurales y urbanas continúan demandando acceso a servicios básicos y políticas públicas que las incluyan.</li>
          <li><strong>2020:</strong> La pandemia trae consigo una reactivación de los comedores populares y ollas comunes, ante la crisis económica y sanitaria.</li>
        </ul>
        
        <div className="w-full">
          <Image 
            src="/images/movimientos/populares.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'>
          <strong>Movimiento de DDHH</strong>
        </p>
        <p>
          La fundación del movimiento de DDHH puede encontrarse a fines de la década del setenta, específicamente a partir del Paro Nacional de 1977. En 1979 se cerraba la década con la creación de la Comisión Nacional de DDHH y los Comités de Derechos Humanos (CODEH). Sin embargo, no sería sino hasta la creación de la Coordinadora Nacional de DDHH en 1984 que este movimiento se empezaría su proceso de consolidación.
        </p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li><strong>1977:</strong> Se forman los primeros grupos de defensa de derechos humanos en Perú, en respuesta a las violaciones sistemáticas bajo el régimen militar de Juan Velasco Alvarado.</li>
          <li><strong>1980:</strong> El conflicto armado interno entre el Estado peruano y el grupo subversivo Sendero Luminoso. Las violaciones de derechos humanos se intensifican, incluyendo asesinatos, desapariciones forzadas y torturas.</li>
          <li><strong>2001:</strong> Se crea la Comisión de la Verdad y Reconciliación (CVR), que investiga las violaciones de derechos humanos durante el conflicto armado. El informe final se presenta en 2003, revelando más de 69,000 muertes y desapariciones.</li>
          <li><strong>2015:</strong> La Comisión de la Verdad y Reconciliación presenta un nuevo informe sobre la violencia de género en el contexto del conflicto armado, destacando el impacto desproporcionado en las mujeres.</li>
          <li><strong>2020:</strong> La pandemia de COVID-19 agrava la situación de derechos humanos en Perú, especialmente en comunidades vulnerables. Organizaciones de derechos humanos denuncian el aumento de la violencia de género durante el confinamiento.</li>
          <li><strong>2022:</strong> Se presentan protestas y movilizaciones en todo el país por la defensa de derechos humanos y la justicia social, con un enfoque en la lucha contra la corrupción, la violencia de género y el respeto a los derechos de los pueblos indígenas.</li>
        </ul>
        
        <div className="w-full">
          <Image 
            src="/images/movimientos/ddhh.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'>
          <strong>Organizaciones de Supervivencia en Movimientos Sociales</strong>
        </p>
        <p className='text-xl'>
          <strong>Rondas Campesinas</strong>
        </p>
        <p>
          Nacieron en la década de 1970 en la región de Cajamarca como respuesta a la inseguridad y los robos de ganado (abigeato).
        </p>
        <p className='text-xl'>
          <strong>Organizaciones de Afectados por la Violencia</strong>
        </p>
        <p>
          Durante el conflicto armado interno en Perú (1980-2000), las comunidades fueron gravemente afectadas por la violencia tanto de los grupos subversivos como del Estado.
        </p>
        
        <div className="w-full">
          <Image 
            src="/images/movimientos/rondas.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p>
          A partir del año 2000, las organizaciones de supervivencia han evolucionado hacia un enfoque más amplio de defensa de derechos y apoyo comunitario.
        </p>
      </div>

    </div>
  );

  const renderStep6 = () => (
    <div>
      <div className='flex items-center mb-4'>
        <p className='text-gray-600 flex items-center'> 
          <CiUser className='mr-1'/>
          Por: Lázaro Arratea Nilson
        </p>
      </div>
      <p className='text-3xl font-semibold text-gray-800'>Movimientos contemporáneos (1990 - Presente)</p> 
      <br /> 
      <div className='text-gray-600 mb-4 leading-relaxed space-y-4'> 
        <p className='text-2xl'> 
          <strong>Movimiento ambientalista</strong> 
        </p> 
        <p> 
          Desde 1990, el movimiento ambientalista en Perú ha evolucionado a medida que los conflictos por la explotación de recursos naturales han crecido. La expansión de la minería y la industria petrolera ha generado tensiones entre empresas, comunidades locales y el gobierno.
        </p>

        <p className='text-2xl'> 
          <strong>Primeros conflictos y resistencia a la minería</strong> 
        </p> 
        <p> 
          Durante los años 90, con la apertura económica y la expansión de la inversión extranjera en minería, comenzaron a surgir los primeros conflictos ambientales en regiones como Cajamarca y Ancash.
        </p>

        <p className='text-2xl'> 
          <strong>Conflictos en Yanacocha (1993)</strong> 
        </p> 
        <p> 
          Fue uno de los primeros casos significativos de oposición a la minería, centrado en la preocupación por la contaminación del agua en Cajamarca. Las comunidades denunciaron la falta de control y el impacto negativo en sus tierras, marcando el inicio de una larga historia de conflictos mineros.
        </p>
        <div className="w-full">
          <Image 
            src="/images/movimientos/ambiental.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'> 
          <strong>2000-2010: Surgimiento de frentes sociales y movilización regional</strong> 
        </p> 
        <p> 
          Con el inicio del nuevo siglo, los conflictos por la minería y la extracción de recursos naturales se intensificaron. Las comunidades comenzaron a organizarse a nivel regional para resistir la expansión de proyectos extractivos, surgiendo frentes de defensa que articulaban sus demandas con apoyo de ONGs y líderes ambientales.
        </p>

        <p className='text-xl'> 
          <strong>Protesta de Bagua (2009)</strong> 
        </p> 
        <p> 
          La intervención de comunidades amazónicas en defensa de sus territorios y contra decretos que facilitaban la explotación de recursos generó un violento enfrentamiento conocido como el “Baguazo”, con un saldo trágico que visibilizó la falta de diálogo con las comunidades indígenas.
        </p>

        <p className='text-xl'> 
          <strong>Lucha contra megaproyectos y criminalización de defensores</strong> 
        </p> 
        <p> 
          La última década ha sido testigo de la consolidación de un movimiento ambientalista más articulado y con mayor presencia política. Los conflictos como Conga (2011-2016) y Tía María (2014-2019) han mostrado la capacidad de las comunidades para oponerse a megaproyectos, aunque también han enfrentado la criminalización y persecución de sus líderes.
        </p>

        <div className="w-full">
          <Image 
            src="/images/movimientos/proyectos.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-xl'> 
          <strong>Flavio Bazán Peralta</strong> 
        </p> 
        <p> 
          Pionero y figura clave del movimiento ambiental en Perú. Fue uno de los impulsores iniciales de la conciencia ambiental en el país y jugó un papel fundamental en la defensa de los recursos naturales y en la organización de las comunidades en torno a causas ambientales. Gracias a su labor, el movimiento ambiental en Perú ganó un importante impulso, influyendo en la manera en que las comunidades locales empezaron a ver la defensa del territorio y los recursos como una cuestión de derechos fundamentales.
        </p>

        <div className="w-full">
          <Image 
            src="/images/movimientos/flavio.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-xl'> 
          <strong>Soberanía regional y defensa de derechos territoriales</strong> 
        </p> 
        <p> 
          En la última década, los movimientos regionales se han centrado en la defensa de los derechos territoriales, especialmente en las regiones con fuertes inversiones en minería e hidrocarburos. La demanda por la soberanía regional se ha expresado en luchas por una mayor autonomía en la gestión de recursos naturales y un desarrollo más equitativo.
        </p>

        <p className='text-xl'> 
          <strong>Movimientos Regionales:</strong> 
        </p> 
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Movimientos regionales con inscripción en la región de Tacna en el año 2022</li>
          <li>Movimientos regionales inscritos en Huánuco el 19 de septiembre del 2024</li>
          <li>Movimientos regionales del 2024 inscritos en ROB</li>
        </ul>

        <div className="w-full">
          <Image 
            src="/images/movimientos/regionales.webp" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'> 
          <strong>Activismo digital, justicia social y protesta contra la corrupción</strong> 
        </p> 
        <p> 
          En la última década, los jóvenes han liderado movimientos de protesta masiva contra la corrupción y en defensa de la democracia. Además, han adoptado el activismo digital y las redes sociales como herramientas clave para la organización y movilización.
        </p>

        <p className='text-xl'> 
          <strong>Amo el Río</strong> 
        </p> 
        <p> 
          Amo el Río ha conectado con más de 350.000 personas a través de las redes sociales y ha reunido a más de 1.000 personas de todas las edades en actividades presenciales en Iquitos y Pucallpa, extendiéndose a Tarapoto y Puerto Maldonado, en San Martín y Madre de Dios, respectivamente; y alrededor de 150 jóvenes champions que son claves para generar el efecto multiplicador y replicador de Amo El Río.
        </p>

        <p className='text-xl'> 
          <strong>Protestas de noviembre 2020</strong> 
        </p> 
        <p> 
          Los jóvenes lideraron una serie de manifestaciones masivas tras la destitución del presidente Martín Vizcarra, exigiendo el respeto a la democracia y rechazando la corrupción en el Congreso. Las redes sociales fueron cruciales para organizar y difundir las protestas, mostrando el poder del activismo digital en Perú.
        </p>

        <div className="w-full">
          <Image 
            src="/images/movimientos/jovenes.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'> 
          <strong>Características y tendencias actuales</strong> 
        </p> 

        <p className='text-xl'> 
          <strong>Organización y movilización a través de redes sociales</strong> 
        </p> 
        <p> 
          Nacieron en la década de 1970 en la región de Cajamarca como respuesta a la inseguridad y los robos de ganado (abigeato).
        </p>

        <p className='text-xl'> 
          <strong>Protesta contra la ley pulpín (2014)</strong> 
        </p> 
        <p> 
          Esta movilización fue un ejemplo del uso de redes sociales para convocar a miles de jóvenes a las calles. La ley laboral que afectaba a jóvenes menores de 25 años fue anulada después de las manifestaciones, lo que demostró la efectividad de las redes sociales para coordinar movimientos masivos.
        </p>

        <p className='text-xl'> 
          <strong>Visibilización de causas y denuncia de abusos</strong> 
        </p> 
        <p> 
          Las redes sociales han permitido visibilizar casos de abuso de poder y actos de corrupción de manera más inmediata y efectiva.
        </p>

        <p className='text-xl'> 
          <strong>#NiUnaMenos (2016)</strong> 
        </p> 
        <p> 
          Las redes sociales lograron documentar y denunciar casos de violencia a mujeres que antes eran ignorados por los medios de comunicación. Fue fundamental para organizar marchas masivas en defensa de los derechos de las mujeres y en rechazo a la impunidad en casos de feminicidio.
        </p>
        <div className="w-full">
          <Image 
            src="/images/movimientos/menos.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
      </div>

      
    </div>
  );
  

  const [step, setStep] = useState(1); // Variable que mantiene el paso actual
  const totalSteps = 6;

  // Datos de los temas para cada paso
  const topics = [
    "Historia y evolución de los movimientos sociales",
    "Primeros movimientos (Siglo XIX - 1919)",
    "Consolidación (1919 - 1940)",
    "Transformación y desarrollo (1940 - 1970)",
    "Nuevos movimientos (1970 - 1990)",
    "Movimientos contemporáneos (1990 - Presente)"
  ];

  // Función para manejar el cambio de paso
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

  // Texto dinámico para "Anterior" y "Siguiente" basado en el paso actual
  const previousText = step > 1 ? topics[step - 2] : "Historia y evolución de los movimientos sociales";
  const nextText = step < totalSteps ? topics[step] : "";

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      default:
        return null;
    }
  };
  
  return (
    <>
      <section className="relative h-96">
        {/* Background Image */}
        <Image 
          src="/images/movimientos/fondo.jpg" 
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
              Historia y evolución de los movimientos sociales
            </h1>
            <Breadcrumb>
              <BreadcrumbList className='flex items-center justify-center max-w-screen-sm lg:max-w-screen-md '>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <LiaSlashSolid />
                <BreadcrumbItem>
                  <BreadcrumbPage>Temas</BreadcrumbPage>
                </BreadcrumbItem>
                <LiaSlashSolid />
                <BreadcrumbItem>
                  <BreadcrumbPage>Historia y evolución de los movimientos sociales</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>


      <div className="lg:grid lg:grid-cols-6 lg:grid-rows-1 max-w-7xl mx-auto mt-4">
        {/* Services Section */}
        <div className="lg:col-span-4 lg:row-span-1 lg:col-start-1 lg:row-start-1">
          {/* Desktop View */}
          <div className="lg:grid px-4 pt-4 lg:p-4">
            <div className='flex flex-col justify-start text-gray-600 space-y-2'>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center'>
                  <PiDotOutlineFill  className='text-pallette-10'/>
                  <TfiComment className='mr-1'/>
                  <HyvorCommentCount 
                    websiteId={websiteId} 
                    pageId={slug} 
                  />
                </div>
                <div className='flex items-center'>
                  <PiDotOutlineFill  className='text-pallette-10'/>
                  <IoCalendarOutline className='mr-1'/>
                  3 Diciembre, 2024
                </div>
              </div>
            </div>
            <br />
            {renderStep(step)}
            <div className="flex justify-between items-center my-4 h-36 border border-gray-200">
              {/* Se muestra el div de "Anterior publicación" solo si no estamos en el primer paso */}
              {step > 1 && (
                <div 
                  onClick={() => goToStep(step - 1)} 
                  className="flex flex-col items-start justify-start flex-1 p-4 group cursor-pointer" // Añadir 'group' aquí
                >
                  <div className="flex items-center">
                    <IoArrowBackSharp className="w-5 h-5 mr-2 text-gray-700 group-hover:text-blue-700" />
                    <span className="text-gray-700 group-hover:text-blue-700">
                      ANTERIOR PUBLICACION
                    </span>
                  </div>
                  <p className="mt-2">{previousText}</p>
                </div>

              )}

              {step == 1 && (
                <div className="flex flex-col items-start justify-start flex-1">

                </div>
              )}

              {/* Línea separadora solo si no estamos en el primer paso */}
              {step > 1 && (
                <div className="h-28 w-px bg-gray-200"></div>
              )}
              
              <div 
                onClick={() => goToStep(step + 1)} 
                className="flex flex-col items-end justify-end flex-1 p-4 group cursor-pointer">
                <div className="flex items-center">
                  <span className="text-gray-700 hover:text-gray-900 group-hover:text-blue-700 text-right">
                    {step < totalSteps ? "SIGUIENTE PUBLICACION" : "VOLVER AL INICIO"}
                  </span>
                  <IoArrowForward className="w-5 h-5 ml-2 text-gray-700 group-hover:text-blue-700" />
                </div>
                <p className="mt-2 text-right">{nextText}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Desktop Only */}
        <div className="px-4 lg:px-0 lg:col-span-2 lg:row-span-1 lg:col-start-5 lg:row-start-1 lg:mt-16 lg:ml-8 space-y-4">
          <div className='p-4 border border-gray-300'>
            <div className="flex flex-col items-start">
              <p className="text-xl font-semibold mb-2">Problemas identificados</p>
              <div className="flex space-x-2 w-full">
                <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Nivel nacional (Perú)</AccordionTrigger>
                  <AccordionContent>
                    <p className='text-gray-600 leading-relaxed space-y-2'>
                    A pesar del crecimiento económico en las últimas décadas, amplios sectores de la población (especialmente en zonas rurales) no han accedido a servicios básicos, empleo digno ni oportunidades de desarrollo.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Nivel regional (Huánuco)</AccordionTrigger>
                  <AccordionContent>
                    <p className='text-gray-600 leading-relaxed space-y-2'>
                    Los pueblos indígenas y comunidades campesinas reclaman el reconocimiento de sus derechos culturales, territoriales y la consulta previa para proyectos que los afectan.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className='p-4 border border-gray-300'>
            <div className="flex flex-col items-start">
              <p className="text-xl font-semibold mb-2">Soluciones propuestas</p>
              <div className="flex space-x-2 w-full">
                <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Nivel nacional (Perú)</AccordionTrigger>
                  <AccordionContent>
                    <div className='text-gray-600 leading-relaxed space-y-2'>    
                      <p className='text-black'>Implementar un Sistema Integral de Inclusión y Desarrollo Rural.</p>
                      <p>Garantizaremos que las comunidades rurales tengan acceso equitativo a servicios básicos, empleo y oportunidades mediante un sistema integrado de planificación, monitoreo y ejecución.</p>
                      <p>Este sistema podría usar inteligencia artificial para analizar datos demográficos, geográficos y socioeconómicos, identificando las comunidades más vulnerables.</p>
                      <p>Se va a priorizar la asignación de recursos para agua potable, electricidad, educación y salud en las zonas rurales mediante un modelo de toma de decisiones basado en datos.</p>
                      <p>La plataforma digital podría conectar a comunidades rurales con oportunidades de empleo remoto, formación técnica y apoyo para emprendedores locales (comercio electrónico para productos agrícolas).</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Nivel regional (Huánuco)</AccordionTrigger>
                  <AccordionContent>
                    <div className='text-gray-600 leading-relaxed space-y-2'>    
                      <p className='text-black'>Implementar una Plataforma de Gestión de Derechos y Consulta Ciudadana.</p>
                      <p>Con este sistema se busca facilitar la comunicación, la consulta previa y la gestión de derechos culturales y territoriales en proyectos que afectan a pueblos indígenas y comunidades campesinas.</p>
                      <p>Este será un sistema que registre los territorios ancestrales, con información cultural, social y ambiental relevante para proteger los derechos de estas comunidades.</p>
                      <p>Será una herramienta en la que las comunidades puedan participar en procesos de consulta previa en su idioma y mediante tecnologías accesibles (aplicaciones móviles o centros comunitarios).</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className='p-4 border border-gray-300'>
            <div className="flex flex-col items-start">
              <p className="text-xl font-semibold mb-2">Conclusiones</p>
              <div className="flex space-x-2 w-full mb-2">
                <div className="w-16 h-1 bg-blue-700 rounded-sm"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-sm"></div>
              </div>
              <div className='text-gray-600 mt-2 leading-relaxed space-y-2'>
                <p>Los movimientos sociales en Perú han sido esenciales para la defensa de la democracia y los derechos humanos, logrando importantes reformas políticas y visibilizando problemáticas como la violencia de género, la exclusión indígena y la corrupción.</p>
                <p>La articulación con movimientos internacionales y el uso de redes sociales han fortalecido las causas sociales en Perú, permitiendo una organización más efectiva y una mayor presión nacional e internacional para generar cambios.</p>
                <p>Las nuevas generaciones han tomado un rol protagónico en la defensa de la justicia social y el medio ambiente, consolidando al movimiento juvenil y ambientalista como actores clave para el futuro de Perú.</p>
              </div>
            </div>
          </div>

          <div className='p-8 border border-gray-300 bg-blue-600'>
            <div className="flex flex-col items-start text-white">
              <h1 className="text-2xl font-bold mb-2">¿Tienes una idea?</h1>
              <div className='leading-relaxed space-y-2'>
                <p>Crea una propuesta de solución para estos problemas y compartela con los demás.</p>
                <p>¡Ellos podrán opinar y comentar sobre tu propuesta!</p>
              </div>
              <Link href={'/mis-propuestas?step=2'}>
                <button className='text-lg border border-white py-2 px-4 mt-4 
                  hover:border-blue-600 hover:bg-white hover:text-blue-600
                  transition-all duration-200 ease-in-out'>
                  <div className='flex items-center justify-between space-x-2'>
                    <p>Crear una propuesta</p>
                    <p>→</p>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-4 lg:col-span-4">
          <HyvorCommentCount 
            websiteId={websiteId} 
            pageId={slug} 
          />

          {/* Sección de comentarios */}
          <HyvorComments 
            websiteId={websiteId}
            pageId={slug}
          />
        </div>
      </div>
    </>
  );
}