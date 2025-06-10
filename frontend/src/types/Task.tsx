import { Priority } from "../enums/Pirority";
import { Status } from "../enums/Status";

export type Task = {
    id: number;
    sprintId: number;
    title: string;
    description: string;
    priority: Priority;
    date: Date;
    status: Status;
    author: string;
    deleted: boolean;
}