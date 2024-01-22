import { Request, Response } from "express";
import catchErrors from "../utils/CatchErrors";


const calculate = catchErrors(async (req: Request, res: Response) => {
    const { num1, num2, op } = req.query

    const float1 = Number.parseFloat(num1 as string), float2 = Number.parseFloat(num2 as string)

    let result: number = float1

    switch (op as string) {
        case "add": {
            result += float2
            break;
        }
        case "sub": {
            result -= float2
            break;
        }
        case "mult": {
            result *= float2
            break;
        }
        default: {
            result /= float2
            break;
        }
    }

    return res.status(200).json({
        result
    })
})

const CalculationsController = {
    calculate
}

export default CalculationsController