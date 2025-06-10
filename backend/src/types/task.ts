import { Status } from "../enums/status.js";
import { Priority } from "../enums/priority.js";

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