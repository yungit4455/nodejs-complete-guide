//----------------------------Mongoose를 이용한 REST API auth 컨트롤러--------------------------
const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
};


//----------------------------Mongoose를 이용한 auth 컨트롤러-----------------------------------
// const crypto = require('crypto');

// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
// const senderInfo = require('../config/sender-info.json');
// const { validationResult } = require('express-validator');

// const User = require('../models/user');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   prot: 587,
//   host: 'smtp.gmlail.com',
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: senderInfo.user,
//     pass: senderInfo.password
//   }
// });

// exports.getLogin = (req, res, next) => {
//   let message = req.flash('error');
//   if (message.length > 0) {
//     message = message[0];
//   } else {
//     message = null;
//   }
//   res.render('auth/login', {
//     path: '/login',
//     pageTitle: 'Login',
//     errorMessage: message,
//     oldInput: {
//       email: '',
//       password: ''
//     },
//     validationErrors: []
//   });
// };

// exports.getSignup = (req, res, next) => {
//   let message = req.flash('error');
//   if (message.length > 0) {
//     message = message[0];
//   } else {
//     message = null;
//   }
//   res.render('auth/signup', {
//     path: '/signup',
//     pageTitle: 'Signup',
//     errorMessage: message,
//     oldInput: {
//       email: '',
//       password: '',
//       confirmPassword: ''
//     },
//     validationErrors: []
//   });
// };

// exports.postLogin = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).render('auth/login', {
//       path: '/login',
//       pageTitle: 'Login',
//       errorMessage: errors.array()[0].msg,
//       oldInput: { 
//         email: email, 
//         password: password
//       },
//       validationErrors: errors.array()
//     });
//   }

//   User.findOne({ email: email })
//     .then(user => {
//       if (!user) {
//         return res.status(422).render('auth/login', {
//           path: '/login',
//           pageTitle: 'Login',
//           errorMessage: 'Invalid email or password.',
//           oldInput: { 
//             email: email, 
//             password: password
//           },
//           validationErrors: []
//         });
//       }
//       bcrypt
//         .compare(password, user.password)
//         .then(doMatch => {
//           if (doMatch) {
//             req.session.isLoggedIn = true;
//             req.session.user = user;
//             return req.session.save(err => {
//               console.log(err);
//               res.redirect('/');
//             });
//           }
//           return res.status(422).render('auth/login', {
//             path: '/login',
//             pageTitle: 'Login',
//             errorMessage: 'Invalid email or password.',
//             oldInput: { 
//               email: email, 
//               password: password
//             },
//             validationErrors: []
//           });
//         })
//         .catch(err => {
//           console.log(err);
//           res.redirect('/login');
//         });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.postSignup = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).render('auth/signup', {
//       path: '/signup',
//       pageTitle: 'Signup',
//       errorMessage: errors.array()[0].msg,
//       oldInput: { 
//         email: email, 
//         password: password, 
//         confirmPassword: req.body.confirmPassword 
//       },
//       validationErrors: errors.array()
//     });
//   }

//   bcrypt
//     .hash(password, 12)
//     .then(hashedPassword => {
//       const user = new User({
//         email: email,
//         password: hashedPassword,
//         cart: { items: [] }
//       });
//       return user.save();
//     })
//     .then(result => {
//       res.redirect('/login');
//       return transporter.sendMail({
//         to: email,
//         from: senderInfo.user,
//         subject: 'Signup succeeded!',
//         html: '<h1>You successfully signed up!</h1>'
//       });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.postLogout = (req, res, next) => {
//   req.session.destroy(err => {
//     console.log(err);
//     res.redirect('/');
//   });
// };

// exports.getReset = (req, res, next) => {
//   let message = req.flash('error');
//   if (message.length > 0) {
//     message = message[0];
//   } else {
//     message = null;
//   }
//   res.render('auth/reset', {
//     path: '/reset',
//     pageTitle: 'Reset Passowrd',
//     errorMessage: message
//   });
// };

// exports.postReset = (req, res, next) => {
//   crypto.randomBytes(32, (err, buffer) => {
//     if (err) {
//       console.log(err);
//       return res.redirect('/reset');
//     }
//     const token = buffer.toString('hex');
//     User.findOne({ email: req.body.email })
//     .then(user => {
//       if (!user) {
//         req.flash('error', 'No account with that email found.');
//         return res.redirect('/reset');
//       }
//       user.resetToken = token;
//       user.resetTokenExpriation = Date.now() + 3600000;
//       return user.save();
//     })
//     .then(result => {
//       res.redirect('/');
//       transporter.sendMail({
//         to: req.body.email,
//         from: senderInfo.user,
//         subject: 'Password reset',
//         html: `
//           <p>You requested a a password reset</p>
//           <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
//         `
//       });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
//   });
// };

// exports.getNewPassword = (req, res, next) => {
//   const token = req.params.token;
//   User
//   .findOne({ 
//     resetToken: token, 
//     resetTokenExpriation: {$gt: Date.now()} 
//   })
//   .then(user => {
//     let message = req.flash('error');
//     if (message.length > 0) {
//       message = message[0];
//     } else {
//       message = null;
//     }
//     res.render('auth/new-password', {
//       path: '/new-password',
//       pageTitle: 'New Password',
//       errorMessage: message,
//       userId: user._id.toString(),
//       passwordToken: token
//     });
//   })
//   .catch(err => {
//     const error = new Error(err);
//     error.httpStatusCode = 500;
//     return next(error);
//   });
// };

// exports.postNewPassword = (req, res, next) => {
//   const newPassword = req.body.password;
//   const userId = req.body.userId;
//   const passwordToken = req.body.passwordToken;
//   let resetUser;

//   User.findOne({ 
//     resetToken: passwordToken, 
//     resetTokenExpriation: {$gt: Date.now()}, 
//     _id: userId 
//   })
//   .then(user => {
//     resetUser = user;
//     return bcrypt.hash(newPassword, 12);
//   })
//   .then(hashedPassword => {
//     resetUser.password = hashedPassword;
//     resetUser.resetToken = undefined;
//     resetUser.resetTokenExpriation = undefined;
//     return resetUser.save();
//   })
//   .then(result => {
//     res.redirect('/login');
//   })
//   .catch(err => {
//     const error = new Error(err);
//     error.httpStatusCode = 500;
//     return next(error);
//   });
// };