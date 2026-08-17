import { ref, watch, onUnmounted, type Ref } from 'vue'

/** 回傳一個延遲更新的 ref，來源 ref 變動後等待 delay 毫秒沒有再變動才同步 */
export function useDebouncedValue<T>(source: Ref<T>, delay = 300): Ref<T> {
  const debounced = ref(source.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | undefined

  watch(source, (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      debounced.value = value
    }, delay)
  })

  onUnmounted(() => clearTimeout(timer))

  return debounced
}
