export default function setIntervalIntermediate(
  func: () => void,
  time: number,
) {
  func()
  return setInterval(() => {
    func()
  }, time)
}
