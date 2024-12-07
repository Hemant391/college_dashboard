import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import InfiniteScroll from "react-infinite-scroll-component";

const CollegeTable = ({ tabledata }) => {
  const [items, setItems] = useState(tabledata.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (tabledata.length > 0) {
      setItems(tabledata.slice(0, 10)); // Load the initial 10 items
    }
  }, [tabledata]);


  const fetchMoreData = () => {
    if (items.length >= tabledata.length) {
      setHasMore(false); 
      return;
    }
    setTimeout(() => {
      setItems((prevItems) =>
        prevItems.concat(tabledata.slice(prevItems.length, prevItems.length + 10))
      );
    }, 1000);
  };


  return (
   

    <div className=" mx-auto py-1 px-14">
       <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="text-center my-4">Loading...</h4>}
        endMessage={
          <p className="text-center my-4">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
      <table className="min-w-full border border-gray-300">
        <thead className="bg-cyan-500">
          <tr className="text-left">
            <th className="border border-gray-300 px-4 py-2">CD Rank</th>
            <th className="border border-gray-300 px-4 py-2">Data</th>
            <th className="border border-gray-300 px-4 py-2">Course Fees</th>
            <th className="border border-gray-300 px-4 py-2">Placement</th>
            <th className="border border-gray-300 px-4 py-2">User Reviews</th>
            <th className="border border-gray-300 px-4 py-2">Ranking</th>
          </tr>
        </thead>
        <tbody>

          {items.map((college, index) => (
            <tr key={index} className="hover:bg-gray-200">
              <td className="border border-gray-300 px-4 py-2">
                #{college.rank}
              </td>
              <td className=" flex flex-col border border-gray-300 px-4 py-2">
                <div className="flex gap-3   ">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src="./defaultimage.jpg"
                      alt="Pic"
                      className="w-full h-full object-cover"
                      />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-500">
                      {college.name}{" "}
                      {college.featured && (
                        <span className="bg-red-600 text-white text-sm p-2 rounded-full">
                          Featured
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{college.address}</p>
                    <div className="text-sm bg-orange-100 w-fit border-l-4 border-l-orange-600 pr-1 ">
                      <p className="text-orange-600 ml-3">{college.course} </p>
                      <p className="text-sm ml-3">{college.cutoff}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-8">
                  <p className="flex items-center text-orange-500 text-sm font-semibold cursor-pointer">
                    <FaArrowRightLong />{" "} Apply Now
                  </p>
                  <p className="flex items-center text-green-400 text-sm font-semibold cursor-pointer">
                    <FaDownload /> {" "}Download
                  </p>
                  <p className="flex items-center gap-2">
                    {" "}
                    <input type="checkbox" placeholder="Checked" />
                    Add to compare
                  </p>
                </div>
              </td>
              <td className="border border-gray-300  pl-2 ">
                <p className="font-extrabold text-xl  text-green-600">
                  {" "}
                  ₹{college.fees}
                </p>
                <p className="text-black font-thin text-sm">B.E/B.Tech</p>
                <p className="text-black font-thin text-sm "> -1st Year fees</p>
                <p className="text-orange-500 cursor-pointer text-sm font-bold flex gap-1 items-center">
                  {" "}
                  <FaExchangeAlt /> Compare Fees
                </p>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <p className="font-extrabold text-green-600">
                  {" "}
                  ₹{college.placement.average}
                </p>
                <p className="font-thin text-sm">Average Package</p>
                <p className="font-extrabold text-green-600">
                  ₹{college.placement.highest}
                </p>
                <p className="font-thin text-sm">Highest Package</p>
                <p className="text-orange-500 cursor-pointer text-sm font-bold flex text-center gap-1 items-center">
                  {" "}
                  <FaExchangeAlt />
                  Compare placement
                </p>
              </td>
              <td className="border border-gray-300 px-4">
                <p className="text-xl font-semibold">{college.review} / 10</p>
                <div style={{ lineHeight: "15px", fontSize: "13px" }}>
                  <p>Based on {college.number_user}</p>
                  <p>Reviews</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm italic text-orange-600  ">
                      <span className=" bg-orange-100 rounded px-2 flex items-center w-fit px-4 rounded-xl">
                  <TiTick /> {college.best}
                      </span>
                  </p>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                #{college.ranking}
              </td>
            </tr>
          ))}
        
        </tbody>
      </table>
      </InfiniteScroll>
    </div>
  );
};

         
export default CollegeTable;
