"use client";

import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "password";
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  pattern?: RegExp;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
  pattern,
  className = "",
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-[9px] font-black text-white/40 tracking-widest uppercase">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label} is required` : false,
          pattern: pattern
            ? { value: pattern, message: `Invalid ${label.toLowerCase()}` }
            : undefined,
        })}
        className={`w-full bg-white/10 border-b py-3 px-1 text-white text-xs font-bold focus:outline-none transition-all uppercase placeholder:text-white/10 ${error ? "border-red-500" : "border-white/20 focus:border-[#e2ff4a]"
          }`}
      />
      {error && (
        <span className="text-[9px] text-red-400 font-medium">
          {error.message}
        </span>
      )}
    </div>
  );
};
