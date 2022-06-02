import React, { useState, useEffect } from "react";

import CardList from "../components/cardList";
import { BASE_URL, SALE_ROUTE } from "../../utils/APIUrls";
import { getLastDateOfMonth } from "../../utils/Utils";
import { downArrows } from "../icons";
import NoRecordsFound from "../components/noRecordsFound";
import { axiosInstance } from "../../utils/AxiosInstance";

const SaleLeadsContainer = props => {
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
        `${BASE_URL}${SALE_ROUTE.getSaleLeads}`,
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
            key={`saleCardList${index}`}
            titles={[
              "Location",
              "Society Name",
              "Sq.Ft",
              "BHK",
              "Wing No.",
              "Flat No.",
              "Furnished",
              "Mobile",
              "Possession",
              "Price",
              "Lead Name",
              "Email",
              "Brokerage",
              "Created By",
              "Created Date",
              "Lead Date",
              "Lead Status",
            ]}
            values={[
              "location",
              "societyName",
              "sqft",
              "bhk",
              "wingNo",
              "flatNo",
              "furnishedStatus",
              "mobile",
              "poss",
              "price",
              "leadName",
              "emailId",
              "brokerage",
              "createdBy",
              "createdDate",
              "leadGenerationDate",
              "leadStatus",
            ]}
            data={cardData}
            callback={btnCallback}
            pageName="saleLead"
          />
        ))}
        {showHideLoadMore && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="sm:flex sm:justify-between btn bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={loadMore}
            >
              {downArrows}
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

export default SaleLeadsContainer;
