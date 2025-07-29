import { ICategory } from "./icategory";
import { IReview } from "./ireview";

export interface Itechiciandetails {

    name: string;
    email:string;
    faceImageURL: string;
    startWorking: string;
    endWorking: string;
    description: string;
    category: string[];
    reviews: IReview;
    government:string;
    address:string;
    phoneNumber:string;

}
