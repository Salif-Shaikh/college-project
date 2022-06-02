import React, { useState, useEffect } from "react";

import CardList from "../components/cardList";
import { BASE_URL, RENTAL_ROUTE } from "../../utils/APIUrls";
import { getLastDateOfMonth } from "../../utils/Utils";
import NoRecordsFound from "../components/noRecordsFound";
import { axiosInstance } from "../../utils/AxiosInstance";

const RentalLeadsContainer = props => {
  const { selectedLocation, selectedMonth, selectedYear } = props;
  // console.log(selectedLocation, selectedMonth, selectedYear);
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const startDate = `${selectedYear}-${selectedMonth}-01`;
  const endDate = `${selectedYear}-${selectedMonth}-${getLastDateOfMonth(
    startDate
  )}`;
  const [listData, setListData] = useState([]);
  const [showHideLoadMore, setShowHideLoadMore] = useState(true);

  const fetchData = async (data, recordLimit, recordOffset) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}${RENTAL_ROUTE.getRentalLeads}`,
        {
          limit: recordLimit,
          offset: recordOffset,
          startDate: startDate,
          endDate: endDate,
          location: selectedLocation,
        }
      );
      // console.log(response);
      if (response.data.length > 0) {
        setOffset(recordOffset);
        setListData([...data, ...response.data]);
      } else if (
        response.data.length === 0 ||
        recordOffset === 0 ||
        data.length !== 0
      ) {
        setListData([]);
      }
      if (response.data.length < 5) {
        setShowHideLoadMore(false);
      }
      // else if (response.data.length === 1) {
      //   setListData([...response.data]);
      // } else {
      //   setOffset(recordOffset);
      //   setShowHideLoadMore(false);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectedLocation && selectedYear && fetchData([], limit, offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation, selectedMonth, selectedYear]);

  const loadMore = () => {
    const updatedOffset = offset + 5;
    fetchData(listData, limit, updatedOffset);
  };

  const btnCallback = (e, type) => {
    switch (type) {
      case "brokerage":
      case "leadStatus":
      case "discardLead":
        fetchData([], limit, offset);
        break;
      default:
        break;
    }
  };

  const CardContainer = () => {
    return listData.length > 0 ? (
      <React.Fragment>
        {listData.map((cardData, index) => (
          <CardList
            key={`rentalCardList${index}`}
            titles={[
              "Location",
              "Society Name",
              "Lead Name",
              "Email",
              "Mobile",
              "Bhk",
              "Furnished Status",
              "Available For",
              "Rent",
              "Deposit",
              "Possession",
              "sqft",
              "Wing.no",
              "Flat.no",
              "Brokerage",
              "Created by",
              "Created Date",
              "Updated by",
              "Lead Id",
              "Lead Date",
              "Lead Status",
            ]}
            values={[
              "location",
              "societyName",
              "leadName",
              "emailId",
              "mobile",
              "bhk",
              "furnishedStatus",
              "availableFor",
              "rent",
              "deposit",
              "poss",
              "sqft",
              "wingNo",
              "flatNo",
              "brokerage",
              "createdBy",
              "createdDate",
              "updatedBy",
              "leadId",
              "leadGenerationDate",
              "leadStatus",
            ]}
            data={cardData}
            callback={btnCallback}
            pageName="rentalLead"
          />
        ))}
        {showHideLoadMore && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="sm:flex sm:justify-between btn bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={loadMore}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                />
              </svg>
              <span className="hidden xs:block ml-2">Load More</span>
            </button>
          </div>
        )}
      </React.Fragment>
    ) : (
      <NoRecordsFound />
    );
  };

  return <CardContainer />;
};

export default RentalLeadsContainer;
