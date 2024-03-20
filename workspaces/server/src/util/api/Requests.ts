import { PrimitiveRequestParameterTypes } from "@/types/api/ParameterTypes";

export function validatePrimitiveRequestParameter(value: unknown, type: PrimitiveRequestParameterTypes): boolean {
	return (value != undefined && typeof value === type);
}