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
import { CiUser } from 'react-icons/ci';
import HyvorComments, { HyvorCommentCount } from '@/components/ui/HyvorComments/HyvorComments';
import Link from 'next/link';
import { FaQuoteLeft } from "react-icons/fa";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5"
import { useState } from 'react';

export default function Home(params: { slug: any; }) {
  const slug = params.slug;
  const websiteId = 12265; // Tu ID de sitio web de Hyvor Talk
  const tituloTema = "Organización Política y Administrativa del Perú";

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
      <p className='text-3xl font-semibold text-gray-800'>La organización regional</p>
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
    </div>
  );

  const renderStep5 = () => (
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

  const renderStep6 = () => (
    <div>
      <div className='flex items-center mb-4'>
        <p className='text-gray-600 flex items-center'> 
          <CiUser className='mr-1'/>
          Por: Gómez Rojas Juan Eduardo
        </p>
      </div>
      <p className='text-3xl font-semibold text-gray-800'>La organización regional</p>
      <br />
      <iframe
        width="768"
        height="432"
        src="https://miro.com/app/live-embed/uXjVKOKpHas=/?moveToViewport=9132,-4111,4753,2339&embedId=389014252031"
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
    "Análisis comparativo",
    "Aportes de la Ingeniería de Sistemas"
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
  const nextText = step < totalSteps ? topics[step] : "Organización política y administrativa";

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


      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center max-w-6xl mx-auto mt-4">
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
            {renderStep(step)}
            <div className="flex justify-between items-center my-8 h-36 border border-gray-200">
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
            <HyvorCommentCount 
              websiteId={websiteId} 
              pageId={slug} 
            />

            {/* Sección de comentarios */}
            <HyvorComments 
              websiteId={websiteId}
              pageId={slug}
              title={tituloTema}
            />
          </div>
        </div>
        
        {/* Desktop Only */}
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
        </div>
        
        
        
        
        
        
        
        
        <div className="bg-gray-100 shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 border border-indigo-50 bg-white text-4xl rounded-full w-14 h-14 flex items-center justify-center">
                <FaQuoteLeft className='text-sm text-blue-500' />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Jenny Watson</h3>
                <p className="text-gray-500">Hi! beautiful people. I'm an author of this blog. Read our post - stay with us</p>
                <div className="mt-4 flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-gray-600">
                    <FaFacebook size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600">
                    <FaTwitter size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600">
                    <FaLinkedin size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600">
                    <FaPinterest size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        
        */}