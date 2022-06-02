import React, { useState, useRef, useEffect } from "react";

import { BASE_URL, SEARCH } from "../../utils/APIUrls.js";
import { axiosInstance } from "../../utils/AxiosInstance.js";
import Transition from "../../utils/Transition.js";
import ExpansionPanel from "../components/expansionPanel";
import { searchIcon } from "../icons/index.js";

function SearchModal() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState({
    saleLeads: [],
    resaleLeads: [],
    rentalLeads: [],
    plotLeads: [],
  });

  const trigger = useRef(null);
  const searchContent = useRef(null);
  const searchInput = useRef(null);

  const searchData = async e => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}${SEARCH}`, {
        searchStr: searchValue,
      });
      console.log(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !searchOpen ||
        searchContent.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSearchOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!searchOpen || keyCode !== 27) return;
      setSearchOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const ResultContainer = ({ data }) => (
    <ul className="text-sm border-b border-gray-200">
      {data.length > 0 ? (
        <li>
          <span className="border-b border-gray-300 flex items-center p-2 text-gray-800 rounded group flex justify-between">
            <strong className="w-32">Lead Name</strong>
            <strong className="w-32">Mobile</strong>
            <strong className="w-52">Location</strong>
            <strong className="w-28">Date</strong>
            <strong className="w-28">Status</strong>
          </span>
        </li>
      ) : (
        <li>No Results Found.</li>
      )}
      {data.length > 0 &&
        data.map(res => (
          <li key={res.mobile}>
            <span className="border-b border-gray-200 flex items-center p-2 text-gray-800 hover:text-white hover:bg-indigo-500 rounded group flex">
              <span className="w-32">{res.leadName}</span>
              <span className="w-32">{res.mobile}</span>
              <span className="w-52">{res.location || res.societyName}</span>
              <span className="w-28">{res.leadGenerationDate}</span>
              <span className="w-28">{res.leadStatus}</span>
            </span>
          </li>
        ))}
    </ul>
  );

  return (
    <div>
      {/* Button */}
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ml-3 ${
          searchOpen && "bg-gray-200"
        }`}
        onClick={() => {
          setSearchOpen(!searchOpen);
          setImmediate(() => searchInput.current.focus());
        }}
        aria-controls="search-modal"
      >
        <span className="sr-only">Search</span>
        <svg
          className="w-4 h-4"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-current text-gray-500"
            d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
          />
          <path
            className="fill-current text-gray-400"
            d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
          />
        </svg>
      </button>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
        show={searchOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id="search-modal"
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={searchOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
          ref={searchContent}
        >
          {/* Search form */}
          <div className="relative mt-2 mb-2">
            <label htmlFor="modal-search" className="sr-only">
              Search
            </label>
            <input
              id="modal-search"
              className="w-full border-0 focus:ring-transparent placeholder-gray-400 appearance-none py-3 pl-10 pr-4"
              type="search"
              placeholder="Search Leads by Name, Society, Status, Mobile and Date"
              ref={searchInput}
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              autoComplete="off"
            />
            <button
              className="absolute inset-0 left-auto group mr-20 btn bg-indigo-500 hover:bg-indigo-600 text-white"
              type="submit"
              aria-label="Search"
              onClick={e => searchData(e)}
            >
              Search
            </button>
          </div>
          <div className="py-4 px-2">
            {/* Recent searches */}
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-gray-400 uppercase px-2 mb-2">
                Search Results
              </div>
              <ExpansionPanel
                panelList={[
                  {
                    name: "Sale Leads",
                    component: (
                      <ResultContainer data={searchResults.saleLeads} />
                    ),
                    ...(searchResults.saleLeads.length > 0
                      ? { count: searchResults.saleLeads.length }
                      : {}),
                  },
                  {
                    name: "Resale Leads",
                    component: (
                      <ResultContainer data={searchResults.resaleLeads} />
                    ),
                    ...(searchResults.resaleLeads.length > 0
                      ? { count: searchResults.resaleLeads.length }
                      : {}),
                  },
                  {
                    name: "Rental Leads",
                    component: (
                      <ResultContainer data={searchResults.rentalLeads} />
                    ),
                    ...(searchResults.rentalLeads.length > 0
                      ? { count: searchResults.rentalLeads.length }
                      : {}),
                  },
                  {
                    name: "Plot Leads",
                    component: (
                      <ResultContainer data={searchResults.plotLeads} />
                    ),
                    ...(searchResults.plotLeads.length > 0
                      ? { count: searchResults.plotLeads.length }
                      : {}),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default SearchModal;
