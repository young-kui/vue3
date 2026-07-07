<template>
  <div class="header">
    <p>현재 : <span class="ing_s">{{ ingCount }}</span> / 대기중 <span class="notfin">{{ notCompleteCount }}</span> / 완료 <span class="fin">{{ completedCount }}</span> / 전체 <span class="total_s">{{ totalCount }}</span><span>p</span></p>
  </div>
  <div class="items_v">
    <table class="listingitem">
      <colgroup>
        <col style="width:4%;">
        <col style="width:10%;">
        <col style="width:12%;">
        <col style="width:10%;">
        <col style="width:10%;">
        <col style="width:20%;">
        <col style="width:6%;">
        <col style="width:8%;">
        <col style="width:8%;">
        <col style="width:6%;">
        <col style="width:6%;">
      </colgroup>
      <thead>
        <tr>
          <th>no.</th>
          <th>뎁스1</th>
          <th>뎁스2</th>
          <th>뎁스3</th>
          <th>화면ID</th>
          <th>링크</th>
          <th>구분</th>
          <th>시작일</th>
          <th>종료일</th>
          <th>진행</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in files" :key="index" :class="item.division">
          <td class="no">{{ index + 1 }}</td>
          <td>{{ item.depth1 }}</td>
          <td>{{ item.depth2 }}</td>
          <td>{{ item.depth3 }}</td>
          <td class="start_date"><p v-for="(itemId, itemIndex) in item.s_id" :key="itemIndex">{{ itemId }}</p></td>
          <td class="link">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.link }}</a>
          </td>
          <!-- <NuxtLink :to="item.link">{{ item.link }}</NuxtLink> -->
          <td class="ing start_date">{{ item.realm }}</td>
          <td class="start_date">{{ item.s_date }}</td>
          <td class="end_date">{{ item.e_date }}</td>
          <td class="work" :class="item.status" v-html="item.log"></td>
          <td class="work" v-html="item.etc"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, watch } from 'vue'

interface FileItem {
  division: string,
  depth1: string,
  depth2: string,
  depth3: string,
  depth4: string,
  s_id: string[],
  link: string,
  realm: string,
  s_date: string,
  e_date: string,
  log: string,
  status: string,
  etc: string,
}

const files: FileItem[] = [
  {
    division: '',
    depth1: 'audio',
    depth2: 'audio 페이지',
    s_id: ['audio'],
    link: '/audio/audio',
    realm: '',
    s_date: '',
    e_date: '',
    log: '',
    status: 'fin',
    etc: '',
    depth3: '',
    depth4: '',
  },
  {
    division: '',
    depth1: 'calendar',
    depth2: 'calendar 페이지',
    s_id: ['calendar'],
    link: '/calendar/calendar',
    realm: '',
    s_date: '',
    e_date: '',
    log: '',
    status: 'fin',
    etc: '',
    depth3: '',
    depth4: '',
  },
  {
    division: '',
    depth1: 'resizable',
    depth2: 'resizable 페이지',
    s_id: ['resizable'],
    link: '/resizable/resizable',
    realm: '',
    s_date: '',
    e_date: '',
    log: '',
    status: 'fin',
    etc: '',
    depth3: '',
    depth4: '',
  },
  {
    division: '',
    depth1: 'resizable',
    depth2: 'vue3-resizable 페이지',
    s_id: ['vue3-resizable'],
    link: '/resizable/vue3-resizable',
    realm: '',
    s_date: '',
    e_date: '',
    log: '',
    status: 'fin',
    etc: '',
    depth3: '',
    depth4: '',
  },
  // {
  //   division: '',
  //   depth1: 'main',
  //   depth2: '메인',
  //   s_id: ['main'],
  //   link: '/main/mainsearch',
  //   realm: '',
  //   s_date: '',
  //   e_date: '',
  //   log: '',
  //   status: 'fin',
  //   etc: '',
  //   depth3: '',
  //   depth4: '',
  // },
  // {
  //   division: '',
  //   depth1: 'main',
  //   depth2: '메인',
  //   s_id: [''],
  //   link: '/main/mainsetting',
  //   realm: '',
  //   s_date: '',
  //   e_date: '',
  //   log: '',
  //   status: 'fin',
  //   etc: '',
  //   depth3: '',
  //   depth4: '',
  // },
  // {
  //   division: '',
  //   depth1: 'main',
  //   depth2: '메인(로딩)',
  //   s_id: [''],
  //   link: '/main/mainsetting_loading',
  //   realm: '',
  //   s_date: '',
  //   e_date: '',
  //   log: '',
  //   status: 'fin',
  //   etc: '',
  //   depth3: '',
  //   depth4: '',
  // },
  // {
  //   division: 'division',
  //   depth1: 'login',
  //   depth2: '로그인',
  //   s_id: ['login'],
  //   link: '/login/main',
  //   realm: '',
  //   s_date: '',
  //   e_date: '',
  //   log: '',
  //   status: 'fin',
  //   etc: '',
  //   depth3: '',
  //   depth4: '',
  // },
  // {
  //   division: 'division',
  //   depth1: 'slave',
  //   depth2: '슬레이브',
  //   s_id: ['slave'],
  //   link: '/slave/slave',
  //   realm: '',
  //   s_date: '',
  //   e_date: '',
  //   log: '',
  //   status: 'fin',
  //   etc: '',
  //   depth3: '',
  //   depth4: '',
  // },
  // {
  //   division: 'division',
  //   depth1: 'Publishing Guide',
  //   depth2: '공통 가이드',
  //   s_id: ['guide'],
  //   link: '/guide/guideview',
  //   realm: '',
  //   s_date: '',
  //   e_date: '',
  //   log: '',
  //   status: 'fin',
  //   etc: '',
  //   depth3: '',
  //   depth4: '',
  // },
  // {
  //   division: 'division',
  //   depth1: 'popup',
  //   depth2: '팝업 모음 목록',
  //   s_id: ['popup all'],
  //   link: '/popup/list',
  //   realm: '',
  //   s_date: '',
  //   e_date: '',
  //   log: '',
  //   status: 'fin',
  //   etc: '',
  //   depth3: '',
  //   depth4: '',
  // },
  // {
  //   division: 'division',
  //   depth1: 'main',
  //   depth2: '홈',
  //   s_id: ['home'],
  //   link: '/main/main',
  //   realm: '',
  //   s_date: '',
  //   e_date: '',
  //   log: '',
  //   status: 'fin',
  //   etc: '',
  //   depth3: '',
  //   depth4: '',
  // },
  // {
  //   division: '',
  //   depth1: 'main',
  //   depth2: '상세',
  //   s_id: ['home'],
  //   link: '/main/maindetail',
  //   realm: '',
  //   s_date: '',
  //   e_date: '',
  //   log: '',
  //   status: 'fin',
  //   etc: '',
  //   depth3: '',
  //   depth4: '',
  // },
  // {
  //   division: '',
  //   depth1: 'main',
  //   depth2: '검색',
  //   s_id: ['home'],
  //   link: '/main/mainsearch',
  //   realm: '',
  //   s_date: '',
  //   e_date: '',
  //   log: '',
  //   status: 'fin',
  //   etc: '',
  //   depth3: '',
  //   depth4: '',
  // },
]

