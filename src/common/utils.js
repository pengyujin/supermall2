export function debounce(func, delay) {
  let timer = null

  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
//防抖函数（需要防抖的函数，时间）
//如果直接执行，refresh函数会被执行30次
// 调用debounce产生一个新的函数
