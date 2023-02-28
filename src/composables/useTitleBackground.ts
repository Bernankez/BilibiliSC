export function useTitleBackground(level: string) {
  const levelNum = parseInt(level);
  if (levelNum > 36) {
    return ["#FF6913", "#FFAD5E"];
  } else if (levelNum > 32) {
    return ["#820D2E", "#C55C8A"];
  } else if (levelNum > 28) {
    return ["#351261", "#7A6DCA"];
  } else if (levelNum > 24) {
    return ["#07164D", "#6686EE"];
  } else if (levelNum > 20) {
    return ["#1B554C", "#509B01"];
  } else if (levelNum > 16) {
    return ["#C79D24", "#C79D24"];
  } else if (levelNum > 12) {
    return ["#BE6686", "#BE6686 "];
  } else if (levelNum > 8) {
    return ["#8D7CA6", "#8D7CA6"];
  } else if (levelNum > 4) {
    return ["#5D7B9E", "#5D7B9E"];
  } else {
    return ["#5C968E"];
  }
}
