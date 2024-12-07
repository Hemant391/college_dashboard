import React, { useEffect, useState } from 'react';
import './index.css';
import { filterfunction, searchfunction } from './Filterfunctions';
import CollegeTable from './CollegeTable';

function App() {
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('Asc');

 
  async function fetchData(url) {
    try {
      const res = await fetch(url);
      const response = await res.json();
      setData(response);
      setTemp(response); 
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }

  useEffect(() => {
    const url = 'https://collegedunia-liart.vercel.app/data.json';
    // const url = 'http://localhost:3000/data.json';
    fetchData(url);
  }, []);


  useEffect(() => {
    if (search === '') {
      setTemp(data);
    } else {
      const updatedData = searchfunction([...data], search);
      setTemp(updatedData);
    }
  }, [search, data]);

  useEffect(() => {
    if (filter === '') {
      setTemp(data);
    } else {
      const updatedData = filterfunction([...temp], filter, order);
      setTemp(updatedData);
    }
  }, [filter, order, data]);

  return (
    <div className="App bg-gray-100 min-h-screen">
      <div>
        <div className="flex gap-4 items-center justify-evenly bg-white p-3 shadow-md">
          <div className="flex items-center gap-4">
            <label htmlFor="filter" className=" text-s text-gray-700">
              Filter By:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-1 text-gray-700 "
            >
              <option value="" disabled>
                Select Filter
              </option>
              <option value="rank">cd rating</option>
              <option value="fees">Fees</option>
              <option value="review">User Review Rating</option>
            </select>
            {filter.length > 0 && (
              <select
                id="order"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="border border-gray-300 rounded-lg p-1 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Asc">Asc</option>
                <option value="Desc">Desc</option>
              </select>
            )}

            <button
              onClick={() => setFilter('')}
              className={`p-2 rounded-lg text-white font-medium ${
                filter.length > 0 ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={filter.length === 0}
            >
              Clear Filter
            </button>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search college name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 border border-gray-600 rounded-lg p-2 text-gray-700"
            />
          </div>
        </div>
      </div>
              
      <CollegeTable tabledata={temp} />
    
    </div>
  );
}

export default App;
