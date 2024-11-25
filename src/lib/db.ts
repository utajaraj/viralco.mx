import { use } from "typescript-mix"
import { Todo } from "./db/TodoTable"
import { Extender } from "./Extender"
interface DB extends Todo { }
class DB extends Extender([Todo]) {
    @use(Todo) this: any
    constructor() {
        super()
    }
}

const db = new DB()

export default db