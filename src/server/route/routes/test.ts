import {userInfo} from 'os';
import router from '../router';
import {Test} from '../../models';
import {Request, Response} from "express";
import {ITest} from "../../domain/ITest";

router.route('/test')
    .get((req: Request, res: Response) => {
        const {username}: {username: string} = userInfo();
        res.json({username});
    })
    .post(async (req: Request, res: Response) => {
        const {text}: { text: string } = req.body;
        const Text: ITest = new Test({text});
        try {
            const savedText: ITest = await Text.save();
            res.json(savedText);
        } catch (e) {
            console.error(e);
            res.status(500).json({message: "An error happened"});
        }
    })
    .put((req: Request, res: Response) => {
        const {id, text}: {id: string, text: string} = req.body;
        Test.updateOne({_id: id}, {text}, undefined, (err, test) => {
            if (err){
                console.error(err);
                res.status(500).json({message: "something bad happened"});
            }
            else res.json({_id: id, text, ...test});
        })
    })
    .delete((req: Request, res: Response) => {
        const {id}: {id: string} = req.body;
        Test.deleteOne({_id: id}, undefined, (err) => {
            if (err){
                console.error(err);
                res.status(500).json({message: "something bad happened"});
            }
            else res.json({_id: id, text: "deleted successfully"});
        })
    });

export default router;
