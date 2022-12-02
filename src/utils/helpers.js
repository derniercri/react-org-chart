module.exports = {
  getTextForTitle,
  getCursorForNode,
  getTextForMembership,
  getColorForMembership,
  getBackgroundColorForMembership,
  getTextForContract,
  getTextForSponsors,
}

function getTextForTitle(datum) {
  if (!datum.totalReports) {
    return null
  }

  const { totalReports } = datum

  return `+ ${totalReports}`
}

function getCursorForNode(datum) {
  return datum.children || datum._children || datum.hasChild
    ? 'pointer'
    : 'default'
}

function getTextForContract(datum) {
  return datum.nbContracts ? `${datum.nbContracts} contrat(s)` : 'Pas de contrat'
}

function getTextForSponsors(datum) {
  return datum.nbSponsors ? `${datum.nbSponsors} parrain(s)` : 'Pas de parrain'
}
function getTextForMembership(datum) {
  return datum.membership && datum.membership.label
}

const membershipColor = {
  'cold_lead' : { textColor: '#00C2FF', backgroundColor: 'rgba(0, 194, 255, 0.08)'},
  'hot_lead' : { textColor: '#F2C94C', backgroundColor: 'rgba(242, 201, 76, 0.08)'},
  'membership_in_progress' : { textColor: '#ED984F', backgroundColor: 'rgba(237, 152, 79, 0.08)'},
  'convention_in_progress' : { textColor: '#ED984F', backgroundColor: 'rgba(237, 152, 79, 0.08)'},
  'member' : { textColor: '#50BD89', backgroundColor: 'rgba(80, 189, 137, 0.1)'},
  'contracted' : { textColor: '#50BD89', backgroundColor: 'rgba(80, 189, 137, 0.1)'},
  'not_applicable' : { textColor: '#333333', backgroundColor: 'rgba(51, 51, 51, 0.08)'},
  'terminated' : { textColor: '#333333', backgroundColor: 'rgba(51, 51, 51, 0.08)'},
  'default' : { textColor: '#333333', backgroundColor: 'rgba(51, 51, 51, 0.08)'},
  'donor' : { textColor: '#28276D', backgroundColor: 'rgba(40, 39, 109, 0.08)'},
  'cessation_of_activity' : { textColor: '#DB394C', backgroundColor: 'rgba(219, 57, 76, 0.08)'},
}

function getColorForMembership(datum) {
  return datum.membership && datum.membership.type ? membershipColor[datum.membership.type].textColor : membershipColor['default'].textColor
}
function getBackgroundColorForMembership(datum) {
  return datum.membership && datum.membership.type ? membershipColor[datum.membership.type].backgroundColor : membershipColor['default'].backgroundColor
}


