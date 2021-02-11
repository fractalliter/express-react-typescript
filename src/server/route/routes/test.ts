import {userInfo} from 'os';
import router from '../router';
import Test from '../../models/test';
import {Request, Response} from "express";
import {ITest} from "../../domain/ITest";

router.route('/test')
    .get((req: Request, res: Response) => {
        res.json({username: userInfo().username});
    })
    .post(async (req: Request, res: Response) => {
        const {text}: { text: string } = req.body;
        const Text = new Test({text});
        try {
            const savedText: ITest = await Text.save();
            res.json(savedText);
        } catch (e) {
            console.error(e);
            res.status(500).json({message: "An error happened"});
        }
    })
    .put((req: Request, res: Response) => {
        const {id, text} = req.body;
        Test.updateOne({_id: id}, {text}, undefined, (err, test) => {
            if (err) res.status(500).json({message: "something bad happened"})
            else res.json({_id: id, text, ...test});
        })
    })
    .delete((req: Request, res: Response) => {
        const {id} = req.body;
        Test.deleteOne({_id: id}, undefined, (err) => {
            if (err) res.status(500).json({message: "something bad happened"})
            else res.json({_id: id, text: "deleted successfully"});
        })
    });

export default router;
