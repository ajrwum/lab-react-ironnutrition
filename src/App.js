import React, { useState } from 'react';
import './App.css';
import 'bulma/css/bulma.css';

import foodsBase from './foods.json';

import FoodBox from './components/FoodBox';
import Search from './components/Search';

function App() {
  // create state for foods
  const [foods, setFoods] = useState(foodsBase);
  // create state for button add to allow display of the form only when asked for
  const [addBtnClicked, setAddBtnClicked] = useState(false);

  // create states for the form
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [calories, setCalories] = useState('');

  // create state for the search
  const [searchedString, setSearchedString] = useState('');

  // create state for today's foods
  const [todaysFoods, setTodaysFoods] = useState({selectedFoods: [], totalCal: 0});

  // handle click on add bvutton to display the form
  const handleClickOnAddBtn = () => {
    console.log('--- --- handleClickOnAddBtn');
    setAddBtnClicked(!addBtnClicked);
  };

  // handle submit on the form to add new food
  const handleSubmit = (e) => {
    console.log('--- --- handleSubmit');
    // prevent default behavior of the <button>
    e.preventDefault();
    // adding the new food
    if (name && calories && image) {
      // all values are available so add the new food
      const newFood = {name, calories, image, quantity: 0};
      setFoods([...foods, newFood]);
    }
    // else: abandon the submit since the new food is incomplete
    // revert the state of the add button to hide the form
    setAddBtnClicked(!addBtnClicked);
  };

  // handle the search
  let searchedFoods = null;
  if (searchedString !== '') {
    searchedFoods = foods.filter(food => food.name.toLowerCase().includes(searchedString.toLowerCase()));
  }
  else {
    searchedFoods = foods;
  }

  // add to today's foods
  const addToTodayFoods = food => {
    // console.log('--- --- addToTodayFoods - food :>> ', food);
    // update the array of today's foods
    const bufferArr = [...todaysFoods.selectedFoods];
    bufferArr.push(food);
    // update the total
    const todaysFoodsTotalCal = todaysFoods.totalCal + food.quantity * food.calories;
    // set the new object in state
    setTodaysFoods({selectedFoods: bufferArr, totalCal: todaysFoodsTotalCal});
  };

  return (
    <div className="App">
      <h1 className='title'>Iron Nutrition</h1>

      {!addBtnClicked
      ? (
        <button onClick={handleClickOnAddBtn} className='button is-primary'>Add Food</button>
      )
      : (
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name" className='label' >Name:</label>
            <input id="name" type="text" name='name' className='input'
                    value={name}
                    onChange={e => setName(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="calories" className='label' >Number of Calories:</label>
            <input id="calories" type="number" name='calories' className='input'
                    value={calories}
                    onChange={e => setCalories(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="image" className='label' >Image:</label>
            <input id="image" type="text" name='image' className='input'
                    value={image}
                    onChange={e => setImage(e.target.value)} />
          </div>

          <button className='button is-primary'>Submit</button>
        </form>
      )}
      <hr />

      <Search searchedString={searchedString} handleSearch={setSearchedString} />

      <div className="columns">
        <div className='food-list column'>
          {searchedFoods.map(food => {
              return <FoodBox key={food.name} food={food} addToTodayFoods={addToTodayFoods} />
          })}
        </div>
        <div className="todays-foods column">
          <h2 className='title'>Today's foods</h2>
          <ul>
            {todaysFoods.selectedFoods && todaysFoods.selectedFoods.map((food, idx) => {
              return <li key={idx} >{food.quantity} {food.name} = {food.quantity * food.calories} cal</li>
            })}
          </ul>
          <p>Total: {todaysFoods.totalCal} cal</p>
        </div>
      </div>
    </div>
  );
}

export default App;
