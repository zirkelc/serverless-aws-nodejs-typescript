import { callback, context } from '@libs/test-utils';
import { main } from '../handler';

describe('hello', () => {
  it('should return 200', async () => {
    const event = {
      headers: {
        'Content-Type': 'application/json',
      },
      httpMethod: 'POST',
      path: 'hello',
      body: JSON.stringify({
        name: 'John',
      }),
    };

    const result = await main(event, context, callback);

    expect(result.statusCode).toEqual(200);
  });
});
