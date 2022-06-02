// CONSTANTS FOR API URLS

export const VERSION = "/v1";

export const BASE_URL = `http://${window.location.hostname}:4004/api${VERSION}`;

// const WORK = "/workday";
// export const WORK_ROUTE = { getWorkdayLeads: `${WORK}/getWorkdayLeads` };

export const SEARCH = `/searchLeads`;

const SALE = "/sale";
export const SALE_ROUTE = {
  getSaleLeads: `${SALE}/getSaleLeads`,
  createSaleFeedback: `${SALE}/createSaleFeedback`,
  updateSaleBrokerage: `${SALE}/updateSaleBrokerage`,
  getSaleFeedback: `${SALE}/getSaleFeedback`,
  getLocationSale: `${SALE}/getLocationSale`,
  getYearSale: `${SALE}/getYearSale`,
  deleteSaleLead: `${SALE}/deleteSaleLead`,
  updateSaleLeadStatus: `${SALE}/updateSaleLeadStatus`,
};

const RESALE = "/resale";
export const RESALE_ROUTE = {
  getResaleLeads: `${RESALE}/getResaleLeads`,
  createResaleFeedback: `${RESALE}/createResaleFeedback`,
  updateResaleBrokerage: `${RESALE}/updateResaleBrokerage`,
  getResaleFeedback: `${RESALE}/getResaleFeedback`,
  getLocationResale: `${RESALE}/getLocationResale`,
  getYearResale: `${RESALE}/getYearResale`,
  updateResaleLeadStatus: `${RESALE}/updateResaleLeadStatus`,
  deleteResaleLead: `${RESALE}/deleteResaleLead`,
};

const RENTAL = "/rental";
export const RENTAL_ROUTE = {
  getRentalLeads: `${RENTAL}/getRentalLeads`,
  createRentalfeedback: `${RENTAL}/createRentalfeedback`,
  updateRentalBrokerage: `${RENTAL}/updateRentalBrokerage`,
  getRentalFeedback: `${RENTAL}/getRentalFeedback`,
  getLocationRental: `${RENTAL}/getLocationRental`,
  getYearRental: `${RENTAL}/getYearRental`,
  updateRentalLeadStatus: `${RENTAL}/updateRentalLeadStatus`,
  deleteRentalLead: `${RENTAL}/deleteRentalLead`,
};

const PLOT = "/plot";
export const PLOT_ROUTE = {
  getPlotLeads: `${PLOT}/getPlotLeads`,
  createPlotFeedback: `${PLOT}/createPlotFeedback`,
  updatePlotBrokerage: `${PLOT}/updatePlotBrokerage`,
  getPlotFeedback: `${PLOT}/getPlotFeedback`,
  getLocationPlot: `${PLOT}/getLocationPlot`,
  getYearPlot: `${PLOT}/getYearPlot`,
  updatePlotLeadStatus: `${PLOT}/updatePlotLeadStatus`,
  deletePlotLead: `${PLOT}/deletePlotLead`,
};

// const UPLOAD = "/upload";
// export const UPLOAD_ROUTE = {
//   saleCsvUpload: `${UPLOAD}/saleCsvUpload`,
//   resaleCsvUpload: `${UPLOAD}/resaleCsvUpload`,
//   rentalCsvUpload: `${UPLOAD}/rentalCsvUpload`,
//   plotCsvUpload: `${UPLOAD}/plotCsvUpload`,
// };

export const REPORT = "/report";

export const LOGIN = "/login";
