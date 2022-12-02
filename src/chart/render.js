const d3 = require('d3')
const { wrapText, helpers, covertImageToBase64 } = require('../utils')
const renderLines = require('./renderLines')
const exportOrgChartImage = require('./exportOrgChartImage')
const exportOrgChartPdf = require('./exportOrgChartPdf')
const onClick = require('./onClick')
const iconLink = require('./components/iconLink')
const supervisorIcon = require('./components/supervisorIcon')

const CHART_NODE_CLASS = 'org-chart-node'
const PERSON_LINK_CLASS = 'org-chart-person-link'
const PERSON_NAME_CLASS = 'org-chart-person-name'
const PERSON_TITLE_CLASS = 'org-chart-person-title'
const PERSON_HIGHLIGHT = 'org-chart-person-highlight'
const PERSON_REPORTS_CLASS = 'org-chart-person-reports'

function render(config) {
  const {
    svgroot,
    svg,
    tree,
    animationDuration,
    nodeWidth,
    nodeHeight,
    nodePaddingX,
    nodePaddingY,
    nodeBorderRadius,
    backgroundColor,
    nameColor,
    titleColor,
    reportsColor,
    borderColor,
    avatarWidth,
    lineDepthY,
    treeData,
    sourceNode,
    onPersonLinkClick,
    loadImage,
    downloadImageId,
    downloadPdfId,
    elemWidth,
    margin,
    onConfigChange,
  } = config

  // Compute the new tree layout.
  const nodes = tree.nodes(treeData).reverse()
  const links = tree.links(nodes)

  config.links = links
  config.nodes = nodes

  // Normalize for fixed-depth.
  nodes.forEach(function(d) {
    d.y = d.depth * lineDepthY
  })

  // Update the nodes
  const node = svg.selectAll('g.' + CHART_NODE_CLASS).data(
    nodes.filter(d => d.id),
    d => d.id
  )

  const parentNode = sourceNode || treeData

  svg.selectAll('#supervisorIcon').remove()

  supervisorIcon({
    svg: svg,
    config,
    treeData,
    x: 70,
    y: -24,
  })

  // Enter any new nodes at the parent's previous position.
  const nodeEnter = node
    .enter()
    .insert('g')
    .attr('class', CHART_NODE_CLASS)
    .attr('transform', `translate(${parentNode.x0}, ${parentNode.y0})`)
    .on('click', onClick(config))

  // Person Card Container
  nodeEnter
    .append('rect')
    .attr('class', d => (d.isHighlight ? `${PERSON_HIGHLIGHT} box` : 'box'))
    .attr('width', nodeWidth)
    .attr('height', nodeHeight - 40)
    .attr('id', d => d.id)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)
    .style('cursor', helpers.getCursorForNode)

  nodeEnter
    .append('rect')
    .attr('width', nodeWidth + 12)
    .attr('height', nodeHeight - 40 + 12)
    .attr('x', -6)
    .attr('y', -6)
    .attr('fill', 'transparent')
    .attr('stroke', d => d.isCurrent ? '#50BD89': 'transparent')
    .attr('stroke-width', 4)
    .attr('rx', 24)
    .attr('ry', 24)
    .style('cursor', helpers.getCursorForNode)

  const namePos = {
    x: nodePaddingX,
    y: nodePaddingY * 1.8 + avatarWidth,
  }

  const avatarPos = {
    x: nodeWidth / 2,
    y: nodePaddingY,
  }

  // Person's Name
  nodeEnter
    .append('text')
    .attr('class', PERSON_NAME_CLASS + ' unedited')
    .attr('x', namePos.x)
    .attr('y', namePos.y)
    .style('cursor', 'pointer')
    .style('fill', nameColor)
    .style('font-size', 14)
    .text(helpers.getTitle)

  // Person's Title
  nodeEnter
    .append('svg')
    .attr('viewBox', '0 0 14 10')
    .attr('width', '15')
    .attr('height', '15')
    .attr('x', namePos.x)
    .attr('y', namePos.y + nodePaddingY - 12)
    .append('path')
    .attr('d', 'M7 2.3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm3-.6A1.7 1.7 0 1 0 10 5a1.7 1.7 0 0 0 0-3.3Zm-1.4 5a2 2 0 0 0-1.8-1H3.2a2 2 0 0 0-1.8 1l-1 2a.7.7 0 0 0 .6 1h8a.7.7 0 0 0 .6-1l-1-2Zm4.4.7.6 1.3a.7.7 0 0 1-.6 1h-2.1c.2-.5.1-1.1-.1-1.6l-.9-1.8h1.3A2 2 0 0 1 13 7.4Z')
    .attr('fill', "#3367CD")

  nodeEnter
    .append('text')
    .attr('class', PERSON_TITLE_CLASS + ' unedited')
    .attr('x', namePos.x + 20)
    .attr('y', namePos.y + nodePaddingY)
    .style('font-size', 12)
    .style('cursor', 'pointer')
    .style('fill', titleColor)
    .text(helpers.getTextForSponsors)

  // Person's Title
  nodeEnter
    .append('svg')
    .attr('viewBox', '0 0 12 14')
    .attr('width', '15')
    .attr('height', '15')
    .attr('x', namePos.x)
    .attr('y', namePos.y + nodePaddingY*2 - 12)
    .append('path')
    .attr('d', 'M2 .3h8c.7 0 1.3.6 1.3 1.4V9c0 .4-.1.7-.4 1l-3.2 3.2c-.2.2-.6.4-1 .4H2c-.7 0-1.3-.6-1.3-1.4V1.7C.7.9 1.3.3 2 .3ZM3 3c-.2 0-.3.1-.3.3V4c0 .2.1.3.3.3h6c.2 0 .3-.1.3-.3v-.7c0-.2-.1-.3-.3-.3H3Zm3.3 4H3a.3.3 0 0 1-.3-.3V6c0-.2.1-.3.3-.3h3.3c.2 0 .4.1.4.3v.7c0 .2-.2.3-.4.3Zm.4 2.7v2.8L10 9H7.3c-.3 0-.6.3-.6.7Z')
    .attr('fill', "#3367CD")

  // Person's Title
  nodeEnter
    .append('text')
    .attr('class', PERSON_TITLE_CLASS + ' unedited')
    .attr('x', namePos.x + 20 )
    .attr('y', namePos.y + nodePaddingY * 2)
    .style('font-size', 12)
    .style('cursor', 'pointer')
    .style('fill', titleColor)
    .text(helpers.getTextForContract)

  const heightForTitle = 60 // getHeightForText(d.title)

  // Person's circle
  nodeEnter
    .append('rect')
    .attr('width', 40)
    .attr('height', 40)
    .attr('rx', 16)
    .attr('ry', 16)
    .attr('x', (nodeWidth / 2) - 20)
    .attr('y', namePos.y + ( nodePaddingY * 2 )+ heightForTitle + 7 - 20 )
    .attr('fill', (d) => d.totalReports ? '#fff' : 'transparent')

  // Person's Reports
  nodeEnter
    .append('text')
    .attr('class', PERSON_REPORTS_CLASS)
    .attr('x', nodeWidth / 2)
    .attr('y', namePos.y + ( nodePaddingY * 2 )+ heightForTitle)
    .attr('dy', '.9em')
    .style('font-size', 14)
    .style('font-weight', 700)
    .style('cursor', 'pointer')
    .style('fill', reportsColor)
    .attr('text-anchor', 'middle')
    .text(helpers.getTextForTitle)

  // Person's membership background
  nodeEnter
    .append('rect')
    .attr('class', d => (d.isHighlight ? `${PERSON_HIGHLIGHT} box` : 'box'))
    .attr('width', 185)
    .attr('height', 26)
    .attr('fill', helpers.getBackgroundColorForMembership)
    .attr('rx', 13)
    .attr('ry', 13)
    .attr('x', nodeWidth / 2 - 185 / 2)
    .attr('y', avatarPos.y - 5 )
    .attr('dy', '.9em')


  // Person's membership
  nodeEnter
    .append('text')
    .attr('x', avatarPos.x)
    .attr('y', avatarPos.y)
    .attr('text-anchor', 'middle')
    .attr('dy', '.9em')
    .text(helpers.getTextForMembership)
    .attr('fill', helpers.getColorForMembership)


  // Ligne
  nodeEnter
    .append('line')
    .attr('x1', '0')
    .attr('y1', avatarPos.y + 32)
    .attr('x2', nodeWidth)
    .attr('y2', avatarPos.y + 32)
    .attr('stroke', '#EEEEEE')


  // Person's Link
  const nodeLink = nodeEnter
    .append('a')
    .attr('class', PERSON_LINK_CLASS)
    .attr('display', d => (d.link ? '' : 'none'))
    .attr('xlink:href', d => d.link)
    .on('click', datum => {
      d3.event.stopPropagation()
      // TODO: fire link click handler
      if (onPersonLinkClick) {
        onPersonLinkClick(datum, d3.event)
      }
    })

  iconLink({
    svg: nodeLink,
    x: nodeWidth - 20,
    y: 8,
  })

  // Transition nodes to their new position.
  const nodeUpdate = node
    .transition()
    .duration(animationDuration)
    .attr('transform', d => `translate(${d.x},${d.y})`)

  nodeUpdate
    .select('rect.box')
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)

  // Transition exiting nodes to the parent's new position.
  const nodeExit = node
    .exit()
    .transition()
    .duration(animationDuration)
    .attr('transform', d => `translate(${parentNode.x},${parentNode.y})`)
    .remove()

  // Update the links
  const link = svg.selectAll('path.link').data(links, d => d.target.id)


  // Render lines connecting nodes
  renderLines(config)

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x
    d.y0 = d.y
  })

  var nodeLeftX = -70
  var nodeRightX = 70
  var nodeY = 200
  nodes.map(d => {
    nodeLeftX = d.x < nodeLeftX ? d.x : nodeLeftX
    nodeRightX = d.x > nodeRightX ? d.x : nodeRightX
    nodeY = d.y > nodeY ? d.y : nodeY
  })

  config.nodeRightX = nodeRightX
  config.nodeY = nodeY
  config.nodeLeftX = nodeLeftX * -1

  d3.select(downloadImageId).on('click', function() {
    exportOrgChartImage(config)
  })

  d3.select(downloadPdfId).on('click', function() {
    exportOrgChartPdf(config)
  })
  onConfigChange(config)
}
module.exports = render
