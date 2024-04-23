import Vue from "vue";
import VueRouter from "vue-router";
import DashboardPages from "../views/pages/DashboardPages.vue";
import ATMDbaView from "../views/pages/ATMDbaView.vue";
import MobileDbaView from "../views/pages/MobileDbaView";
import ImportCard from "../views/pages/importCard";
import ViewTrustUserFinal from "../views/pages/ViewTrustUserFinal";
import DetailCard from "../views/pages/DetailCard";
import LimitCard from "../views/pages/LimitCard";
import RegisterUser from "../views/popuppages/RegisterUser";
import CHeckCard from "../views/popuppages/CHeckCard";
import ListVirtualCard from "../views/pages/ListVirtualCard";
import MainView from "../views/MainView";
import LoginPage from "../components/LoginPage";
import ListResgisterUser from "../views/pages/ListResgisterUser";
import CheckAccount from "../views/pages/CheckAccount";

import GetOtp from "../views/pages/GetOtp";
import MobileTxn from "../views/pages/MobileTxn";
import ATMDetail from "../views/pages/ATMDetail";
import ATM_TXN from "../views/pages/ATM_TXN";
import ChangeAccountName from "../views/pages/ChangeAccountName";
import ListDBA from "../views/pages/ListDBA";
import CardManager from "../views/pages/CardManager";
import AuthTxnUAT from "../views/pages/AuthTxnUAT";
import AuthTxnPROD from "../views/pages/AuthTxnPROD";
import AuthTxnATMChannelOfLDBPROD from "../views/pages/AuthTxnATMChannelOfLDBPROD";
import AuthTxnATMChannelOfLapsPROD from "../views/pages/AuthTxnATMChannelOfLapsPROD";
import AuthTxnATMChannelOfOverseaPROD from "../views/pages/AuthTxnATMChannelOfOverseaPROD";
import AuthTxnATMChannelOfEDCPROD from "../views/pages/AuthTxnATMChannelOfEDCPROD";
import AuthTxnChannelOfEDClapsPROD from "../views/pages/AuthTxnChannelOfEDClapsPROD";
import AuthTxnChannelOfEDOverseaPROD from "../views/pages/AuthTxnChannelOfEDOverseaPROD";
import ITDocs from "../views/pages/ITDocs";
import ITDocs_SWT from "../card/ITDocs_SWT";
import ChangeCurrencyID from "../card/ChangeCurrencyID";
import GetcreditSTM from "../bpc/GetcreditSTM";
import LimitAmount from "../views/pages/LimitAmount";
import RequestApprove from "../limit/RequestApprove";
import ListApproved from "../limit/ListApproved";
import CheckMerchantAccount from "../views/pages/CheckMerchantAccount";
import Bpc_cardInfo from "../views/pages/Bpc_cardInfo";
import Seven_Reports from "../seven_report/Seven_Reports";
import CheckTxn from "../seven_report/CheckTxn";
import BlockCZCard from "../../src/card/BlockCZCard";
import UploadblockldbCard from "../../src/card/UploadblockldbCard";
import ThreeRiamReports from "../seven_report/ThreeRiamReports";
import Request_branch from "../card/Request_branch";
import Slide_show from "../card/Slide_show";
import CheckCard from "../card/CheckCard";
import FromAcctToAcct from "../card/FromAcctToAcct";
import CheckServer from "../card/CheckServer";
import UploadAtmScreen from "../card/UploadAtmScreen";
import Visa_Credit from "../bpc/Visa_Credit";
import AddVISACard from "../bpc/AddVISACard";
import S3broSwer from "../bpc/S3broSwer";
import StopStartServerUAT from "../card/StopStartServerUAT";
import StopStartServerprod from "../card/StopStartServerprod";
import ServerCharts from "../card/ServerCharts";
import CheckVisaTransaction from "../card/CheckVisaTransaction";

Vue.use(VueRouter);

