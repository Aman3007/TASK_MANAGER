import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);
