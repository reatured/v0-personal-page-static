/**
 * 工具函数
 * 包含项目中使用的通用工具函数
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn 函数用于条件性地合并类名
 * 它结合了 clsx 和 tailwind-merge 的功能
 * @param inputs 类名数组
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
