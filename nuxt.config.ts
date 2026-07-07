// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  builder: 'vite',
  app:{
    head: {
      htmlAttrs: {
        lang: 'ko'
      },
      link: [{rel:'icon', type: 'images/x-icon', href: '/farvicon.ico'}]
    },
  },
  modules:[
    '@vue-final-modal/nuxt',
    'floating-vue/nuxt'
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  devServer: {
    port: 7004,
    host: '0.0.0.0'
  },
  css: [
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination',
    'vue-toastification/dist/index.css',
    '@vueform/multiselect/themes/default.css',
    '@vuepic/vue-datepicker/dist/main.css',
    'floating-vue/dist/style.css',
    'vue3-treeselect/dist/vue3-treeselect.css',
    '@/assets/style.scss' // scss 진입 파일명
  ],
  postcss:{
    plugins:{
      'postcss-pxtorem': {
        rootValue: 10, //1rem = 10px
        propList: ['*'], //모든 속성에 적용
        unitPrecision: 5,
        replace: true,
        mediaQuery: false, // 미디어쿼리 px -> rem 변환 여부
        minPixelValue: 2, // 변화 최소 px
        exclude: /node_modules/i, // node_modules 제외로 속도 향상
      }
    }
  },
  typescript: {
    strict: true,
    typeCheck: false, // 개발 중 속도 향상을 위해 비활성화(빌드 시에만 체크)
  },
  vite: {
    server:{
      watch:{
        // usePolling: true는 WSL/Docker에서만 필요, window에서는 제거
        ignored:['**/node_modules/**', '**/.nuxt/**', '**/.output/**']
      },
      hmr:{
        protocol: 'ws',
        host: 'localhost'
      },
      fs:{
        strict: false
      }
    },
    optimizeDeps:{
      //force: ture 제거 - 필요할 때만 재최적화,
      include: [
        'vue',
        'vue-router',
        'vue-final-modal',
        '@vueform/multiselect',
        '@vuepic/vue-datepicker',
        'floating-vue',
        'vue3-treeselect',
        'vuex'
      ],
    },
    css: {
      preprocessorOptions:{
        scss:{
          additionalData: `` // 전역 변수
        }
      }
    }
  }
})
