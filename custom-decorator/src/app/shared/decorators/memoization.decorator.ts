export function Memo<T>(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  let results: ArrayKeyMap<T> = new ArrayKeyMap<T>();
  let method = descriptor.value;


  descriptor.value = function (...args: any[]) {
    if (!results.has(args)) {
      results.set(args, method.call(this, ...args));
    }
    return results.get(args);
  }
}


class ArrayKeyMap<T> {
  private map = new Map<string, T>();

  private safeStringify(item: any, seen = new WeakSet()): string {
    if (item === null || typeof item !== 'object') {
      return JSON.stringify(item);
    }

    if (seen.has(item)) {
      return '[Circular]';
    }

    seen.add(item);
    const objString = Object.entries(item).map(([key, value]) => {
      return `${key}:${this.safeStringify(value, seen)}`;
    }).join(',');

    return `{${objString}}`;
  }

  private hash(array: any[]): string {
    // Convert each element to a string considering circular references
    return array.map(item => this.safeStringify(item)).join('|');
  }

  set(key: any[], value: T): void {
    const hashedKey = this.hash(key);
    this.map.set(hashedKey, value);
  }

  get(key: any[]): T | undefined {
    const hashedKey = this.hash(key);
    return this.map.get(hashedKey);
  }

  has(key: any[]): boolean {
    const hashedKey = this.hash(key);
    return this.map.has(hashedKey);
  }
}
