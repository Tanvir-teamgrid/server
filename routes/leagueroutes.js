const express=require('express');
 const  {addleague, viewall, searchleague, leaguedelete,updateLeague} = require('../controllers/LeagueController');


const router = express.Router();
router.post('/create',addleague);
router.get('/show',viewall);
router.get('/search/:id',searchleague);
router.delete('/delete/:id',leaguedelete);
router.put('/update/:id',updateLeague);


module.exports=router;