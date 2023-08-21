import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
// 开启gzip压缩
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    // 插件
    plugins: [
      vue(),
      // 开启gzip压缩 压缩大文件 减少打包体积
      viteCompression({
        deleteOriginFile: false,
        algorithm: "gzip",
        ext: '.gz',
      })
    ],
    // 打包输出文件夹
    build: {
      outDir: 'build',// 文件输出文件夹
      assetsDir: 'static',// 静态文件输出文件夹
      assetsInlineLimit: '4096',
      // 代码压缩
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    // 文件处理
    resolve: {
      // 路径
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      // 省略导入文件拓展名
      extensions: ['.js', '.ts', '.json', '.css', '.scss'],

    },
    // 服务端
    server: {
      host: true,// 监听所有地址
      port: 8080,// 端口
      https: false,
      open: true,
      proxy: {
        '/api': {
          target: env.VUE_APP_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
    }
  })
}
