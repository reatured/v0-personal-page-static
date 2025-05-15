/**
 * Markdown 处理工具
 * 使用 remark 和 rehype 库来解析和渲染 Markdown 内容
 */
import { remark } from "remark"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeStringify from "rehype-stringify"

/**
 * 将 Markdown 转换为 HTML
 * @param markdown Markdown 内容
 * @returns 转换后的 HTML 字符串
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  // 使用 remark 处理 Markdown
  const result = await remark()
    // 将 Markdown 转换为 rehype AST
    .use(remarkRehype, { allowDangerousHtml: true })
    // 保留原始的 HTML 标签
    .use(rehypeRaw)
    // 将 rehype AST 转换为 HTML 字符串
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}
