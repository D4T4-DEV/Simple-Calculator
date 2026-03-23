import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "number" | "operator" | "action" | "equals";
  isLoading?: boolean;
  wide?: boolean; // Para el botón '0' o 'AC'
}

const CalcButton: React.FC<ButtonProps> = ({
  children,
  variant = "number",
  isLoading,
  wide,
  className = "",
  ...props
}) => {
  // Definición de estilos base y variantes
  const baseStyles =
    "flex items-center justify-center text-xl font-medium transition-all duration-150 active:scale-95 rounded-2xl h-16 shadow-sm mb-1";

  const variants = {
    number:
      "bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700",
    operator:
      "bg-orange-100 text-orange-600 hover:bg-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20",
    action:
      "bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600",
    equals:
      "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200 dark:shadow-none",
  };

  const widthClass = wide ? "col-span-2" : "col-span-1";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <span className="animate-pulse">...</span> : children}
    </button>
  );
};

export default CalcButton;
