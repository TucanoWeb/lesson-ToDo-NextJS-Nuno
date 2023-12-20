"use client"
import styles from './page.module.css'
import { useEffect, useState } from 'react';

// fakeData
import { todos } from '@/mock/fakeBackend';
import { editTask } from '@/services/edit';
import { deleteTask } from '@/services/delete';
import { InsertTask } from '@/services/add';
import { ButtonComp } from '@/components';


export default function Home() {
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(0)
  const [editName, setEditName] = useState("")
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(false)

  let id = ""


  const addTodo = () => {
    InsertTask(input)
    setInput("")
  }


  const handleEdit = async () => {
    const data = {
      id: editId,
      name: editName
    }

    editTask(data)
      .then(() => {
        setEditName("")
      })
  }


  const handleDelete = async (id) => {
    setLoading(true)

    deleteTask(id)
      .then(() => {
        setLoading(false)
      })

  }


  const handleCheckbox = (e) => {
    const text = document.getElementById(id)

    if (e.target.checked) {
      text.style.color = "grey"
      text.style.textDecoration = "line-through"
    } else {
      text.style.color = "black"
      text.style.textDecoration = "none"
    }
  }


  useEffect(() => {

  }, [editName])

  return (

    <main className={styles.container}>
      <div className={styles.todolist}>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)} />

          <ButtonComp
            onClick={addTodo}
            title={"Add"}
          />
        </div>

        <div className={styles.inputContainer} style={{ marginTop: "15px" }}>
          <input
            placeholder='Search'
            onChange={e => setFilter(e.target.value)}
          />
        </div>

        <div className={styles.todos}>
          {todos.filter(item => item.name.toLowerCase().includes(filter.toLowerCase())).map((todo, index) => (
            <div key={index} className={styles.todo}>
              <div
                id={todo.id}
                className={styles.task}>
                {todo.name}
              </div>

              {/* Edit Task --- START */}
              <div className={styles.btns}>

                <div className={styles.checkbox}>
                  <input
                    onChange={(e) => {
                      id = todo.id
                      handleCheckbox(e)
                    }
                    } type="checkbox" />
                </div>

                <button
                  className={styles.edit}
                  onClick={() => {
                    setEditName(todo.name)
                    setEditId(todo.id)
                  }
                  } >

                  <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                  {(editName !== "" && editId === todo.id) &&
                    <>
                      <input
                        type="text"
                        onChange={e => setEditName(e.target.value)}
                      />

                      <button
                        onClick={() => {
                          handleEdit()
                        }}
                      > Save </button>
                    </>

                  }

                </button>
                <button className={styles.delete} onClick={() => handleDelete(todo.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
