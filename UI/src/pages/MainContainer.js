import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { axiosInstance } from "../utils/AxiosInstance";

import Header from "../partials/Header";
// import WorkdayContainer from "../partials/dashboard/WorkdayContainer";
import SaleLeadsContainer from "../partials/dashboard/SaleLeadsContainer";
import ReSaleContainer from "../partials/dashboard/ReSaleContainer";
import RentalLeadsContainer from "../partials/dashboard/RentalLeadsContainer";
import PlotLeadsContainer from "../partials/dashboard/PlotLeadsContainer";
// import ReportContainer from "../partials/dashboard/ReportContainer";
// import PostedPropertiesContainer from "../partials/dashboard/PostedPropertiesContainer";
import {
  BASE_URL,
  PLOT_ROUTE,
  RENTAL_ROUTE,
  RESALE_ROUTE,
  SALE_ROUTE,
} from "../utils/APIUrls";
// import UploadsContainer from "../partials/dashboard/UploadsContainer";

const MainContainer = props => {
  // console.log(props.history.location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const months = [
    {
      value: "01",
      name: "January",
    },
    {
      value: "02",
      name: "February",
    },
    {
      value: "03",
      name: "March",
    },
    {
      value: "04",
      name: "April",
    },
    {
      value: "05",
      name: "May",
    },
    {
      value: "06",
      name: "June",
    },
    {
      value: "07",
      name: "July",
    },
    {
      value: "08",
      name: "August",
    },
    {
      value: "09",
      name: "September",
    },
    {
      value: "10",
      name: "October",
    },
    {
      value: "11",
      name: "November",
    },
    {
      value: "12",
      name: "December",
    },
  ];
  const currentMonth = months[new Date().getMonth()];

  const [loc, setLoc] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState(currentMonth.value);

  const [locationData, setLocationData] = useState([]);
  const [yearData, setYearData] = useState([]);

  const handleChange = (event, updateData) => updateData(event.target.value);

  //sale location api
  const fetchYear = async url => {
    try {
      const response = await axiosInstance.get(url);
      setYearData(response.data);
      if (response.data.length >= 1) {
        setYear(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //sale location api
  const fetchLocation = async (locationUrl, yearUrl) => {
    try {
      const response = await axiosInstance.get(locationUrl);
      setLocationData(response.data);
      if (response.data.length >= 1) {
        setLoc(response.data[0]);
      }
      fetchYear(yearUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    switch (props.history.location.pathname) {
      case "/main/saleLeads":
        fetchLocation(
          `${BASE_URL}${SALE_ROUTE.getLocationSale}`,
          `${BASE_URL}${SALE_ROUTE.getYearSale}`
        );
        break;
      case "/main/resaleLeads":
        fetchLocation(
          `${BASE_URL}${RESALE_ROUTE.getLocationResale}`,
          `${BASE_URL}${RESALE_ROUTE.getYearResale}`
        );
        break;
      case "/main/rentalLeads":
        fetchLocation(
          `${BASE_URL}${RENTAL_ROUTE.getLocationRental}`,
          `${BASE_URL}${RENTAL_ROUTE.getYearRental}`
        );
        break;
      case "/main/plotLeads":
        fetchLocation(
          `${BASE_URL}${PLOT_ROUTE.getLocationPlot}`,
          `${BASE_URL}${PLOT_ROUTE.getYearPlot}`
        );
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history.location.pathname]);

  return (
    <main style={{ width: "100vw" }}>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto"
        style={{
          overflowY: "auto",
          height: "91vh",
        }}
      >
        {!["/main/workday", "/main/reports", "/main/uploads"].includes(
          props.history.location.pathname
        ) && (
          <section className="flex flex-row items-center gap-3">
            <span className="flex flex-row items-center justify-between gap-3 h-24">
              {locationData.length > 0 && (
                <Select
                  value={loc}
                  onChange={e => handleChange(e, setLoc)}
                  style={{
                    backgroundColor: "#fff",
                  }}
                >
                  {locationData.map(data => (
                    <MenuItem key={data} value={data}>
                      {data}
                    </MenuItem>
                  ))}
                </Select>
              )}
              <Select
                value={month}
                onChange={e => handleChange(e, setMonth)}
                style={{
                  backgroundColor: "#fff",
                }}
              >
                {months.map(data => (
                  <MenuItem key={data.name} value={data.value}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
              {yearData.length > 0 && (
                <Select
                  value={year}
                  onChange={e => handleChange(e, setYear)}
                  style={{
                    backgroundColor: "#fff",
                  }}
                >
                  {yearData.map(data => (
                    <MenuItem key={data} value={data}>
                      {data}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </span>
          </section>
        )}
        {/* Cards */}
        <Switch>
          <Route exact path="/main" component={SaleLeadsContainer}>
            <Redirect to="/main/saleLeads" />
          </Route>
          {/* Route to workday container */}
          {/* <Route
            exact
            path="/main/workday"
            render={(props) => (
              <WorkdayContainer
                {...props}
                selectedLocation={loc}
                selectedMonth={month}
                selectedYear={year}
              />
            )}
          /> */}
          {/*Route to sale container  */}
          <Route
            exact
            path="/main/saleLeads"
            render={props => (
              <SaleLeadsContainer
                {...props}
                selectedLocation={loc}
                selectedMonth={month}
                selectedYear={year}
              />
            )}
          />
          {/* Route to resale container */}
          <Route
            exact
            path="/main/resaleLeads"
            render={props => (
              <ReSaleContainer
                {...props}
                selectedLocation={loc}
                selectedMonth={month}
                selectedYear={year}
              />
            )}
          />
          {/* Route to rental container */}
          <Route
            exact
            path="/main/rentalLeads"
            render={props => (
              <RentalLeadsContainer
                {...props}
                selectedLocation={loc}
                selectedMonth={month}
                selectedYear={year}
              />
            )}
          />
          {/* Route to plot container */}
          <Route
            exact
            path="/main/plotLeads"
            render={props => (
              <PlotLeadsContainer
                {...props}
                selectedLocation={loc}
                selectedMonth={month}
                selectedYear={year}
              />
            )}
          />
          {/* Route to report conatainer */}
          {/* <Route
            exact
            path="/main/reports"
            render={(props) => (
              <ReportContainer
                {...props}
                selectedLocation={loc}
                selectedMonth={month}
                selectedYear={year}
              />
            )}
          /> */}
          {/* route to uploads container */}
          {/*<Route exact path="/main/uploads" component={UploadsContainer} />*/}
          {/*Route to Posted properties container*/}
          {/* <Route
            path="/main/postedProp"
            component={PostedPropertiesContainer}
          /> */}
        </Switch>
      </div>
    </main>
  );
};

export default withRouter(MainContainer);
