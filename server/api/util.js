function requireLogin(req, res, next) {
  console.log('===what is req.user??==> ', req.user)
  req.user = { isAdmin: '' }
  if (req.user) {
    console.log('=====In requireLogin function??===')
    next()
  }
  res.sendStatus(401)
}

function requireAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    res.sendStatus(403)
  } else {
    next()
  }
}

module.exports = { requireLogin, requireAdmin }
