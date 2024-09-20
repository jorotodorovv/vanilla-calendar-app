import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges CSS class names using clsx and twMerge
 * @param {...ClassValue[]} inputs - An array of class values to be combined
 * @returns {string} A merged string of CSS class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
