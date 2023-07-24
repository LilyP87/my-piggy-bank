import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TableProps } from "./interfaces/interfaces_App"
import './App.css';


const App = () => {
  const [linesTable, setLinesTable] = useState<TableProps[]>([
    { id: uuidv4(), name: 'Loto Ticket', description: '-', price: 20 },
    { id: uuidv4(), name: 'Beers', description: 'Party night', price: -15 },
    { id: uuidv4(), name: 'Phone Bill', description: 'January', price: -29.99 },
  ])

  //handleDelete : fonction utilisée pour supprimer une ligne du tableau 
  //(la ligne à supprimer est déterminée par son id)
  const handleDelete = (id: string) => {
    const updatedTable = linesTable.filter((item) => item.id !== id);
    setLinesTable(updatedTable)
  }

  //handleAdd : fonction qui permet d'ajouter une ligne de données au tableau. 
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object
    console.log(inputObject);
    const inputCopy = [...linesTable]
    inputCopy.push({
      id: uuidv4(),
      name: inputObject.name as string,
      description: inputObject.description as string,
      price: parseFloat(inputObject.price as string),
    });
    setLinesTable(inputCopy)
    e.currentTarget.reset()
  };

  //Somme des prices dans le tableau
  const sumTable = () => {
    const sum = linesTable.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price
    }, 0)
    console.log(sum)
    return (sum)
    // console.log(linesTable)
  }

  // sumTable()

  return (
    <>
      {/* Tableau My Piggy Bank */}
      <table>
        <thead>
          <tr id='table-title'>
            <th colSpan={4}>
              <h1>My Piggy Bank</h1>
            </th>
          </tr>
          <tr className='col-title'>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            linesTable.map((elem) => {
              return (
                <tr key={elem.id} className='col-table'>
                  <td id='col-name'>{elem.name}</td>
                  <td id='col-desc'>{elem.description}</td>
                  <td id='col-price'>{elem.price}</td>
                  <td className='btn-to-right'><button id='btn-delete' onClick={() => handleDelete(elem.id)}>X</button></td>
                </tr>
              )
            }
            )}
          <tr className='col-table total'>
            <td colSpan={2}>Total :</td>
            <td> {sumTable()}</td>
          </tr>

        </tbody>
      </table>
      <form onSubmit={(e) => handleAdd(e)}>
        <legend>Add New expense</legend>
        <div className="form-entries">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id='name' />
        </div>
        <div className="form-entries">
          <label htmlFor="name" >Description</label>
          <textarea name="description" cols={30} rows={5} id='description'></textarea>
        </div>
        <div className="form-entries">
          <label htmlFor="name">Price</label>
          <input type="text" name="price" id='price' />
        </div>

        <button id="btn-add">Add expense</button>
      </form>
    </>
  )
}

export default App;

