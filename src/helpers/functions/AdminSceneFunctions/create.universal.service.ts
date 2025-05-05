import { Document, Model } from "mongoose";
import { UniversalService } from "../../service";

export function createUniversalService<T extends Document>(model: Model<T>): UniversalService<T> {
    return new UniversalService(model);
  }
  