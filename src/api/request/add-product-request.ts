import { BaseRequest } from "./base-request";
import { IsDefined, IsNotEmpty, Validate } from "class-validator";
import { IsNotBlank } from "../../utils";

export class AddProductRequest extends BaseRequest {

    @IsDefined()
    @IsNotEmpty()
    @Validate(IsNotBlank)
    public code: string;
}