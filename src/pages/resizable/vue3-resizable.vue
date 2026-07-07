<template>
  <div class="resizable-page">
    <h2>vue3-resizable (LResize) 샘플</h2>
    <div class="lresize-columns">
      <div class="lresize-column">
        <h3>자유 리사이즈 박스</h3>
        <p>모서리/변을 드래그하면 크기가, 박스 안쪽을 드래그하면 위치가 바뀝니다.</p>
        <ClientOnly>
          <div class="lresize-wrap">
            <LResize
              :min-width="150"
              :min-height="100"
              :max-width="400"
              :max-height="320"
              :initial-width="250"
              :initial-height="180"
              :initial-top="40"
              :initial-left="40"
              :show-dimension="true"
              :show-position="true"
            >
              <div class="lresize-content">
                <p>vue3-resizable 샘플 박스</p>
              </div>
            </LResize>
          </div>
        </ClientOnly>
      </div>

      <div class="lresize-column">
        <h3>좌우 분할 샘플</h3>
        <p>가운데 핸들을 좌우로 드래그하면 왼쪽 패널 너비가 조절됩니다.</p>
        <ClientOnly>
          <div ref="splitWrapRef" class="lresize-split-wrap">
            <LResize
              ref="splitBoxRef"
              :min-width="120"
              :min-height="400"
              :max-width="splitMaxWidth"
              :max-height="400"
              :initial-width="200"
              :initial-height="400"
              :initial-top="0"
              :initial-left="0"
            >
              <div class="lresize-content">
                <p>왼쪽 패널</p>
              </div>
            </LResize>
            <div
              class="lresize-split-handle"
              :style="{ left: splitLeftWidth + 'px' }"
              @mousedown="startSplitDrag"
            ></div>
            <div class="lresize-split-right" :style="{ left: splitLeftWidth + HANDLE_WIDTH + 'px' }">
              <p>오른쪽 패널</p>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { LResize } from 'vue3-resizable'
import 'vue3-resizable/dist/index.css'

const RIGHT_MIN_WIDTH = 120
const HANDLE_WIDTH = 24

const splitWrapRef = ref<HTMLElement | null>(null)
const splitBoxRef = ref<InstanceType<typeof LResize> | null>(null)
const splitLeftWidth = ref(200)
const splitMaxWidth = ref(600)

let splitDragging = false
let splitStartX = 0
let splitStartWidth = 0

const updateSplitMaxWidth = () => {
  if (!splitWrapRef.value) return
  splitMaxWidth.value = splitWrapRef.value.clientWidth - HANDLE_WIDTH - RIGHT_MIN_WIDTH
}

const onSplitDrag = (e: MouseEvent) => {
  if (!splitDragging || !splitBoxRef.value) return
  const nextWidth = splitStartWidth + (e.clientX - splitStartX)
  const clamped = Math.min(Math.max(nextWidth, RIGHT_MIN_WIDTH), splitMaxWidth.value)
  // box는 LResize가 defineExpose로 노출하는 내부 반응형 상태라 직접 대입하면 즉시 리사이즈된다
  splitBoxRef.value.box.width = clamped
  splitBoxRef.value.updateBoxStyle()
  splitLeftWidth.value = clamped
}

const stopSplitDrag = () => {
  splitDragging = false
  window.removeEventListener('mousemove', onSplitDrag)
  window.removeEventListener('mouseup', stopSplitDrag)
}

const startSplitDrag = (e: MouseEvent) => {
  splitDragging = true
  splitStartX = e.clientX
  splitStartWidth = splitLeftWidth.value
  window.addEventListener('mousemove', onSplitDrag)
  window.addEventListener('mouseup', stopSplitDrag)
}

onMounted(() => {
  updateSplitMaxWidth()
  window.addEventListener('resize', updateSplitMaxWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSplitMaxWidth)
  window.removeEventListener('mousemove', onSplitDrag)
  window.removeEventListener('mouseup', stopSplitDrag)
})
</script>
