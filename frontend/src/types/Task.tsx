import { Priority } from "../enums/Pirority";
import { Status } from "../enums/Status";
import { Sprint } from "./Sprint";

export type Task = {
    id: number;
    sprint: Sprint;
    title: string;
    description: string;
    priority: Priority;
    date: Date;
    status: Status;
    author: string;
    deleted: boolean;
}