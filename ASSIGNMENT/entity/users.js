const { v4: uuidv4, validate } = require('uuid');

let usersData = [];

module.exports.addUser = async (req, res) => {
    try {
        const { username, age, hobbies } = req.body;

        if (!username || !age || !hobbies) {
            return res.status(400).json({ message: 'Please filled all required fields' });
        }

        let userDetails = {
            id: uuidv4(),
            username,
            age,
            hobbies
        };
        usersData.push(userDetails);
        return res.status(201).json(userDetails);
    } catch (err) {
        console.log("error", err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports.allUser = async (req, res) => {
    try {
        return res.status(200).json(usersData)
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal server error" })

    }
}

module.exports.getUserById = async (req, res) => {
    try {
        let userId = req.params.userId;
        const userExist = usersData.find((user) => user.id === userId);
        return res.status(200).json(userExist)
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username, age, hobbies } = req.body;

        const findUser = usersData.findIndex((user) => user.id === userId);

        usersData[findUser] = {
            id: userId,
            username,
            age,
            hobbies,
        };
        return res.status(200).json(usersData[findUser]);
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        let removeUser = usersData.findIndex(user => user.id === userId);
        usersData.splice(removeUser, 1);
        return res.status(204)
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports.validUUID = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        if (!validate(userId)) {
            return res.status(400).json({ message: 'Invalid userId ' });
        }
        next();
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports.userExist = async (req, res, next) => {
    const userId = req.params.userId;
    const user = usersData.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    next();
}