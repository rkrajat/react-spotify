type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type IAjaxPayload = {
  limit?: number;
  abortPrevious?: boolean;
  preventDuplicates?: boolean;
  method?: HTTPMethod;
  onAbort?: (resp: any) => void;
  data?: any;
  raw?: boolean;
  isMultiPart?: boolean;
};

export enum AppErrors {
  // Generic api error (500 etc)
  ApiError = "API-ERROR",
  // Auth error (401)
  AuthError = "AUTH-ERROR",
  // Not found (404)
  NotFound = "NOT-FOUND",
}
