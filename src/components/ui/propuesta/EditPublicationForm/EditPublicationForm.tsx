'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RxUpdate } from "react-icons/rx";
import 'react-quill-new/dist/quill.snow.css';

import ReactQuill from 'react-quill-new';

// Definición de tags y páginas
const TAGS = [
  "Sistemas Viables", "Dinámica de Sistemas", "Seguridad Informática", 
  "Auditoría Informática", "Investigación de Operaciones", "Electrónica Digital", 
  "Inteligencia Artificial", "Computación en la Nube", "Big Data", "Blockchain", 
  "Ciencia de Datos", "Internet de las Cosas (IoT)", "Simulación de Sistemas", 
  "Minería de Datos", "Sistemas Embebidos", "Criptografía", "Microcontroladores", 
  "Ingeniería de Software", "Sistemas Expertos", "Diseño de Procesos", 
  "Gestión de Procesos", "Modelado de Sistemas", "Otro"
];

const PAGES = [
  { value: "organizacion-politica-y-administrativa-del-peru", label: "Organización Política y Administrativa del Perú" },
  { value: "evolucion-de-los-movimientos-sociales-en-el-peru", label: "Evolución de los Movimientos Sociales en el Perú" }
];

export default function CreatePublicationForm({ publication, onSuccess }: { publication: any, onSuccess?: () => void }) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const [selectedTags, setSelectedTags] = useState<number[]>([]);  
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [content, setContent] = useState<string>(publication.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quillError, setQuillError] = useState('');
  const [customErrors, setCustomErrors] = useState({
    page: '',
    tags: '',
  });

  useEffect(() => {
    if (publication) {
      // Set page based on publication's page
      const pageIndex = PAGES.findIndex(page => page.value === publication.page.url);
      if (pageIndex !== -1) {
        setSelectedPage(pageIndex + 1);
      }

      // Set tags based on publication's tags
      const tagIndices = publication.tags.map((tag: { title: string; }) => 
        TAGS.findIndex(t => t.toLowerCase() === tag.title.toLowerCase()) + 1
      ).filter((index: number) => index > 0);
      
      setSelectedTags(tagIndices);
    }
  }, [publication]);


  // Memoize Quill modules to prevent unnecessary re-renders
  const quillModules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  }), []);

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'link',
    'align',
    'color',
    'code-block',
  ];

  const onSubmit = async (data: any) => {
    let hasErrors = false;

    // Validar selección de página
    if (!selectedPage) {
      setCustomErrors(prev => ({ ...prev, page: 'Por favor, selecciona una página' }));
      hasErrors = true;
    } else {
      setCustomErrors(prev => ({ ...prev, page: '' }));
    }

    // Validar selección de tags
    if (selectedTags.length === 0) {
      setCustomErrors(prev => ({ ...prev, tags: 'Por favor, selecciona al menos un tag' }));
      hasErrors = true;
    } else {
      setCustomErrors(prev => ({ ...prev, tags: '' }));
    }

    // Validar contenido del editor Quill
    const strippedContent = content.replace(/<(.|\n)*?>/g, '').trim();
    if (!strippedContent) {
      hasErrors = true;
      // Reemplaza el alert con un estado de error
      setQuillError('Por favor, ingrese contenido en el editor');
      return;
    } else {
      // Limpia el error de Quill si hay contenido
      setQuillError('');
    }

    if (hasErrors) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/publications/me/put?post=${publication.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          content: content,
          page_id: selectedPage,
          tags: selectedTags,
        }),
      });

      if (!response.ok) throw new Error('Error al actualizar la publicación');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tagIndex: number) => {
    setSelectedTags(prev => 
      prev.includes(tagIndex) 
        ? prev.filter(t => t !== tagIndex)
        : [...prev, tagIndex]
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Título */}
      <div>
        <label className="block mb-2 font-semibold">Título</label>
        <input 
          {...register("title", { 
            required: { 
              value: true, 
              message: "El título es obligatorio" 
            },
            maxLength: {
              value: 100,
              message: "El título no puede exceder 100 caracteres"
            }
          })} 
          defaultValue={publication?.title || ''}
          className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
                focus:outline-none focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-300 ease-in-out"
          placeholder="Ingresa el título de tu publicación"
        />
        {errors.title && (
          <span className="text-red-500 text-xs">
            {errors.title.message as string}
          </span>
        )}
      </div>
      
      {/* Editor de Contenido con Quill */}
      <div className="max-w-4xl mx-auto overflow-hidden overflow-x-hidden">
        <label className="block mb-2 font-semibold">Contenido</label>
        <ReactQuill
          value={content}
          onChange={(newContent) => {
            const plainText = newContent.replace(/<(.|\n)*?>/g, ''); // Eliminar las etiquetas HTML
            if (plainText.length <= 5000) {
              setContent(newContent); // Solo actualizar si el texto tiene 5000 caracteres o menos
              // Limpiar el error si se está escribiendo contenido
              if (plainText.trim() !== '') {
                setQuillError(''); // Limpiar el error si hay contenido
              }
            } else {
              // Si el texto excede los 5000 caracteres, no actualizar y opcionalmente mostrar un error
              setQuillError('El contenido no puede superar los 5000 caracteres.');
            }
          }}
          modules={quillModules}
          formats={quillFormats}
          theme="snow"
          className="h-64 lg:h-56 mb-2 w-auto"
        />
        {/* Muestra el error de Quill en rojo */}
        <div className="text-right text-sm text-gray-500 mt-20 md:mt-14 lg:mt-14 flex justify-between">
          <div>
            {quillError && (
              <span className="text-red-500 text-xs">{quillError}</span>
            )}
          </div>
          <div>
            {content.replace(/<(.|\n)*?>/g, '').length} / 5000 caracteres
          </div>
        </div>
      </div>

      {/* Selección de Página */}
      <div>
        <label className="block mb-2 font-semibold">Selecciona una Tema</label>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
          {PAGES.map((page, index) => (
            <button
              key={page.value}
              type="button"
              onClick={() => setSelectedPage(index + 1)}
              className={`p-3 border rounded-md transition-colors ${
                selectedPage === index + 1 
                  ? 'bg-pallette-10 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
        {customErrors.page && (
          <span className="text-red-500 text-xs">{customErrors.page}</span>
        )}
      </div>

      {/* Selección de Tags */}
      <div>
        <label className="block mb-2 font-semibold">Selecciona Tags</label>
        <div className="grid grid-cols-3 gap-2">
          {TAGS.map((tag, index) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(index + 1)}
              className={`p-2 text-xs border rounded-md transition-colors ${
                selectedTags.includes(index + 1)
                  ? 'bg-pallette-10 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {customErrors.tags && (
          <span className="text-red-500 text-xs">{customErrors.tags}</span>
        )}
      </div>

      {/* Botón de Envío */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full text-white py-2 rounded-md flex justify-center
           transition-all duration-300 
        
          ${isSubmitting ? 'bg-gray-400' 
            : 'bg-pallette-10 hover:bg-pallette-10-contrast focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
      >
        <div className='flex items-center justify-center'>
          {isSubmitting ? (
            <svg aria-hidden="true" className="inline w-8 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          ) : (
            <>
              <RxUpdate className='mr-2 h-5 w-5 text-white'/>
              Actualizar propuesta
            </>
          )}
        </div>
      </button>
    </form>
  );
}