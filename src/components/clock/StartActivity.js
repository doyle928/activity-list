import React, { useContext } from "react";
import { AppContext } from "../App";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const StartActivity = () => {
  const { handleSubmit, register, reset } = useForm();
  const { dispatch } = useContext(AppContext);

  const changeValue = newActivity => {
    dispatch({ type: "NEW_ACTIVITIES", data: newActivity });
  };

  const onSubmit = (values, e) => {
    e.preventDefault();
    let activityList = JSON.parse(localStorage.getItem("activity"));
    let obj = {
      id: null,
      activity: values.activity,
      description: values.description,
      start_time: new Date().toISOString(),
      end_time: null
    };
    if (activityList.length === 0) {
      obj.id = 0;
    } else {
      obj.id = Number(activityList[activityList.length - 1].id) + 1;
    }
    activityList.push(obj);
    localStorage.setItem("activity", JSON.stringify(activityList));
    changeValue(activityList);

    reset({
      activity: "",
      description: ""
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Add an activity</h3>
        <TextField
          type="text"
          required
          label="Activity Name"
          name="activity"
          inputRef={register}
        />
        <TextField
          type="text"
          required
          label="Activity Description"
          name="description"
          inputRef={register}
        />
        <Button type="submit" size="large" variant="contained" color="primary">
          Add Activity
        </Button>
      </form>
    </div>
  );
};

export default StartActivity;
