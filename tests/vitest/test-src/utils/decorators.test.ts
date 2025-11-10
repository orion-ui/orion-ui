
import { describe, it, expect } from 'vitest';
import { isReactive } from 'vue';
import { Reactive } from '../../../../utils/decorators';

describe('Reactive Decorator', () => {
  it('should return an initializer that makes a plain object reactive when used on a class field', () => {
    const mockContext: ClassFieldDecoratorContext = {
      kind: 'field',
      name: 'testField',
      access: {
        get: (obj) => obj.testField,
        set: (obj, value) => {
          obj.testField = value;
        },
      },
      static: false,
      private: false,
    };
    const initialValue = { foo: 'bar', count: 0 };

    const initializer = Reactive(undefined, mockContext);
    
    expect(initializer).toBeInstanceOf(Function);

    const reactiveValue = initializer(initialValue);
    
    expect(isReactive(reactiveValue)).toBe(true);
    expect(reactiveValue).toEqual(initialValue);
    expect(reactiveValue).not.toBe(initialValue);
  });

  it('should return undefined if the context kind is not "field"', () => {
    const mockContext: ClassDecoratorContext = {
      kind: 'class',
      name: 'TestClass',
      addInitializer: () => {},
    };

    const result = Reactive(undefined, mockContext as any);

    expect(result).toBeUndefined();
  });
});
