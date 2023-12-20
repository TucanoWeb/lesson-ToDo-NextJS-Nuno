import { todos } from "@/mock/fakeBackend"

export const deleteTask = async (id) => {
    todos.forEach((element, key) => {
        if (element.id === id) todos.splice(key, 1)
    })
}