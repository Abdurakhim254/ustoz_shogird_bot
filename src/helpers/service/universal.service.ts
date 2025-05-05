import { Model, Document } from "mongoose";
import { IUser } from "../../utils";
import {v4} from "uuid"

export class UniversalService<T extends Document>  {
    private Repository: Model<T>;

    constructor(Repository: Model<T>) {
        this.Repository = Repository;
    }

    async getAll(){
        return await this.Repository.find({status:false}).sort({timestamp:-1})
    }
    async create(data: T) {
        return await this.Repository.create({id:v4(),...data});
    }

    async getByid(id:string): Promise<T | null> {
        return await this.Repository.findOne({ id: id });
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