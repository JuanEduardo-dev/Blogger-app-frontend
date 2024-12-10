import { MdEngineering } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { CiUser } from 'react-icons/ci';
import { Degree } from "@/types/user";

interface DegreeIconProps {
  degree: Degree;
  size?: string; // El prop 'size' es opcional
}

export const DegreeIcon: React.FC<DegreeIconProps> = ({ degree, size = '24px' }) => {
  switch (degree) {
    case 'Ingeniero':
      return <MdEngineering style={{ width: size, height: size }} />;
    case 'Estudiante':
      return <FaUser style={{ width: size, height: size }} />;
    case 'Profesor':
      return <FaChalkboardTeacher style={{ width: size, height: size }} />;
    case 'Bachiller':
    case 'Licenciado':
    case 'Magíster':
    case 'Doctor':
      return <FaUserGraduate style={{ width: size, height: size }} />;
    case 'Técnico':
      return <CiUser style={{ width: size, height: size }} />;
    default:
      return <FaUser style={{ width: size, height: size }} />;
  }
};
