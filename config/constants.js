module.exports = {
  connectDB: {
    success: 'db is connected successfully',
    failure: 'db could not be connected',
  },
  labels: {
    githubPassportStrategy: {
      githubProfile: {
        failure: 'Github profile.id is not found!',
      },
      findingUser: {
        error: 'Error while finding the user if its already existed in db (github)',
        found: 'User is existed in db (github)',
      },
      savingNewUser: {
        error: 'Error in saving user through (github strategy)',
        success: 'New user is saved in db through (github strategy)',
        failure: 'New user could not be saved in db through (github strategy)',
      },
    },
    googlePassportStrategy: {
      googleProfile: {
        failure: 'Google profile.id is not found!',
      },
      findingUser: {
        error: 'Error while finding the user if its already existed in db (Google)',
        found: 'User is existed in db (Google)',
      },
      savingNewUser: {
        error: 'Error in saving user through (Google strategy)',
        success: 'New user is saved in db through (Google strategy)',
        failure: 'New user could not be saved in db through (Google strategy)',
      },
    },
    localPassportStrategy: {
      login: {
        findingUser: {
          error: 'error while finding whether user is already existed (local-login)',
        },
      },
      signup: {
        findingUser: {
          error: 'error while finding whether user is already existed (local-signup)',
        },
        savingNewUser: {
          error: 'error while saving user in db (local-signup)',
          success: 'New user is saved in db through (local-signup)',
          failure: 'New user could not be saved in db despite having no error (local-signup)',
        },
      },
    },
  },
};
