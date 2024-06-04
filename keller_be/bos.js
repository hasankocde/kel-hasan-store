validateToken(req, res, next) {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(' ') : null;

  if (tokenKey) {
      if (tokenKey[0] === 'Token') {
          const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId');
          if (tokenData) {
              req.user = tokenData.userId;
              return res.json({ isValid: true });
          }
      } else if (tokenKey[0] === 'Bearer') {
          jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (err, userData) => {
              if (!err) {
                  req.user = userData;
                  return res.json({ isValid: true });
              }
          });
      }
  }

  return res.json({ isValid: false });
},