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
import { FaQuoteLeft } from "react-icons/fa";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5"
import { useState } from 'react';

export default function Home() {
  const slug = "evolucion-de-los-movimientos-sociales-en-el-peru";
  const websiteId = 12265; // Tu ID de sitio web de Hyvor Talk

  const renderStep1 = () => (
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
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl font-semibold text-gray-800'>Importancia de estructura en la gobernanza del país</p>
        <p className='text-xl'><strong>Gobernanza</strong></p>
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

        <p className='text-xl'><strong>Descentralización</strong></p>
        <p>
          La descentralización consiste en la separación de competencias y funciones entre los tres niveles de gobierno (gobierno nacional, regional y local) así como un equilibrado ejercicio del poder en beneficio de la población.
        </p>
        <p>
          Debe ser un proceso permanente, dinámico, irreversible, democrático, integral, subsidiario y gradual.
        </p>
        <br />
        <div className="bg-indigo-50 p-6 w-full relative">
          {/* Círculo con comillas */}
          <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 border border-indigo-50 bg-white text-4xl rounded-full w-14 h-14 flex items-center justify-center">
            <FaQuoteLeft className='text-sm text-blue-500' />
          </div>

          <p className='mt-4'>
            La importancia de la estructura en la gobernanza de un país radica en la capacidad de organizar y coordinar de manera eficiente los diferentes niveles y sectores del gobierno para asegurar el cumplimiento de las políticas públicas, la administración efectiva de recursos, y la prestación de servicios a la población.
          </p>
          <p>
            La estructura en la gobernanza es fundamental para asegurar que el país pueda enfrentar de manera efectiva sus desafíos internos y externos, garantizando un desarrollo sostenible y un bienestar generalizado para la población.
          </p>
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
      <p className='text-3xl font-semibold text-gray-800'>La organización nacional</p>
      <br />
      <div className='text-gray-600 mb-4 leading-relaxed space-y-4'>
        <p className='text-2xl'>
          <strong>Poder ejecutivo</strong>
        </p>
        <p>
          Según la Ley Orgánica del Poder Ejecutivo LEY N° 29158 (Publicado el 20 de diciembre de 2007), el Poder Ejecutivo está integrado por:
        </p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>La Presidencia de la República.</li>
          <li>El Consejo de Ministros.</li>
          <li>La Presidencia del Consejo de Ministros.</li>
          <li>Los Ministerios.</li>
          <li>Entidades Públicas del Poder Ejecutivo.</li>
        </ul>

        <p className='text-xl'>
          <strong>Funciones:</strong>
        </p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Reglamentar las leyes, evaluar su aplicación y supervisar su cumplimiento.</li>
          <li>Planificar, normar, dirigir, ejecutar y evaluar las políticas nacionales y sectoriales en conformidad con las políticas de Estado.</li>
          <li>Establecer relaciones, buscar el consenso, prestar asistencia técnica y desarrollar mecanismos de cooperación con todas las entidades de la administración pública.</li>
          <li>Implementar la coordinación con los gobiernos regionales y gobiernos locales, con énfasis en las competencias compartidas.</li>
          <li>Otras funciones que le asignen las leyes.</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/organizacion/poder-ejecutivo.png" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className="mt-4 text-2xl">
          <strong>Poder legislativo</strong>
        </p>

        <p className="text-xl">
          <strong>Composición:</strong> 
        </p>
        <p>
          El Poder Legislativo de Perú está constituido por el Congreso de la República, un parlamento unicameral, según lo establecido en la Constitución Política de 1993. Está compuesto por 130 congresistas elegidos mediante sufragio directo por un período de cinco años. Los congresistas representan a los diferentes departamentos del país en función de la población de cada región.
        </p>

        <p className='text-xl'><strong>Funciones:</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Tiene la potestad de elaborar, modificar, interpretar y derogar las leyes que rigen el país.</li>
          <li>El Congreso ejerce control sobre el Poder Ejecutivo mediante la interpelación de ministros, censura y fiscalización.</li>
          <li>Puede aprobar mociones de censura contra ministros de Estado o incluso el presidente de la República.</li>
          <li>El Congreso ratifica tratados internacionales que el Poder Ejecutivo haya firmado en nombre del país.</li>
          <li>Es responsable de aprobar el presupuesto general de la nación, propuesto por el Ejecutivo, y de fiscalizar su ejecución.</li>
          <li>Otros roles incluyen aprobar la declaración de guerra, conceder amnistías, y controlar el uso de los recursos del Estado a través de comisiones investigadoras.</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/organizacion/poder-legislativo.jpeg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className="mt-4 text-2xl">
          <strong>Poder judicial</strong>
        </p>
        <p>
          El Poder Judicial de Perú es el órgano encargado de la administración de justicia, y su estructura y competencias están reguladas por la Ley Orgánica del Poder Judicial (Ley N° 26733) y la Constitución Política.
        </p>
        <ul className='leading-relaxed space-y-4'>
          <li><strong>Corte Suprema de Justicia:</strong> Es el más alto tribunal del país, con sede en Lima. Está compuesta por varias salas (civil, penal, constitucional y social) que resuelven casos en última instancia.</li>
          <li><strong>Cortes Superiores:</strong> Son tribunales de segunda instancia y están presentes en cada departamento del país. Supervisan el trabajo de los juzgados especializados y mixtos en sus respectivas jurisdicciones.</li>
          <li><strong>Juzgados Especializados y Mixtos:</strong> Encargados de conocer en primera instancia casos penales, civiles, laborales, comerciales, etc.</li>
          <li><strong>Juzgados de Paz:</strong> Operan en áreas rurales y urbanas para resolver conflictos menores mediante procedimientos más simples y accesibles.</li>
        </ul>

        <p className='text-xl'><strong>Funciones:</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Impartición de justicia, resuelve conflictos de intereses entre las personas, instituciones, y el Estado mediante la aplicación de las leyes y el debido proceso.</li>
          <li>Protección de derechos, garantiza el respeto de los derechos fundamentales de las personas, protegiendo a los ciudadanos frente a abusos o violaciones de derechos por parte del Estado u otros actores.</li>
          <li>Control Constitucional, asegura que las leyes y actos de los otros poderes del Estado se ajusten a la Constitución.</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/organizacion/poder-judicial.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className="mt-4 text-2xl">
          <strong>Organismos constitucionales autónomos</strong>
        </p>
        <p>
          <strong className='mt-4 text-xl'>JNE:</strong> 
        </p>  
        <p>
          El Jurado Nacional de Elecciones (JNE) es un organismo constitucional autónomo que actúa como tribunal electoral del Perú.
        </p>
        <p className='text-xl'><strong>Funciones:</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Fiscalizar la legalidad del ejercicio del sufragio y de la realización de los procesos electorales.</li>
          <li>Mantener y custodiar el registro de organizaciones políticas.</li>
          <li>Velar por el cumplimiento de las normas sobre organizaciones políticas y disposiciones electorales.</li>
          <li>Administrar justicia en materia electoral.</li>
          <li>Proclamar a los candidatos elegidos y expedir las credenciales correspondientes.</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/organizacion/jne.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p>
          <strong className='mt-4 text-xl'>ONPE:</strong> 
        </p>  
        <p className="mt-4">
          La Oficina Nacional de Procesos Electorales (ONPE) es un organismo autónomo que organiza y ejecuta los procesos electorales, referendos y otros tipos de consulta popular.
        </p>
        <p className='text-xl'><strong>Funciones:</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Planificar, preparar y ejecutar todas las acciones necesarias para el desarrollo de los procesos electorales a su cargo.</li>
          <li>Verificar y controlar externamente la actividad económico-financiera de las organizaciones políticas.</li>
          <li>Brindar apoyo y asistencia técnica a partidos políticos y organizaciones que lo soliciten.</li>
          <li>Verificación de firmas y registros electrónicos.</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/organizacion/onpe.jpeg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p>
          <strong className='mt-4 text-xl'>Defensoría del Pueblo:</strong> 
        </p>  
        <p className="mt-4">
          La Defensoría del Pueblo es un órgano constitucional autónomo creado por la Constitución de 1993. El Defensor del Pueblo es elegido por el Congreso por un período de cinco años.
        </p>
        <p className='text-xl'><strong>Funciones:</strong></p>
        <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Iniciar investigaciones sobre actos irregulares de la administración pública que afecten derechos constitucionales y fundamentales.</li>
          <li>Ejercer acciones legales ante el Tribunal Constitucional y promover tratados internacionales sobre derechos humanos.</li>
          <li>Ejercer el derecho de iniciativa legislativa y promover la defensa de los derechos constitucionales.</li>
          <li>Dictar reglamentos para el cumplimiento de sus funciones y la tramitación de quejas.</li>
        </ul>
        <div className="w-full">
          <Image 
            src="/images/organizacion/defensoria.jpg" 
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

  const renderStep3 = () => (
    <div>
      <div className='flex items-center mb-4'>
        <p className='text-gray-600 flex items-center'> 
          <CiUser className='mr-1'/>
          Por: Leon Estean Ian James
        </p>
      </div>
      <p className='text-3xl font-semibold text-gray-800'>La organización regional de Huánuco</p>
      <br />
      <div className='text-gray-600 mb-4 leading-relaxed space-y-4'>
        <p className='text-2xl'>
          <strong>Consejo regional</strong>
        </p>
        <p>
          Es el órgano normativo y fiscalizador del Gobierno Regional de Huánuco. La función normativa la ejerce a través de la aceptación o aprobación, modificación y derogación de normas de carácter regional, que regulan o reglamentan los asuntos y materias de competencia de la institución.
        </p>
        <div className="w-full">
          <Image 
            src="/images/organizacion/consejo-regional.webp" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'>
          <strong>Gobernación regional</strong>
        </p>
        <p>
          Recae en el gobernador regional, quien es la máxima autoridad de su jurisdicción, representante legal y titular del pliego presupuestal del GOREHCO.
        </p>
        <div className="w-full">
          <Image 
            src="/images/organizacion/organigrama-regional.png" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'>
          <strong>Estructura administrativa regional en huánuco</strong>
        </p>
        
        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>          
          <p className='text-xl mb-4'>
            <strong>Gobierno regional de huánuco:</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Gobernador Regional</li>
            <li>Consejo Regional</li>
          </ul>
        </div>
        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>      
          <p className='text-xl mb-4'>
            <strong>Direcciones regionales:</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Dirección Regional de Salud</li>
            <li>Dirección Regional de Educación</li>
            <li>Dirección Regional de Agricultura</li>
            <li>Dirección Regional de Transportes y Comunicaciones</li>
            <li>Dirección Regional de Energía y Minas</li>
          </ul>
        </div>
        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>
          <p className='text-xl mb-4'>
            <strong>División política-administrativa:</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Provincias</li>
            <li>Distritos</li>
          </ul>
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
      
      <p className='text-3xl font-semibold text-gray-800'>Organización Local de Huánuco</p>
      <br />
      <div className='text-gray-600 mb-4 leading-relaxed space-y-4'>
        <p className='text-2xl'>
          <strong>Concejo Municipal</strong>
        </p>
        <p>
          El Concejo Municipal de la Municipalidad Provincial de Huánuco es el máximo órgano de gobierno. Está compuesto por el alcalde provincial, Juan Antonio Jara Gallardo, y trece regidores. Ley Orgánica de Municipalidades N° 27972 y su Reglamento Interno de Concejo (RIC).
        </p>
        <div className="w-full">
          <Image 
            src="/images/organizacion/concejo-huanuco.webp" 
            alt="Consejo Municipal de Huánuco" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'>
          <strong>Comisiones de Regidores</strong>
        </p>
        <p>
          Las Comisiones de Regidores pueden ser permanentes o especiales y se desarrollan dentro de sus atribuciones y fines específicos.
        </p>
        <div className="w-full">
          <Image 
            src="/images/organizacion/regidores.png" 
            alt="Comisiones de Regidores" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'>
          <strong>Otros organismos</strong>
        </p>
        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>          
          <p className='text-xl mb-4'>
            <strong>Órgano de Dirección Ejecutiva:</strong>
          </p>
          <p>
            Es el Órgano Ejecutivo del más alto nivel técnico administrativo de la Municipalidad Provincial de Huánuco. Es responsable de disponer el cumplimiento de las Políticas, Objetivos y Metas comprendidas en el Plan Operativo Institucional y el Presupuesto Municipal.
          </p>
        </div>

        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>      
          <p className='text-xl mb-4'>
            <strong>Órganos de Coordinación, Consultivos y de Participación:</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>
              <strong>Consejo de Coordinación Local Provincial:</strong> Corresponde al Consejo de Coordinación Local Provincial cumplir las funciones que se establecen en la Ley Orgánica de Municipalidades N° 27972; así como aquellas específicas contenidas en su Reglamento de Organización y Funciones, dispuesto en la Ordenanza correspondiente de la Municipalidad.
            </li>
            <li>
              <strong>Órgano de Control Institucional:</strong> Es responsable de realizar el control gubernamental de la Municipalidad Provincial de Huánuco, asegurando la gestión correcta y transparente de los recursos y bienes públicos. Esto incluye garantizar la legalidad y eficiencia de los actos y operaciones de la entidad.
            </li>
          </ul>
        </div>

        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>      
          <p className='text-xl mb-4'>
            <strong>Órganos de Asesoramiento:</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>
              <strong>Gerencia de Asesoría Jurídica:</strong> Es el Órgano de Asesoramiento encargado de planear, organizar, dirigir, coordinar y controlar los asuntos de carácter jurídico de la Municipalidad, está a cargo de un funcionario de Confianza designado por el alcalde, y puede ser removido por decisión del Titular del Pliego. Depende jerárquicamente de la Gerencia Municipal.
            </li>
            <li>
              <strong>Gerencia de Planificación y Presupuesto:</strong> Es el órgano de asesoramiento técnico encargado de planificar, organizar, dirigir, coordinar y controlar actividades relacionadas con los sistemas de planificación y estadística, presupuesto, inversiones, cooperación técnica y desarrollo organizacional. Está dirigido por un funcionario de confianza designado por el alcalde.
            </li>
          </ul>
        </div>
        <div className="w-full">
          <Image 
            src="/images/organizacion/organigrama.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'>
          <strong>Organización Administrativa a Nivel Local en Huánuco</strong>
        </p>

        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>      
          <p className='text-xl mb-4'>
            <strong>Municipalidades Provinciales:</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Municipalidades Provinciales</li>
            <li>Autoridades (alcalde provincial y consejo provincial)</li>
          </ul>
        </div>

        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>      
          <p className='text-xl mb-4'>
            <strong>Municipalidades Distritales:</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Municipalidades Distritales</li>
            <li>Autoridades (alcalde distrital y consejo distrital)</li>
          </ul>
        </div>

        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>      
          <p className='text-xl mb-4'>
            <strong>Estructura y Funciones:</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Alcalde Provincial y distrital</li>
            <li>Regidores</li>
          </ul>
        </div>

        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>      
          <p className='text-xl mb-4'>
            <strong>Servicios y Proyectos:</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Servicios Públicos</li>
            <li>Proyectos de Desarrollo</li>
          </ul>
        </div>

        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>      
          <p className='text-xl mb-4'>
            <strong>Participación Ciudadana:</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Juntas Vecinales</li>
            <li>Organizaciones Sociales</li>
          </ul>
        </div>

        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>
          <p className='text-xl mb-4'>
            <strong>Municipalidades Provinciales:</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Municipalidad Provincial de Huánuco</li>
            <li>Municipalidad Provincial de Amarilis</li>
            <li>Municipalidad Provincial de Leoncio Prado</li>
            <li>Municipalidad Provincial de Pachitea</li>
            <li>Municipalidad Provincial de Huacaybamba</li>
            <li>Municipalidad Provincial de Huamalíes</li>
            <li>Municipalidad Provincial de Dos de Mayo</li>
            <li>Municipalidad Provincial de Yarowilca</li>
            <li>Municipalidad Provincial de Lauricocha</li>
            <li>Municipalidad Provincial de Puerto Inca</li>
            <li>Municipalidad Provincial de José Crespo y Castillo</li>
          </ul>
        </div>
      </div>


    </div>
  );

  const renderStep5 = () => (
    <div>
      <div className='flex items-center mb-4'>
        <p className='text-gray-600 flex items-center'> 
          <CiUser className='mr-1'/>
          Por: Lázarro Arratea Nilson
        </p>
      </div>
      <p className='text-3xl font-semibold text-gray-800'>Aportes de la Ingeniería de Sistemas en la Organización Política y Administrativa de Perú</p>
      <br />
      <div className='text-gray-600 mb-4 leading-relaxed space-y-4'>
        <p className='text-2xl'>
          <strong>Gobierno Electrónico y Transparencia</strong>
        </p>
        <p>
          La implementación de plataformas digitales y sistemas de información ha sido fundamental para aumentar la transparencia y eficiencia en la administración pública. Un ejemplo es el Portal de Transparencia del Estado Peruano, que permite a los ciudadanos acceder a información sobre gastos públicos, contribuyendo a una mayor rendición de cuentas.
        </p>

        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>
          <p className='text-xl mb-4'>
            <strong>Iniciativas Claves</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>
              <strong>Portal de Servicios al Ciudadano y Empresas (PSCE):</strong> Este portal permite a los ciudadanos acceder a una amplia gama de servicios en línea, desde la emisión de documentos oficiales hasta la consulta de trámites en diversas entidades gubernamentales.
            </li>
            <li>
              <strong>Plataforma del Sistema Electrónico de Contrataciones del Estado (SEACE):</strong> Un sistema que facilita la transparencia en las contrataciones públicas, permitiendo el seguimiento en tiempo real de los procesos de licitación y compra del Estado.
            </li>
          </ul>
        </div>

        <p className='text-2xl'>
          <strong>Gobierno Digital y Ciberseguridad</strong>
        </p>
        <p>
          El gobierno peruano ha trabajado en la creación de marcos normativos y estrategias para proteger la infraestructura crítica y los datos personales, mejorando así la confianza en los servicios digitales.
        </p>
        <div className="w-full">
          <Image 
            src="/images/organizacion/transformacion.jpg" 
            alt="Dental consultation" 
            className="w-full h-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
          />
        </div>
        <p className='text-2xl'>
          <strong>Ciberseguridad y Gobernanza Cibernética</strong>
        </p>
        <p>
          La ciberseguridad en Perú se enfoca en la protección de los sistemas informáticos y los datos sensibles, tanto en el ámbito gubernamental como en el sector privado. El rápido avance de las tecnologías ha llevado al país a adoptar medidas más estrictas para evitar ciberataques y proteger la infraestructura crítica. Los organismos gubernamentales, como la Presidencia del Consejo de Ministros (PCM), lideran estas iniciativas.
        </p>

        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>
          <p className='text-xl mb-4'>
            <strong>Iniciativas de Ciberseguridad</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>
              <strong>Centro Nacional de Seguridad Digital (CNSD):</strong> Creado en 2020, este centro tiene como misión garantizar la seguridad de la información en los sistemas del gobierno peruano y promover la protección en entidades privadas. Su enfoque principal es la prevención y respuesta ante incidentes cibernéticos.
            </li>
            <li>
              <strong>Normativa de Ciberseguridad:</strong> Perú ha implementado varias normativas que buscan regular la seguridad de la información. La Ley N° 30096 o Ley de Delitos Informáticos establece sanciones para aquellos que cometen delitos cibernéticos, y la Política Nacional de Ciberseguridad define los principios y objetivos para proteger el ciberespacio peruano.
            </li>
            <li>
              <strong>CSIRT Perú (Equipo de Respuesta ante Emergencias Informáticas):</strong> Este organismo coordina la respuesta ante incidentes de ciberseguridad y apoya tanto al gobierno como a las empresas privadas para mitigar ataques y vulnerabilidades.
            </li>
          </ul>
        </div>

        <p className='text-2xl'>
          <strong>Gestión de Recursos Hídricos</strong>
        </p>
        <p>
          En el sector de recursos hídricos, ingenieros de sistemas han participado en proyectos como la modernización del manejo del agua en el país. Esto incluye la implementación de sistemas de monitoreo y control de recursos hídricos para hacer frente a desafíos como la desertificación y la gestión de recursos en regiones áridas.
        </p>

        <div className='border border-gray-300 rounded-md p-4 bg-pallette-30'>
          <p className='text-xl mb-4'>
            <strong>Plan Nacional de Recursos Hídricos</strong>
          </p>
          <ul className='leading-relaxed space-y-4' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>
              <strong>Reforestación y conservación de cuencas:</strong> El plan promueve la reforestación en áreas críticas y la conservación de cuencas hidrográficas para asegurar la disponibilidad de agua a largo plazo.
            </li>
            <li>
              <strong>Mecanización de la agricultura:</strong> Se busca incrementar el uso de tecnologías modernas en la agricultura para reducir el consumo de agua y mejorar la eficiencia en el uso de este recurso.
            </li>
            <li>
              <strong>Medición y control del uso del agua:</strong> Se han instalado medidores de agua en áreas urbanas y rurales para controlar y regular el consumo.
            </li>
          </ul>
        </div>

        <p className='text-2xl'>
          <strong>Optimización de Recursos en Huánuco</strong>
        </p>
        <p>
          En Huánuco, se han implementado sistemas de gestión para mejorar la planificación y el uso de los recursos en el sector público. Un ejemplo es la digitalización de procesos en la Dirección Regional de Salud (DIRESA), donde la Ingeniería de Sistemas ha permitido la optimización del manejo de insumos médicos y la mejora en la distribución de recursos para enfrentar emergencias sanitarias.
        </p>

        <p className='text-2xl'>
          <strong>Desarrollo de Infraestructura Tecnológica</strong>
        </p>
        <p>
          Huánuco ha visto la implementación de redes de telecomunicaciones y centros de datos regionales, como parte de un esfuerzo por modernizar la administración pública. El proyecto de conectividad regional ha involucrado la instalación de fibra óptica y la mejora de la infraestructura de telecomunicaciones, facilitando una mayor interconexión entre las instituciones públicas.
        </p>

        <p className='text-2xl'>
          <strong>Descentralización y Gestión Local</strong>
        </p>
        <p>
          La Ingeniería de Sistemas ha beneficiado la descentralización mediante la implementación de sistemas como el Sistema de Información Municipal (SIM), adoptado por varias municipalidades en Huánuco para mejorar la gestión de información, como registros civiles, catastros y recaudación de impuestos.
        </p>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div>
      <div className='flex items-center mb-4'>
        <p className='text-gray-600 flex items-center'> 
          <CiUser className='mr-1'/>
          Por: Gómez Rojas Juan Eduardo
        </p>
      </div>
      <p className='text-3xl font-semibold text-gray-800'>Análisis comparativo</p>
      <br />
      <iframe
        width="100%"
        height="532"
        src="https://miro.com/app/live-embed/uXjVKOKpHas=/?moveToViewport=9132,-4222,4222,2339&embedId=389014252031"
        allow="fullscreen; clipboard-read; clipboard-write"
        allowFullScreen
      ></iframe>
    </div>
  );
  

  const [step, setStep] = useState(1); // Variable que mantiene el paso actual
  const totalSteps = 6;

  // Datos de los temas para cada paso
  const topics = [
    "Organización política y administrativa",
    "Organización Nacional",
    "Organización Regional",
    "Organización Local",
    "Aportes de la Ingeniería de Sistemas",
    "Análisis comparativo",
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
  const previousText = step > 1 ? topics[step - 2] : "Organización política y administrativa";
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
                  <BreadcrumbPage>Temas</BreadcrumbPage>
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


      <div className="lg:grid lg:grid-cols-6 lg:grid-rows-1 max-w-7xl mx-auto mt-4">
        {/* Services Section */}
        <div className="lg:col-span-4 lg:row-span-1 lg:col-start-1 lg:row-start-1">
          {/* Desktop View */}
          <div className="lg:grid p-4">
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
                    A pesar de las políticas de descentralización, Lima concentra la mayor parte de los recursos económicos, políticos y administrativos. Esto genera desigualdad en la distribución de recursos y servicios públicos.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Nivel regional (Huánuco)</AccordionTrigger>
                  <AccordionContent>
                    <p className='text-gray-600 leading-relaxed space-y-2'>
                    Muchos gobiernos regionales no cuentan con personal capacitado para ejecutar proyectos de inversión pública ni para gestionar adecuadamente los recursos transferidos.
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
                      <p className='text-black'>Implementar un Sistema de Gestión Descentralizado Basado en Datos.</p>
                      <p>Este sistema permitiría una gestión más eficiente y transparente de los recursos y servicios públicos en el país.</p>
                      <p>La plataforma tendrá una infraestructura digital que permita la integración de gobiernos regionales y locales a una base de datos central, pero con autonomía para gestionar recursos localmente.</p>
                      <p>Se deberá desarrollar un modelo que evalúe indicadores como población, índice de desarrollo humano, necesidades sociales y presupuesto para asignar recursos de forma justa.</p>
                      <p>El monitoreo será en tiempo real de recursos y servicios. Para ello se usará sensores y sistemas de seguimiento para auditar la ejecución de recursos públicos y garantizar que lleguen a donde más se necesitan.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Nivel regional (Huánuco)</AccordionTrigger>
                  <AccordionContent>
                    <div className='text-gray-600 leading-relaxed space-y-2'>    
                      <p className='text-black'>Desarrollar un Sistema de Formación y Gestión de Competencias para los gobiernos regionales.</p>
                      <p>La plataforma de e-learning para capacitación tendrá cursos virtuales especializados en gestión pública, planificación y ejecución de proyectos de inversión pública.</p>
                      <p>Con la ayuda de simuladores de gestión de proyectos, se permitirá a los funcionarios practicar la ejecución de proyectos en entornos virtuales.</p>
                      <p>Contar con un repositorio digital que almacene guías, mejores prácticas, normativa y lecciones aprendidas sobre la gestión de proyectos públicos.</p>
                      <p>Realizar el seguimiento de desempeño, para ello se usará un módulo que mida el progreso y efectividad de los funcionarios capacitados, generando recomendaciones personalizadas para mejorar su desempeño.</p>
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
                <p>La organización administrativa y política del Perú, enfrenta desafíos significativos en su funcionamiento, especialmente en lo que respecta a la coordinación y eficiencia de la gestión pública.</p>
                <p>Es evidente que la falta de integración tecnológica entre estos niveles contribuye a problemas reales como la ineficaz distribución de recursos y la lenta respuesta a emergencias.</p>
                <p>Además, la corrupción sigue siendo un obstáculo importante debido a la falta de transparencia en la administración de los gobiernos locales y regionales.</p>
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