//leave user logged in and return user not logged in

export const getSender = (logUser, users) => {
    return users[0]._id == logUser._id ? users[1].name : users[0].name;
}
