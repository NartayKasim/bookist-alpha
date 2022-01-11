const bcrypt = require("bcryptjs");

module.exports = {
   getSession: async (req, res) => {
      res.status(200).send(req.session);
   },

   register: async (req, res) => {
      let { user } = req.body;
      const db = req.app.get("db");

      const emailValidation = async (email) => {
         const parseEmail = email.split("");
         const hasAtSymbol = parseEmail.includes("@");
         const hasDotSymbol = parseEmail.includes(".");
         const isMinLength = parseEmail.length >= 6;
         const isAlreadyRegistered = await db.user.retrieve.by_email([email]);

         if (!hasAtSymbol || !hasDotSymbol || !isMinLength) {
            return "Please enter a valid email address.";
         } else if (isAlreadyRegistered[0]) {
            return "An account with that email already exists";
         }
         return "";
      };

      const passwordValidation = (password) => {
         if (password.length < 5) {
            return "Please enter a password which is at least 5 characters long.";
         }
         return "";
      };

      const displayNameValidation = async (displayName) => {
         const displayNameTaken = await db.user.retrieve.by_display_name([
            displayName,
         ]);
         if (displayNameTaken.length > 0) {
            return "An account with that display name already exists.";
         }
         return "";
      };

      const checkEmail = await emailValidation(user.email);
      const checkPassword = await passwordValidation(user.password);
      const checkDisplayName = await displayNameValidation(user.displayName);

      if (checkEmail.length !== 0) {
         return res.status(501).send(checkEmail);
      }

      if (checkPassword.length !== 0) {
         return res.status(501).send(checkPassword);
      }

      if (checkDisplayName.length !== 0) {
         return res.status(501).send(checkDisplayName);
      }

      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);

      const createUser = await db.user.register.create_user([
         user.displayName,
         user.email,
         user.password,
      ]);

      if (!createUser[0]) {
         return res.status(501).send("Unable to register user.");
      }
      user = createUser[0];
      req.session.user = user;
      res.status(200).send(user);
   },

   login: async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
         return res
            .status(401)
            .send("Please enter a valid email and password.");
      }
      const db = req.app.get("db");
      const retrieveUser = await db.user.retrieve.by_email([email]);
      let user = retrieveUser[0];

      if (!user) {
         return res
            .status(401)
            .send("Entered email or password did not match our records.");
      }
      const isAuthenticated = bcrypt.compareSync(password, user.password);
      if (!isAuthenticated) {
         return res
            .status(401)
            .send("Entered email or password did not match our records.");
      }
      delete user.password;

      req.session.user = user;
      res.status(200).send(req.session.user);
   },

   logout: (req, res) => {
      req.session = null;
      res.sendStatus(200);
   },

   // updateDisplayName: async (req, res) => {
   //    const { displayName } = req.body;
   //    const db = req.app.get("db");
   //    const header = req.headers["authorization"];
   //    const users_id = getUser(header).id;
   //    try {
   //       const response = await db.user.update.display_name([
   //          users_id,
   //          displayName,
   //       ]);
   //       res.status(200).send(response[0]);
   //    } catch (e) {
   //       () =>
   //          res
   //             .status(500)
   //             .send(
   //                "There was an error while trying to process your request."
   //             );
   //    }
   // },

   // updateEmail: async (req, res) => {
   //    const { email } = req.body;
   //    const db = req.app.get("db");
   //    const header = req.headers["authorization"];
   //    const users_id = getUser(header).id;
   //    try {
   //       const response = await db.user.update.email([users_id, email]);

   //       res.status(200).send(response[0]);
   //    } catch (e) {
   //       () =>
   //          res
   //             .status(500)
   //             .send(
   //                "There was an error while trying to process your request."
   //             );
   //    }
   // },

   // updatePassword: async (req, res) => {
   //    const { password } = req.body;
   //    const db = req.app.get("db");
   //    const header = req.headers["authorization"];
   //    const users_id = getUser(header).id;
   //    const salt = bcrypt.genSaltSync(10);
   //    const encryptedPassword = bcrypt.hashSync(password, salt);
   //    try {
   //       await db.user.update.password([users_id, encryptedPassword]);
   //       res.sendStatus(200);
   //    } catch (e) {
   //       () =>
   //          res
   //             .status(500)
   //             .send(
   //                "There was an error while trying to process your request."
   //             );
   //    }
   // },

   // updateProfilePicture: async (req, res) => {
   //    const { profile_picture } = req.body;
   //    const db = req.app.get("db");
   //    const header = req.headers["authorization"];
   //    const users_id = getUser(header).id;
   //    try {
   //       const response = await db.user.update.profile_picture([
   //          users_id,
   //          profile_picture,
   //       ]);
   //       res.status(200).send(response[0]);
   //    } catch (e) {
   //       () =>
   //          res
   //             .status(500)
   //             .send(
   //                "There was an error while trying to process your request."
   //             );
   //    }
   // },
};
