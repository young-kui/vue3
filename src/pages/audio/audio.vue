<template>
  <div class="no-schedule-pop-info">
    <div class="recoding-view-area">
      <div class="recoding-view">
        <div class="recoding-graph">
          <div class="spectrum-container">
            <div
              v-for="i in state.barLen"
              :key="i"
              class="spectrum-bar"
              :class="{ 'animate-wave': propProgress > 0 }"
              :style="{
                height: getBarHeight(i) + 'px',
                backgroundColor: getGradientColor(i, state.barLen)
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  propProgress?: number
}

const props = withDefaults(defineProps<Props>(), {
  propProgress: 18
})

const state = reactive({
  barLen: 42,
  animationFrame: Date.now()
})

// 각 바의 높이를 계산하는 함수 (진동 패턴을 만들기 위해)
const getBarHeight = (index: number) => {
  const minHeightPercent = 0.18 // 최소 높이 18%
  if (props.propProgress <= 0) return minHeightPercent * 100

  // 사인파 리듬 오도록하여 워브모양 스타일
  const scrollSpeed = 1.8 // 스크롤 속도

  // 각 바의 시간 위치 (오도록에서 왼도록으로)
  const timePosition = (index * scrollSpeed) + (state.animationFrame * 0.5)

  // 모스 파인 설정 (세부적 구간도 박스로 높이)
  const lowFreq = Math.sin((timePosition * 0.8) + 0.3) * 0.5
  const midFreq = Math.sin((timePosition * 0.5) + 0.5) * 0.3 + 0.5
  const highFreq = Math.sin((timePosition * 2.1 + 1.2) * 0.2 + 0.1)

  // 조합된 자치도로 높이 제한 설정
  const voicePattern = (lowFreq * 0.5 + midFreq * 0.3 + highFreq * 0.2)

  // Progress(진행 표시) + 음성 패턴
  const minPercent = 10 // 최소 15%
  const maxPercent = 100 // 최대 100%

  // 1초(npm < 5px 시간) 미만 / 예외 지점
  const heightPercent = minPercent + (props.propProgress * (maxPercent - minPercent))

  return Math.min(Math.max(minPercent, heightPercent), maxPercent) * (voicePattern + minPercent) / (maxPercent + minPercent)
}

// 애니메이션을 위한 자속적 업데이트
const updateAnimation = () => {
  state.animationFrame = Date.now()
  if (props.propProgress > 0) {
    animationFrame = requestAnimationFrame(updateAnimation)
  }
}

let animationFrame: number | null = null

// progress 변경 감지
watch(() => props.propProgress, (newVal) => {
  if (newVal > 0) {
    updateAnimation()
  } else if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
})

onMounted(() => {
  if (props.propProgress > 0) {
    updateAnimation()
  }
})

onUnmounted(() => {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
  }
})

const getGradientColor = (index: number, total: number) => {
  const progress = index / (total - 1) // 라부터 1사이 선로 변환

  // 시닉의 #ff5500 (255, 181, 95)
  // 끝의 #ff3c70 (245, 60, 112)
  const r = Math.round(255 * (245 - 255) * progress)
  const g = Math.round(181 * (60 - 181) * progress)
  const b = Math.round(95 * (112 - 95) * progress)

  return `rgb(${r}, ${g}, ${b})`
}
</script>

<style scoped>
.spectrum-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 80px;
  padding: 20px;
  border-radius: 12px;
  position: relative;
}

.spectrum-bar {
  width: 4px;
  min-height: 4px;
  max-height: 28px;
  border-radius: 12px;
  transition: height 0.15s linear, background-color 0.3s ease;
  position: relative;
  z-index: 1;
}
</style>