const routes = [
  {
    path: "/LoginPage",
    name: "LoginPage",
    component: LoginPage,
    meta: { quest: true },
  },
  {
    path: "/ITDocs_SWT",
    name: "ITDocs_SWT",
    component: ITDocs_SWT,
  
  },
  {
    path: "/CheckVisaTransaction",
    name: "CheckVisaTransaction",
    component: CheckVisaTransaction,
  
  },
  {
    path: "/S3broSwer",
    name: "S3broSwer",
    component: S3broSwer,
  
  },
  {
    path: "/ServerCharts",
    name: "ServerCharts",
    component: ServerCharts,
  
  },

  {
    path: "/CheckServer",
    name: "CheckServer",
    component: CheckServer,
  
  },
  {
    path: "/CheckCard",
    name: "CheckCard",
    component: CheckCard,
  
  },
  {
    path: "/Slide_show",
    name: "Slide_show",
    component: Slide_show,
  
  },
  {
    path: "/Request_branch",
    name: "Request_branch",
    component: Request_branch,
  
  },
  {
    path: "/Seven_Reports",
    name: "Seven_Reports",
    component: Seven_Reports,
  
  },
  {
    path: "/ThreeRiamReports",
    name: "ThreeRiamReports",
    component: ThreeRiamReports,
  
  },
 
  {
    path: "/CheckTransaction",
    name: "CheckTransaction",
    component: CheckTxn,
  
  },
 
  {
    path: "/MainView",
    name: "MainView",
    component: MainView,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/DashboardPages",
        name: "DashboardPages",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: DashboardPages,
        },
      },

      {
        path: "/ATMDbaView",
        name: "ATMDbaView",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: ATMDbaView,
        },
      },
      {
        path: "/MobileDbaView",
        name: "MobileDbaView",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: MobileDbaView,
        },
      },
      //
      {
        path: "/ImportCard",
        name: "ImportCard",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: ImportCard,
        },
      },
      //
      {
        path: "/DetailCard",
        name: "DetailCard",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: DetailCard,
        },
      },
      //
      {
        path: "/LimitCard",
        name: "LimitCard",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: LimitCard,
        },
      },

      {
        path: "/RegisterUser",
        name: "RegisterUser",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: RegisterUser,
        },
      },
      //
      {
        path: "/ListResgisterUser",
        name: "ListResgisterUser",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: ListResgisterUser,
        },
      },
      {
        path: "/CHeckCard",
        name: "CHeckCard",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: CHeckCard,
        },
      },

      {
        path: "/ListVirtualCard",
        name: "ListVirtualCard",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: ListVirtualCard,
        },
      },
      //
      {
        path: "/ViewTrustUserFinal",
        name: "ViewTrustUserFinal",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: ViewTrustUserFinal,
        },
      },
      {
        path: "/CheckAccount",
        name: "CheckAccount",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: CheckAccount,
        },
      },
      {
        path: "/GetOtp",
        name: "GetOtp",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: GetOtp,
        },
      },
      {
        path: "/ATMDetail",
        name: "ATMDetail",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: ATMDetail,
        },
      },
      {
        path: "/ATM_TXN",
        name: "ATM_TXN",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: ATM_TXN,
        },
      },
      {
        path: "/MobileTxn",
        name: "MobileTxn",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: MobileTxn,
        },
      },
      {
        path: "/ChangeAccountName",
        name: "ChangeAccountName",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: ChangeAccountName,
        },
      },
      {
        path: "/ListDBA",
        name: "ListDBA",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: ListDBA,
        },
      },
      {
        path: "/CardManager",
        name: "CardManager",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: CardManager,
        },
      },
      {
        path: "/AuthTxnUAT",
        name: "AuthTxnUAT",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: AuthTxnUAT,
        },
      },
      {
        path: "/AuthTxnPROD",
        name: "AuthTxnPROD",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: AuthTxnPROD,
        },
      },
      {
        path: "/AuthTxnATMChannelOfLDBPROD",
        name: "AuthTxnATMChannelOfLDBPROD",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: AuthTxnATMChannelOfLDBPROD,
        },
      },
      {
        path: "/AuthTxnATMChannelOfLapsPROD",
        name: "AuthTxnATMChannelOfLapsPROD",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: AuthTxnATMChannelOfLapsPROD,
        },
      },
      {
        path: "/AuthTxnATMChannelOfOverseaPROD",
        name: "AuthTxnATMChannelOfOverseaPROD",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: AuthTxnATMChannelOfOverseaPROD,
        },
      },
      {
        path: "/AuthTxnATMChannelOfEDCPROD",
        name: "AuthTxnATMChannelOfEDCPROD",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: AuthTxnATMChannelOfEDCPROD,
        },
      },
      {
        path: "/AuthTxnChannelOfEDClapsPROD",
        name: "AuthTxnChannelOfEDClapsPROD",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: AuthTxnChannelOfEDClapsPROD,
        },
      },
      {
        path: "/AuthTxnChannelOfEDOverseaPROD",
        name: "AuthTxnChannelOfEDOverseaPROD",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: AuthTxnChannelOfEDOverseaPROD,
        },
      },
      {
        path: "/ITDocs",
        name: "ITDocs",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: ITDocs,
        },
      },
      {
        path: "/ChangeCurrencyID",
        name: "ChangeCurrencyID",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: ChangeCurrencyID,
        },
      },
      {
        path: "/GetcreditSTM",
        name: "GetcreditSTM",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: GetcreditSTM,
        },
      },
      {
        path: "/LimitAmount",
        name: "LimitAmount",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: LimitAmount,
        },
      },
      {
        path: "/RequestApprove",
        name: "RequestApprove",
        meta: { requiresAuth: true },
        components: {
          default: MainView,
          MainView: RequestApprove,
        },
      },
      {
        path: "/ListApproved",
        name: "ListApproved",
        meta: { requiresAuth: true,
      
        
        },
        components: {
          default: MainView,
          MainView: ListApproved,
        },
        
      },
      {
        path: "/CheckMerchantAccount",
        name: "CheckMerchantAccount",
        meta: { requiresAuth: true,
      
        
        },
        components: {
          default: MainView,
          MainView: CheckMerchantAccount,
        },
        
      },
      {
        path: "/Bpc_cardInfo",
        name: "Bpc_cardInfo",
        meta: { requiresAuth: true,
      
        
        },
        components: {
          default: MainView,
          MainView: Bpc_cardInfo,
        },
        
      },
      {
        path: "/BlockLDBCard",
        name: "BlockLDBCard",
        meta: { requiresAuth: true,
      
        
        },
        components: {
          default: MainView,
          MainView: BlockCZCard,
        },
        
      },
      {
        path: "/UploadblockldbCard",
        name: "UploadblockldbCard",
        meta: { requiresAuth: true,
      
        
        },
        components: {
          default: MainView,
          MainView: UploadblockldbCard,
        },
        
      },
      {
        path: "/Visa_Credit",
        name: "Visa_Credit",
        meta: { requiresAuth: true,
      
        
        },
        components: {
          default: MainView,
          MainView: Visa_Credit,
        },
        
      },
      {
        path: "/AddVISACard",
        name: "AddVISACard",
        meta: { requiresAuth: true,
      
        
        },
        components: {
          default: MainView,
          MainView: AddVISACard,
        },
        
      },
      {
        path: "/FromAcctToAcct",
        name: "FromAcctToAcct",
        meta: { requiresAuth: true,
      
        
        },
        components: {
          default: MainView,
          MainView: FromAcctToAcct,
        },
        
      },
      {
        path: "/UploadAtmScreen",
        name: "UploadAtmScreen",
        meta: { requiresAuth: true,
      
        
        },
        components: {
          default: MainView,
          MainView: UploadAtmScreen,
        },
        
      },
      {
        path: "/StopStartServerUAT",
        name: "StopStartServerUAT",
        meta: { requiresAuth: true,
      
        
        },
        components: {
          default: MainView,
          MainView: StopStartServerUAT,
        },
        
      },
      {
        path: "/StopStartServerprod",
        name: "StopStartServerprod",
        meta: { requiresAuth: true,
      
        
        },
        components: {
          default: MainView,
          MainView: StopStartServerprod,
        },
        
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
function loggedIn() {
  // return false;
  return localStorage.getItem("token"); //if token true and false
}
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn()) {
      next({
        path: "/LoginPage",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (loggedIn()) {
      next({
        path: "/MainView",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  }
  else {
    next();
  } 
});

export default router;
