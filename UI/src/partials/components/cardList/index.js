import React, { useEffect, useRef, useState } from "react";
import {
  BASE_URL,
  PLOT_ROUTE,
  RENTAL_ROUTE,
  RESALE_ROUTE,
  SALE_ROUTE,
} from "../../../utils/APIUrls";
import { axiosInstance } from "../../../utils/AxiosInstance";
import { formatDate } from "../../../utils/Utils";

import Datepicker from "../../actions/Datepicker";
import {
  closeBtn,
  doneBtn,
  groupBtn,
  messageIcon,
  messagesIcon,
  pencilIcon,
  phoneOutBtn,
  shareBtn,
  switchBtn,
} from "../../icons";
import ModalDialog from "../modalDialog";
import PopoverDialog from "../popoverDialog";
import styles from "./index.module.scss";

const EditBrokerageComponent = props => {
  const { data, callback, pageName } = props;
  const [brokerage, setBrokerage] = useState(data.brokerage || 0);

  const getUrl = () => {
    let returnUrl = "";
    switch (pageName) {
      case "saleLead":
        returnUrl = `${BASE_URL}${SALE_ROUTE.updateSaleBrokerage}`;
        break;
      case "resaleLead":
        returnUrl = `${BASE_URL}${RESALE_ROUTE.updateResaleBrokerage}`;
        break;
      case "rentalLead":
        returnUrl = `${BASE_URL}${RENTAL_ROUTE.updateRentalBrokerage}`;
        break;
      case "plotLead":
        returnUrl = `${BASE_URL}${PLOT_ROUTE.updatePlotBrokerage}`;
        break;
      default:
        break;
    }
    return returnUrl;
  };

  const submitBrokerage = async e => {
    try {
      await axiosInstance.post(getUrl(), {
        updateBy: "admin",
        brokerage,
        leadId: data.leadId,
      });
      callback(e, "brokerage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <span
      className="border-b"
      style={{
        width: "400px",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <span className="relative">
        <input
          className="w-half py-3"
          type="Brokerage"
          maxLength="8"
          placeholder="Set Brokerage"
          value={brokerage}
          onChange={e => setBrokerage(e.target.value)}
        />
      </span>
      <button
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
        style={{ height: "36px", margin: "5px 0 0 10px" }}
        onClick={e => submitBrokerage(e)}
      >
        <span className="hidden xs:block">Update</span>
      </button>
    </span>
  );
};

const ViewEditFeedbackComponent = props => {
  const { data, callback, pageName, modalStatus } = props;
  const [feedback, setFeedback] = useState("");
  const [feebackDate, setFeedbackDate] = useState(new Date());
  const [feedbackData, setFeedbackData] = useState([]);

  const feedbackInput = useRef(null);

  useEffect(() => modalStatus && fetchFeedbackData(), [modalStatus]);

  const getUrl = mode => {
    let returnUrl = "";
    switch (pageName) {
      case "saleLead":
        returnUrl =
          mode === "fetchFeedback"
            ? `${BASE_URL}${SALE_ROUTE.getSaleFeedback}`
            : `${BASE_URL}${SALE_ROUTE.createSaleFeedback}`;
        break;
      case "resaleLead":
        returnUrl =
          mode === "fetchFeedback"
            ? `${BASE_URL}${RESALE_ROUTE.getResaleFeedback}`
            : `${BASE_URL}${RESALE_ROUTE.createResaleFeedback}`;
        break;
      case "rentalLead":
        returnUrl =
          mode === "fetchFeedback"
            ? `${BASE_URL}${RENTAL_ROUTE.getRentalFeedback}`
            : `${BASE_URL}${RENTAL_ROUTE.createRentalfeedback}`;
        break;
      case "plotLead":
        returnUrl =
          mode === "fetchFeedback"
            ? `${BASE_URL}${PLOT_ROUTE.getPlotFeedback}`
            : `${BASE_URL}${PLOT_ROUTE.createPlotFeedback}`;
        break;
      default:
        break;
    }
    return returnUrl;
  };

  const submitFeedback = async e => {
    try {
      await axiosInstance.put(getUrl(), {
        description: feedback,
        createdBy: "admin",
        leadId: data.leadId,
        followUpDate: feebackDate,
      });
      setFeedback("");
      setFeedbackDate(new Date());
      fetchFeedbackData();
      callback(e, "feedback");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFeedbackData = async () => {
    try {
      const response = await axiosInstance.post(getUrl("fetchFeedback"), {
        leadId: data.leadId,
      });
      setFeedbackData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {/* Search form */}
      <div className="relative border-b border-gray-300 gap-7 mt-1 flex items-center">
        <label htmlFor="modal-search" className="sr-only">
          Feedback
        </label>
        <input
          id="modal-search"
          className="w-half border-0 focus:ring-transparent placeholder-gray-400 appearance-none py-3 pl-10 pr-4"
          type="search"
          placeholder="Add Feedback"
          maxLength="60"
          ref={feedbackInput}
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          autoComplete="off"
        />
        <Datepicker
          mode="single"
          defaultValue={feebackDate}
          callback={date => setFeedbackDate(formatDate(date))}
        />
        <button
          className="absolute inset-0 right-auto group"
          type="submit"
          aria-label="feedback"
        >
          {messagesIcon}
        </button>
        <button
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          style={{ height: "36px" }}
          disabled={feedback === ""}
          onClick={submitFeedback}
        >
          <span className="hidden xs:block">Submit</span>
        </button>
      </div>
      <div className="py-4 px-2">
        {/* Recent searches */}
        <div className="mb-3 last:mb-0">
          <div className="text-xs font-semibold text-gray-400 uppercase px-2 mb-2">
            Recent updates
          </div>
          <ul className="text-sm border-b border-gray-200">
            {feedbackData.length > 0 ? (
              <li>
                <span className="border-b border-gray-300 flex items-center p-2 text-gray-800 rounded group flex justify-between">
                  <strong
                    style={{
                      width: "23rem",
                    }}
                  >
                    Feedback
                  </strong>
                  <strong className="ml-7">FollowUp Date</strong>
                  <strong>Created Date</strong>
                </span>
              </li>
            ) : (
              <li>No Feedback Available</li>
            )}
            {feedbackData &&
              feedbackData.map(feed => (
                <li key={`${feed.description}-${feed.followUpDate}`}>
                  <span className="border-b border-gray-200 flex items-center p-2 text-gray-800 hover:text-white hover:bg-indigo-500 rounded group flex justify-between">
                    <span
                      style={{
                        width: "23.8rem",
                      }}
                    >
                      {feed.description}
                    </span>
                    <span>{feed.followUpDate}</span>
                    <span>{feed.createdDate}</span>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

const UpdateLeadStatusComponent = props => {
  const { data, callback, pageName } = props;

  const leadStatusBtns = [
    { name: "Contacted", icon: phoneOutBtn },
    { name: "Shared Details", icon: shareBtn },
    { name: "Follow Up", icon: switchBtn },
    { name: "Converted", icon: doneBtn },
  ];

  const getUrl = () => {
    let returnUrl = "";
    switch (pageName) {
      case "saleLead":
        returnUrl = `${BASE_URL}${SALE_ROUTE.updateSaleLeadStatus}`;
        break;
      case "resaleLead":
        returnUrl = `${BASE_URL}${RESALE_ROUTE.updateResaleLeadStatus}`;
        break;
      case "rentalLead":
        returnUrl = `${BASE_URL}${RENTAL_ROUTE.updateRentalLeadStatus}`;
        break;
      case "plotLead":
        returnUrl = `${BASE_URL}${PLOT_ROUTE.updatePlotLeadStatus}`;
        break;
      default:
        break;
    }
    return returnUrl;
  };

  const updateLeadStatus = async (e, leadStatus) => {
    try {
      await axiosInstance.post(getUrl(), {
        updateby: "admin",
        leadStatus,
        leadId: data.leadId,
      });
      callback(e, "leadStatus");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <span
      className="border-b"
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      {leadStatusBtns.map(btn => {
        const statusActive =
          (btn.name === data.leadStatus && "bg-green-500") || "";
        return (
          <button
            key={btn.name}
            className={statusActive}
            style={{
              height: "38px",
              padding: "8px",
              borderRadius: "5px",
              margin: "5px 0 0 10px",
              color: "white",
              backgroundColor:
                statusActive || "rgba(175, 174, 174, var(--tw-bg-opacity))",
            }}
            title={btn.name}
            onClick={e => updateLeadStatus(e, btn.name)}
          >
            {btn.icon}
          </button>
        );
      })}
    </span>
  );
};

const DeleteLeadComponent = props => {
  const { data, callback, pageName } = props;

  const getUrl = () => {
    let returnUrl = "";
    switch (pageName) {
      case "saleLead":
        returnUrl = `${BASE_URL}${SALE_ROUTE.deleteSaleLead}`;
        break;
      case "resaleLead":
        returnUrl = `${BASE_URL}${RESALE_ROUTE.deleteResaleLead}`;
        break;
      case "rentalLead":
        returnUrl = `${BASE_URL}${RENTAL_ROUTE.deleteRentalLead}`;
        break;
      case "plotLead":
        returnUrl = `${BASE_URL}${PLOT_ROUTE.deletePlotLead}`;
        break;
      default:
        break;
    }
    return returnUrl;
  };

  const discardLead = async e => {
    try {
      await axiosInstance.post(getUrl(), {
        leadId: data.leadId,
        deleteBy: "admin",
      });
      callback(e, "discardLead");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <span
      className="border-b"
      style={{
        width: "230px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <label>Discard this lead ?</label>
      <button
        className="btn bg-red-500 hover:bg-red-600 text-white"
        style={{ height: "36px", margin: "5px 0 0 10px" }}
        onClick={e => discardLead(e)}
      >
        <span className="hidden xs:block">Delete</span>
      </button>
    </span>
  );
};

const CardList = props => {
  const { titles, values, data, ...rest } = props;

  // const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <ul className={styles.cardList}>
        {values.map((value, index) => (
          <li className={styles.list} key={titles[index]}>
            <strong>{titles[index]}</strong>
            <span>
              <span>{data[value]}</span>
            </span>
          </li>
        ))}
      </ul>
      <span className={styles.ctaButtons}>
        {/* edit btn */}
        <PopoverDialog styles={styles.editBtn} icon={pencilIcon}>
          <EditBrokerageComponent data={data} {...rest} />
        </PopoverDialog>
        {/* message btn */}
        {/* <ModalDialog
          styles={styles.feedbackBtn}
          icon={messageIcon}
          modalCallback={(flag) => console.log(flag)}
          modalOpenState={modalOpen}
        >
          <ViewEditFeedbackComponent
            data={data}
            modalStatus={modalOpen}
            {...rest}
          />
        </ModalDialog> */}
        {/* done btn */}
        <PopoverDialog styles={styles.doneBtn} icon={groupBtn}>
          <UpdateLeadStatusComponent data={data} {...rest} />
        </PopoverDialog>
        {/* Closebtn */}
        <PopoverDialog styles={styles.closeBtn} icon={closeBtn}>
          <DeleteLeadComponent data={data} {...rest} />
        </PopoverDialog>
      </span>
    </div>
  );
};

export default React.memo(CardList);
