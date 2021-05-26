export abstract class Utils {
  static assignWithModel(target: {}, source: {}): void {
    for (let key in target) {
      if (source[key] !== undefined) {
        if (target[key] instanceof Object) {
          this.assignWithModel(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
  }

  static mergeWithoutDuplications(first: any[], second: any[]): any[] {
    return this.removeDuplications(first.concat(second));
  }

  static removeDuplications(array: any[]): any[] {
    return Array.from(new Set(array));
  }

  static generateId(): string {
    return Math.floor(Math.random() * 10000000).toString();
  }

  static getObjectSize(object: {}): number {
    let size = 0;

    for (let key in object) {
      if (object.hasOwnProperty(key)) size++;
    }

    return size;
  }

  static getFirstFromObject(object: {}): any {
    return object[Object.keys(object)[0]];
  }

  static getRandom(min: number, max: number ): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
