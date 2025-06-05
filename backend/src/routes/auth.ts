import { Router, Request, Response } from 'express';
const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    
    if (!token) { 
        res.status(401).send("No token provided");
        return;
    }
})

export default router