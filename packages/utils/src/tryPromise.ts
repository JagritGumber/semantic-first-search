type PromiseResult<T, E = Error> = [T, null] | [null, E];

export async function tryPromiseT<T>(
  promise: Promise<T>
): Promise<PromiseResult<T>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

// Type-safe version
export default async function tryPromise<T, E extends Error = Error>(
  promise: Promise<T>
): Promise<PromiseResult<T, E>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as E];
  }
}
