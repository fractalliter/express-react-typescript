import {userInfo} from 'os';
import router from '../router';

router.route('/extra')
    .get((req, res) => {
        res.json({username: userInfo().username});
    })
    .post((req, res) => {
        res.json({text: `This is what you posted: ${req.body.text}`});
    })
    .put((req, res) => {
        res.json({text: `I put this somewhere: ${req.body.text}`});
    })
    .delete((req, res) => {
        res.json({text: `I deleted this one : ${req.body.text}`});
    });

export default router;