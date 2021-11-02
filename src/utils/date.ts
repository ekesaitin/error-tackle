/**
 * 获取当前日期时间
 * @returns {string} YYYY-MM-DD hh:mm:ss 格式字符串
 */
export const getDateTime = () => {
  const d = new Date()
  const time = d.toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
  const day = d.toJSON().slice(0, 10)
  return `${day} ${time}`
}
