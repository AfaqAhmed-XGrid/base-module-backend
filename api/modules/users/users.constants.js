module.exports = {
  responseMessages: {
    getAllUsers: {
      success: 'Found Users data successfully',
      failure: 'Could not get users data. Try Later!',
    },
    getSingleUser: {
      success: 'Found user data successfully',
      failure: 'Could not get user data. Try later',
      noId: 'No user id is provided',
    },
    deleteUser: {
      success: 'User is deleted successfully',
      failure: 'Could not delete user. Try later',
      noId: 'No user id is provided',
    },
    editUser: {
      success: 'User is edited successfully',
      failure: 'Could not edit user. Try later',
      noId: 'No user id is provided',
    },
  },
};
