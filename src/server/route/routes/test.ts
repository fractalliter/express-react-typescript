import {userInfo} from 'os';
import router from '../router';
import {Test} from '../../models';
import {Request, Response} from "express";
import {ITest} from "../../domain/ITest";
import {IError} from '../../domain/IError';

router.route('/test')
    .get((req: Request, res: Response) => {
        const {username}: {username: string} = userInfo();
        if (!username) {
            const error : IError = {
                status: 500,
                message: "Something bad happend!"
            }
            res.status(error.status).json(error);
        }
        res.json({username});
    })
    .post(async (req: Request, res: Response) => {
        const {text}: { text: string } = req.body;
        const Text: ITest = new Test({text});
        try {
            const savedText: ITest = await Text.save();
            res.status(201).json(savedText);
        } catch (e) {
            const error: IError = {
                status: 500,
                message: "An error happened!"
            }
            console.error(e);
            res.status(error.status).json({message: "An error happened"});
        }
    })
    .put((req: Request, res: Response) => {
        const {id, text}: {id: string, text: string} = req.body;
        Test.updateOne({_id: id}, {text}, {}, (err, test) => {
            if (err){
                const error: IError ={
                    status: 500,
                    message: "It can't be updated at this moment!"
                }
                console.error(err);
                res.status(error.status).json(error);
            }
            else res.status(200).json({_id: id, text, ...test});
        })
    })
    .delete((req: Request, res: Response) => {
        const {id}: {id: string} = req.body;
        Test.deleteOne({_id: id}, {}, (err) => {
            if (err){
                const error: IError = {
                    status: 500,
                    message: "Resource can't be deleted!"
                }
                console.error(err);
                res.status(error.status).json(error);
            }
            else res.status(200).json({_id: id, text: "deleted successfully"});
        })
    });

export default router;
