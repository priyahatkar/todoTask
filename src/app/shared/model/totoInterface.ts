


export interface Itodo{
    id : string
    title : string;
    assignedDate : Date;
    dueDate : Date;
    status : Istatus;
    selectFile : string
}

export type Istatus = "Active" | "Close" | "Archive"