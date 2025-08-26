import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn() merges conditional class names with tailwind correctly
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
