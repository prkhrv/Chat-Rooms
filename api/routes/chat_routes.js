const express = require('express');
const router = express.Router();

const roomList = require('../controllers/chat_controller');



// Routes
router.get('/chat',roomList.list_all_rooms)
router.post('/chat',roomList.create_a_room);



router.get('/chat/:roomId',roomList.read_a_room)
router.put('/chat/:roomId',roomList.update_a_room)
router.delete('/chat/:roomId',roomList.delete_a_room);



// Chat Users routes

router.get('/chatuser',roomList.list_all_users)
router.post('/chatuser',roomList.create_a_user);



router.get('/chatuser/:userId',roomList.read_a_user)
router.put('/chatuser/:userId',roomList.update_a_user)
router.delete('/chatuser/:userId',roomList.delete_a_user);

// router.get('/:roomId',roomList.check_a_room)
module.exports = router;
