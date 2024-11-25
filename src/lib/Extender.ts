 
    export function Extender(bases:any) {
        class Classes {
          constructor() {
            bases.forEach((base:any) => Object.assign(this, new base()));
          }
        }
        const classes:any = Classes
        bases.forEach((base:any) => {
          Object.getOwnPropertyNames(base.prototype)
          .filter(prop => prop != 'constructor')
          .forEach(prop => classes.prototype[prop] = base.prototype[prop])
        })
        return classes;
      }