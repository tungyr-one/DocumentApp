import { HttpParams } from "@angular/common/http";

export function getPaginationHeaders(pageNumber:number, pageSize:number)
{
  let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

  return params;
}
