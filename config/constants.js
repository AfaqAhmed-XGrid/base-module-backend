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
        failure: 'Error while finding the user if its already existed in db (github)',
        found: 'User is existed in db (github)',
      },
      savingNewUser: {
        failure: 'Error in saving user through (github strategy)',
        success: 'New user is saved in db through (github strategy)',
      },
    },
    googlePassportStrategy: {
      googleProfile: {
        failure: 'Google profile.id is not found!',
      },
      findingUser: {
        failure: 'Error while finding the user if its already existed in db (Google)',
        found: 'User is existed in db (Google)',
      },
      savingNewUser: {
        failure: 'Error in saving user through (Google strategy)',
        success: 'New user is saved in db through (Google strategy)',
      },
    },
    localPassportStrategy: {
      login: {
        findingUser: {
          failure: 'error while finding whether user is already existed (local-login)',
        },
      },
      signup: {
        findingUser: {
          failure: 'error while finding whether user is already existed (local-signup)',
        },
        savingNewUser: {
          failure: 'error while saving user in db (local-signup)',
          success: 'New user is saved in db through (local-signup)',
        },
      },
    },
  },
};
