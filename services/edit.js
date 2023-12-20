import { todos } from "@/mock/fakeBackend"

export const editTask = async (data) => {
    todos.forEach((element, key) => {
        if (element.id === data.id) todos[key]["name"] = data.name
    })
}