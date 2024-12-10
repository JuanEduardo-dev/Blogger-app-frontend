export interface User {
  name: string;
  lastName: string;
  mail?: string;
  bio: string;
  degreeTitle: string;
}

export type Degree = 'Sin grado académico' | 'Estudiante' | 'Bachiller' | 'Licenciado' | 'Magíster' | 'Doctor' | 'Ingeniero' | 'Técnico' | 'Profesor';

export const degreeMap: { [key: number]: Degree } = {
  1: 'Sin grado académico',
  2: 'Estudiante',
  3: 'Bachiller',
  4: 'Licenciado',
  5: 'Magíster',
  6: 'Doctor',
  7: 'Ingeniero',
  8: 'Técnico',
  9: 'Profesor'
};
