export function Catch(swallow = false): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      try {
        const result = originalMethod.apply(this, args);

        // check if method is asynchronous
        if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
          return result.catch((theError: any) => {
            console.error(
              `A fault occured in ${propertyKey}: \n|${(originalMethod as any).toString().replace(/\n/g, '\n| ')}`,
              theError,
            );
            if (!swallow) {
              throw theError;
            }
          });
        }

        return result;
      } catch (theError) {
        if (!swallow) {
          throw theError;
        }
      }
    };

    return descriptor;
  };
}
