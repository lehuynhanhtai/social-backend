import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  body: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    if (request.url === '/api/v1') {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        // Thay đổi status code cho POST requests từ 201 sang 200
        // if (request.method === 'POST') {
        //   response.status(200);
        // }

        return {
          statusCode: response.statusCode,
          message: 'Succeed',
          body: data,
        };
      }),
    );
  }
}
