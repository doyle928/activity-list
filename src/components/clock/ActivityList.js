import React, { useState, useEffect, useContext } from "react";
import Moment from "react-moment";
import { AppContext } from "../App";
import Table from "react-bootstrap/Table";
import Button from "@material-ui/core/Button";

const ActivityList = () => {
  const { state, dispatch } = useContext(AppContext);

  const initialState = () => {
    let activityList = JSON.parse(localStorage.getItem("activity"));
    if (activityList === null) {
      dispatch({ type: "UPDATE_ACTIVITIES", data: activityList });
      return localStorage.setItem("activity", JSON.stringify([]));
    } else {
      dispatch({ type: "UPDATE_ACTIVITIES", data: activityList });
      return activityList;
    }
  };

  const [activities, setActivities] = useState(initialState);

  useEffect(() => {
    let activityList = JSON.parse(localStorage.getItem("activity"));
    if (activityList !== null) {
      setActivities(activityList);
    }
  }, [state]);

  const changeValue = id => {
    state.activities[id].end_time = new Date().toISOString();
    localStorage.setItem("activity", JSON.stringify(state.activities));
    dispatch({ type: "UPDATE_ACTIVITIES", data: state.activities });
  };

  const LiEl = ({ id, activity, description, start_time, end_time }) => (
    <tr>
      <td>{id}</td>
      <td>{activity}</td>
      <td>{description}</td>
      <td>
        <Moment date={start_time} format="HH:mm D MMM YYYY" />
      </td>
      <td>
        {end_time ? (
          <Moment date={end_time} format="HH:mm D MMM YYYY" />
        ) : (
          <span></span>
        )}
      </td>

      <td>
        {end_time ? (
          <Moment date={start_time} duration={end_time} />
        ) : (
          <Moment interval={1000} date={start_time} durationFromNow />
        )}
      </td>
      <td>
        {end_time === null ? (
          <Button
            onClick={() => changeValue(id)}
            size="large"
            color="secondary"
          >
            End Activity
          </Button>
        ) : (
          <p>Activity was ended</p>
        )}
      </td>
    </tr>
  );

  return (
    <div className="table-container">
      {activities && (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Activity</th>
              <th>Description</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
              <th>End Activity</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a, i) => (
              <LiEl {...a} key={i} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ActivityList;
