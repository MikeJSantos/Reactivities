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

  setInitialLoading = (state: boolean) => (this.initialLoading = state);

  loadActivities = async () => {
    this.setInitialLoading(true);

    try {
      const activities = await agent.Activities.list();
      activities.forEach((a) => {
        a.date = a.date.split("T")[0];
        this.activities.push(a);
      });
    } catch (error) {
      console.log(error);
    }

    this.setInitialLoading(false);
  };
}
