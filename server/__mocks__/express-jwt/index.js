const jwt = jest.fn().mockImplementation(options => (req, res, next) => {
    next()
  })
  
  module.exports = jwt
  