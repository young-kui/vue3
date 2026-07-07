<template>
  <div class="resizable-page">
    <h2>Resizable 샘플</h2>
    <div ref="containerRef" class="resizable-demo">
      <div class="resizable-panel left" :style="{ width: leftWidth + 'px' }">
        <p>왼쪽 패널</p>
      </div>
      <div class="resizable-handle" @mousedown="startDrag">
        <svg class="handle-icon" width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="3" height="24" rx="1.5" fill="currentColor" />
          <rect x="6.5" y="0" width="3" height="24" rx="1.5" fill="currentColor" />
          <rect x="13" y="0" width="3" height="24" rx="1.5" fill="currentColor" />
        </svg>
      </div>
      <div class="resizable-panel right">
        <p>오른쪽 패널</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const MIN_WIDTH = 120
const HANDLE_WIDTH = 24

const containerRef = ref<HTMLElement | null>(null)
const leftWidth = ref(300)

let dragging = false
let startX = 0
let startWidth = 0

const onDrag = (e: MouseEvent) => {
  if (!dragging || !containerRef.value) return
  const containerWidth = containerRef.value.clientWidth
  const maxWidth = containerWidth - HANDLE_WIDTH - MIN_WIDTH
  const nextWidth = startWidth + (e.clientX - startX)
  leftWidth.value = Math.min(Math.max(nextWidth, MIN_WIDTH), maxWidth)
}

const stopDrag = () => {
  dragging = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}

const startDrag = (e: MouseEvent) => {
  dragging = true
  startX = e.clientX
  startWidth = leftWidth.value
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
})
</script>
