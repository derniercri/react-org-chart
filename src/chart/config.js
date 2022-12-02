const animationDuration = 350
const shouldResize = true

// Nodes
const nodeWidth = 235
const nodeHeight = 187
const nodeSpacing = 12
const nodePaddingX = 16
const nodePaddingY = 16
const avatarWidth = 48
const nodeBorderRadius = 4
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
}

// Lines
const lineType = 'angle'
const lineDepthY = 120 /* Height of the line for child nodes */

// Colors
const backgroundColor = '#fff'
const borderColor = '#c9c9c9'
const nameColor = '#3367CD'
const titleColor = '#8D8D8D'
const reportsColor = nameColor

const config = {
  margin,
  animationDuration,
  nodeWidth,
  nodeHeight,
  nodeSpacing,
  nodePaddingX,
  nodePaddingY,
  nodeBorderRadius,
  avatarWidth,
  lineType,
  lineDepthY,
  backgroundColor,
  borderColor,
  nameColor,
  titleColor,
  reportsColor,
  shouldResize,
}

module.exports = config
