import { NextApiResponse } from "next";

export function errorOIDCResponse(
  res: NextApiResponse,
  statusCode: number,
  code: string,
  detail: string = "Something went wrong",
  attribute: string | null = null
): void {
  res.status(statusCode).json({
    code,
    detail,
    attribute,
    error: code, // OAuth 2.0 spec
    error_description: detail, // OAuth 2.0 spec
  });
}

export function errorNotAllowed(
  method: string = "",
  res: NextApiResponse
): void {
  return errorOIDCResponse(
    res,
    405,
    "method_not_allowed",
    `HTTP method '${method}' is not allowed for this endpoint.`
  );
}

export function errorRequiredAttribute(
  attribute: string,
  res: NextApiResponse
): void {
  return errorOIDCResponse(
    res,
    400,
    "required",
    `This attribute is required: ${attribute}.`,
    attribute
  );
}

export function errorValidation(
  code: string,
  detail: string = "This attribute is invalid.",
  attribute: string | null,
  res: NextApiResponse
): void {
  return errorOIDCResponse(res, 400, code, detail, attribute);
}
