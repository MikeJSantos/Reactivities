import { makeAutoObservable } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | null = null;
  editMode = false;
  loading = false;
  initialLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.initialLoading = true;
    try {
      const activities = await agent.Activities.list();
      activities.forEach((a) => {
        a.date = a.date.split("T")[0];
        this.activities.push(a);
      });
    } catch (error) {
      console.log(error);
    }
    this.initialLoading = false;
  };
}
