export function stringToRGB(str: string): string {
  // Helper function to convert a string to a hash
  function hashCode(s: string): number {
    let hash = 0
    for (let i = 0; i < s.length; i++) {
      hash = s.charCodeAt(i) + ((hash << 5) - hash)
      hash = hash & hash // Convert to 32bit integer
    }
    return hash
  }

  // Get the hash value of the string
  const hash = hashCode(str)

  // Generate RGB values from the hash
  const r = (hash & 0xff0000) >> 16
  const g = (hash & 0x00ff00) >> 8
  const b = hash & 0x0000ff

  return `rgb(${r}, ${g}, ${b})`
}
