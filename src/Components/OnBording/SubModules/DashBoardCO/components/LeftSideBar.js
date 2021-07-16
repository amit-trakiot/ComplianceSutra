import React, { useState } from "react";
import "./style.css";
// import SideBarBg from "../../../../assets/Images/Onboarding/side-bar-bg.png";
import dashBoardActiveIcon from "../../../../../assets/Icons/dashBoardActiveIcon.png";
import sideBarlogo from "../../../../../assets/Icons/sideBarlogo.png";
import circleClock from "../../../../../assets/Icons/circleClock.png";
import questionIcon from "../../../../../assets/Icons/questionIcon.png";
import listIcon from "../../../../../assets/Icons/listIcon.png";
import SideBaruser from "../../../../../assets/Icons/sideBaruser.png";

import sidebarActive from "../../../../../assets/Icons/sidebar-active.png";
import sidebarRightActive from "../../../../../assets/Icons/task_alt_black_24dp (1).png";
import sidebarBell from "../../../../../assets/Icons/sidebarBell.png";
import sidebarBellActive from "../../../../../assets/Icons/bellSelected.png";
import settingActive from "../../../../../assets/Icons/activeSetting.png";
import userActive from "../../../../../assets/Icons/dropdownUser.png";
import dashboardView from "../../../../../assets/Icons/dashboardFirstIcon.png";
import sidebarSettingIcon from "../../../../../assets/Icons/sidebarSettingIcon.png";

import editpen from "../../../../../assets/Icons/editpen.png";
import LogoutIcon from "../../../../../assets/Icons/LogoutIcon.png";

import { useOuterClick } from "../components/RightSideGrid/outerClick";
import { useSelector, useDispatch } from "react-redux";
import { actions as loginActions } from "../../../../Authectication/redux/actions";
import { withRouter } from "react-router-dom";
import { actions as adminMenuActions } from "../MenuRedux/actions";
import { actions as notficationActions } from "./notification/Redux/actions";

import historyListActive from "../../../../../assets/Icons/history_active.png";
import historyListInActive from "../../../../../assets/Icons/history_unactive.png";

import updateActive from "../../../../../assets/Icons/update_active.png";

function LeftSideBar({ history, isTaskListOpen, setIsTaskListOpen }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const userDetails = state && state.auth && state.auth.loginInfo;

  const [openProfile, setOpenProfile] = useState(false);
  const openProfileRef = useOuterClick((e) => {
    if (openProfile === true) {
      setOpenProfile(false);
    }
  });

  const onLogoutClick = () => {
    if (userDetails.UserType === 3) {
      dispatch(adminMenuActions.setCurrentMenu("dashboard"));
    } else {
      dispatch(adminMenuActions.setCurrentMenu("taskList"));
    }

    dispatch(loginActions.createLogoutAction());
    dispatch(adminMenuActions.setCurrentBoardViewTaskId(null));
    dispatch(adminMenuActions.setCurrentCalendarViewTaskId(null));
    dispatch(notficationActions.setTaskID(null));
    history.push("/login");
  };

  const onMenuClick = (currentActiveMenu) => {
    dispatch(adminMenuActions.setCurrentMenu(currentActiveMenu));
    if (currentActiveMenu === "taskList") {
      dispatch(notficationActions.setTaskID(null));
      localStorage.removeItem("expandedFlagss");
      localStorage.removeItem("allRowCount");
      history.push("/dashboard");
      if (isTaskListOpen) {
        setIsTaskListOpen(false);
      }
    } else if (currentActiveMenu === "notfications") {
      history.push("/notifications");
    } else if (currentActiveMenu === "settings") {
      history.push("/settings");
    } else if (currentActiveMenu === "dashboard") {
      history.push("/dashboard-view");
    } else if (currentActiveMenu === "complianceHistory") {
      history.push("/compliance-history");
    } else if (currentActiveMenu === "complianceHistoryList") {
      history.push("/compliance-history-list");
    } else if (currentActiveMenu === "newRegulations") {
      history.push("/new-regulations");
    } else if (currentActiveMenu === "help") {
      history.push("/help");
    }
  };

  const onEditProfileClick = () => {
    dispatch(adminMenuActions.setCurrentMenu("settings"));
    dispatch(adminMenuActions.setActiveTabInSetting("personal"));
    setOpenProfile(false);
    history.push("/settings");
  };

  return (
    <div className="side-bar">
      <div className="left-bar">
        <div className="logo">
          <img src={sideBarlogo} alt="sideBarlogo" />
        </div>
        <div className="first-icon-list">
          {userDetails.UserType === 3 && (
            <div
              className={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "dashboard"
                  ? "taskIcon-active"
                  : "taskIcon"
              }
            >
              <img
                style={{ cursor: "pointer", width: "18px" }}
                title="Tasks"
                onClick={() => onMenuClick("dashboard")}
                src={
                  !openProfile &&
                  state &&
                  state.adminMenu.currentMenu === "dashboard"
                    ? dashBoardActiveIcon
                    : dashboardView
                }
                alt="sidebar Active"
              />
            </div>
          )}

          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "taskList"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Tasks"
              onClick={() => onMenuClick("taskList")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "taskList"
                  ? sidebarActive
                  : sidebarRightActive
              }
              alt="sidebar Active"
            />
          </div>
          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "notfications"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Notfications"
              onClick={() => onMenuClick("notfications")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "notfications"
                  ? sidebarBellActive
                  : sidebarBell
              }
              alt="sidebar Bell"
            />
          </div>
          {/* <div className={!openProfile && state && state.adminMenu.currentMenu === "notfications" ? "taskIcon-active" : "taskIcon"}> */}

          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "complianceHistoryList"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Compliancehistorylist"
              onClick={() => onMenuClick("complianceHistoryList")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "complianceHistoryList"
                  ? historyListActive
                  : historyListInActive
              }
              alt="sidebar Bell"
            />
          </div>

          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "newRegulations"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="compliancehistorylist"
              onClick={() => onMenuClick("newRegulations")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "newRegulations"
                  ? updateActive
                  : updateActive
              }
              alt="sidebar Bell"
            />
          </div>
        </div>
        <div className="devider-line devider-line-set"></div>
        <div className="second-icon-list">
          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "settings"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Settings"
              onClick={() => onMenuClick("settings")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "settings"
                  ? settingActive
                  : sidebarSettingIcon
              }
              alt="sidebar Setting Icon"
            />
          </div>
          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "askQuestionHelp"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer", width: "18px" }}
              src={questionIcon}
              alt="taskIcon"
            />
          </div>

          <div
            className={
              openProfile
                ? "taskIcon-active mmm taskIcon mt-8"
                : "taskIcon mt-8"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Profile"
              onClick={() => setOpenProfile(true)}
              src={openProfile ? userActive : SideBaruser}
              alt="sidbar User"
            />
            {openProfile && (
              <div ref={openProfileRef} className="edit-link">
                <div className="edit-option-box">
                  <div
                    onClick={() => onEditProfileClick()}
                    style={{ cursor: "pointer" }}
                    className="edit-label-option"
                  >
                    <img src={editpen} alt="edit" /> Edit Profile
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => onLogoutClick()}
                    className="logout-label-option border-0"
                  >
                    <img src={LogoutIcon} alt="logout Icon" /> Logout
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div className="taskIcon">
            <img src={taskIcon} alt="taskIcon" />
          </div> */}
        </div>
        {/* <div className="user">
          <img src={SideBaruser} alt="SideBaruser" />
        </div> */}
      </div>
    </div>
  );
}

export default withRouter(LeftSideBar);
