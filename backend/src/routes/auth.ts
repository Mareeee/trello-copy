import { Router, Request, Response } from 'express';
const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (token) {

    } else {
        res.status(401).send("No token provided");
    }
})

export default router