// props
const props = withDefaults(
  // props 변수 설명
  // N(optional)가 있는 경우 함수 값이므로 default로 별도 설명
  // Y(optional) 값 엄격 경우 default 설명 필요
  defineProps<{
    title: string
    count: number
    isActive: boolean
  }>(),
  // props 변수 default - 필수인 아닌 경우 설명
  {
    title: '',
    count: 0,
    isActive: false
  }
)

// State
const state = reactive({
  currentTab: 0,
})

// Computed
const totalCount = computed(() => files.length)
const ingCount = computed(() => files.filter(v => v.status === 'ing').length)
const completedCount = computed(() => files.filter(v => v.status === 'fin').length)
const notCompleteCount = computed(() => totalCount.value - completedCount.value - ingCount.value)
const per = computed(() => (completedCount.value / totalCount.value) * 100)

// Lifecycle
onMounted(() => {
  console.log('mounted')
})

// watch
watch(() => state.currentTab, (val) => {
  console.log('tab changed', val)
})
</script>

<style lang="css" scoped>
.wrap {padding:10px}
table {border-collapse:collapse;border-spacing:0;}
table th, strong {font-weight:normal;}
h1{
  margin:0 0 10px 0;
  text-align:center;
  font-size:36px;
  color:#000
}
a {text-decoration:none;color:#000;}
a:hover {text-decoration:underline;}
.header::after {clear: both; content: ''; display: block;}
.header p {float: left;}
.header p + p {float:right}
table {
  width:100%;
  margin-top:5px;
  border-top:2px solid #1c51a8;
  table-layout: fixed;
}
table th, table td{
  padding:5px 7px;
  border-left:1px solid #ccc; border-bottom:1px solid #ccc;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 15px;
  color:#000;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
table td.link a {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
table th:rowspan + th, table td:rowspan + td{border-left:1px solid #ccc;}
td.line14, th.line14 {border-left:1px solid #ccc !important;}
table th:first-child, table td:first-child{border-left:0 none}
table thead th {
  font-family:'ngl';
  font-size:15px;
  color:#000;
  border-bottom:1px solid #ccc;
  background-color: #f2f2f2;
}
.no, .start_date, .end_date, .work {
  text-align:center;
  padding:5px 0
}
.lastdate {color: #1155CC;}
.stand_by {color:#777;}
.ing {color: #0484D4 !important;}
.fin, .per, .end {color:#ff0000 !important;}
.division td{border-top:3px solid #37b2d3;}
.div td{border-top:2px solid #7c8c90;}
.etc .pub-now {color:#ff0000 !important;}
.etc .pub-sh {font-size: 13px;margin-top:3px;}
</style>
