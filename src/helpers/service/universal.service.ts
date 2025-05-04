import { Model, Document } from "mongoose";
import { IUser } from "../../utils";
import {v4} from "uuid"

export class UniversalService<T extends Document>  {
    private Repository: Model<T>;

    constructor(Repository: Model<T>) {
        this.Repository = Repository;
    }

    async create(data: T) {
        return await this.Repository.create({id:v4(),...data});
    }

    async delete(id: string) {
        return await this.Repository.deleteOne({ id: id });
    }

    async update(id: string) {
        return await this.Repository.updateOne({id: id },{$set:{status:true}});
    }

    async getUser(id: number): Promise<IUser | null> {
        return await this.Repository.findOne({ user_id: id });
    }
}