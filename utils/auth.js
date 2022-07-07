const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the signin route
    if (!req.session.user_id) {
      res.redirect('/signin');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  