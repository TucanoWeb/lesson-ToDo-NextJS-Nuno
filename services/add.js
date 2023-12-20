import { todos } from "@/mock/fakeBackend"
import { v4 as uuidv4 } from 'uuid';

export const InsertTask = (task) => {

    todos.push({
        id: uuidv4(),
        name: task,
        completed: false
    })

}