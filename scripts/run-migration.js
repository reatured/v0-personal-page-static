/**
 * 运行迁移脚本的辅助文件
 *
 * 使用方法:
 * 1. 安装ts-node: npm install -g ts-node typescript
 * 2. 运行: node scripts/run-migration.js
 *
 * 注意: 此脚本仅在服务器端运行，不会包含在客户端构建中
 */

const { execSync } = require("child_process")
const path = require("path")
const fs = require("fs")
const dotenv = require("dotenv")

// 加载环境变量
dotenv.config()

console.log("准备运行Supabase数据迁移脚本...")

// 检查必要的环境变量
const checkEnvVars = () => {
  const requiredVars = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"]
  const missing = requiredVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    console.error(`错误: 缺少必要的环境变量: ${missing.join(", ")}`)
    console.error("请确保这些变量在.env文件中设置或作为环境变量提供")
    process.exit(1)
  }
}

try {
  // 检查环境变量
  checkEnvVars()

  // 检查是否安装了ts-node
  try {
    execSync("ts-node --version", { stdio: "ignore" })
  } catch (error) {
    console.log("正在安装ts-node和typescript...")
    execSync("npm install -g ts-node typescript", { stdio: "inherit" })
  }

  // 安装dotenv依赖（如果需要）
  try {
    require.resolve("dotenv")
  } catch (error) {
    console.log("正在安装dotenv依赖...")
    execSync("npm install dotenv", { stdio: "inherit" })
  }

  // 运行迁移脚本
  console.log("运行迁移脚本...")
  execSync("ts-node scripts/migrate-to-supabase.ts", {
    stdio: "inherit",
    env: process.env, // 使用当前进程的环境变量
  })

  console.log("迁移完成!")
} catch (error) {
  console.error("迁移过程中出错:", error.message)
  process.exit(1)
}
