import React from 'react';

const Boton = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, danger, success
  size = 'md', // sm, md, lg
  disabled = false,
  className = '',
  icon = null,
  fullWidth = false,
}) => {
  // Base: sin sombras, bordes suaves, transiciones
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Estilos minimalistas: 
  // - primary: fondo sólido (sigue siendo llamativo)
  // - secondary: borde gris + texto gris (fondo transparente)
  // - danger: borde rojo claro + texto rojo (fondo transparente)
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-400',
    danger: 'bg-transparent border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 focus:ring-red-400',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
  };
  
  // Tamaños ajustados (más compactos)
  const sizes = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Boton;