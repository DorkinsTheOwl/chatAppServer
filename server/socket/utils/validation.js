const isNameTaken = (users, user) => {
    if (!users) {
        return false;
    }

    const userNameArray = users.map(user => user.name);

    return userNameArray.includes(user);
};

const isRealString = str => {
    return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {
    isRealString,
    isNameTaken
};