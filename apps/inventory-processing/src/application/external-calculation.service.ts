import { WebApi } from "libs/application/axios/WebApi";
import { Injectable } from "@nestjs/common";
import { HttpStatusCode } from "axios";

@Injectable()
export class ExternalCalculationService extends WebApi {
  public async getCalculations(): Promise<{ isSuccessful: boolean }> {
    //const response: AxiosResponse<{ isSuccessful: boolean }> = await this.buildJsonContentTypeRequest('/test')
    const response = { status: HttpStatusCode.Ok, data: { isSuccessful: true } };

    if(response.status === HttpStatusCode.Ok) {
      return response.data
    } else {
      throw new Error('Error fetching calculations')}
    }
}