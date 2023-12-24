const express = require('express');
const router = express.Router();
const UserEntity = require('../entity/users');


router.post('', async (req, res) => {
    await UserEntity.addUser(req, res)
})

router.get('', async (req, res) => {
    await UserEntity.allUser(req, res)
})

router.get('/:userId', UserEntity.validUUID, UserEntity.userExist, async (req, res) => {
    await UserEntity.getUserById(req, res)
})

router.put('/:userId', UserEntity.validUUID, UserEntity.userExist, async (req, res) => {
    await UserEntity.updateUser(req, res)
})

router.delete('/:userId', UserEntity.validUUID, UserEntity.userExist, async (req, res) => {
    await UserEntity.deleteUser(req, res)
})


module.exports = router;