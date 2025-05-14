/**
 * 项目和类别的类型定义
 */

export interface Project {
  slug: string
  title: string
  description: string
  date: string
  categories: string[]
  tags: string[]
  image: string
  content: string
  featured?: boolean
}

export interface Category {
  name: string
  slug: string
  description: string
  icon: string
}

export interface Tag {
  name: string
  slug: string
}
