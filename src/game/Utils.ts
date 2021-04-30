
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
}
