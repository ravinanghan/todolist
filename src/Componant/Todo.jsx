import React, { useState, useEffect } from 'react'
import todoimg from '../img/todo.png'

const getLocalItemes = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItemes())
  const [toggleBtn, setToggleBtn] = useState(true)
  const [isEditItem, setIsEditItem] = useState(null)


  const addItem = () => {
    if (!inputData) {
      alert('Plz fill the Data')
    } else if (inputData && !toggleBtn) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData }
          }
          return elem;
        })
      )
      setToggleBtn(true)
      setInputData("")
      setIsEditItem(null)

    } else {
      const allInputData = { id: new Date().getTime().toString(), name: inputData }
      setItems([...items, allInputData])
      setInputData('')
    }
  }
  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id
    })
    setItems(updateditems)
  }
  const removeAll = () => {
    setItems([])
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(items))
  }, [items]);

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id
    })
    setToggleBtn(false)
    setInputData(newEditItem.name)
    setIsEditItem(id)
  }

  return (
    <div className='main_div'>
      <div className="child_div">
        <figure>
          <img src={todoimg} alt="todo logo" />
          <figcaption>Add your List Here 👍</figcaption>
          <div className="addItems">
            <input
              type="text"
              placeholder='Add Items ...'
              value={inputData}
              onChange={(event) => {
                setInputData(event.target.value);
              }}
            />
            {
              toggleBtn ? (<i className="fa fa-plus add_btn"
                title='Add item'
                onClick={addItem}
              ></i>) : (<i className="fa-solid fa-pen-to-square edit"
                title='update item'
                onClick={addItem}
              ></i>)
            }

          </div>
          <div className="showItem">
            {
              items.map((elem) => {
                return (
                  <>
                    <div className="eachItem" key={elem.id}>
                      <h3>{elem.name}</h3>
                      <i className="fa-solid fa-pen-to-square edit"
                        onClick={() => { editItem(elem.id) }}
                      ></i>
                      <i className="far fa-trash-alt add_btn delete"
                        title='Delete item'
                        onClick={() => { deleteItem(elem.id) }}
                      ></i>
                    </div>
                  </>
                )
              })
            }
          </div>
          <button className='btn'
            data-sm-link-text='Remove All'
            onClick={removeAll}
          >Check List</button>
        </figure>
      </div>
    </div>
  )
}

export default Todo