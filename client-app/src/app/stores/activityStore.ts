import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  map = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  initialLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.map.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  setSelectedActivity = (activity: Activity) =>
    (this.selectedActivity = activity);

  loadActivities = async () => {
    this.initialLoading = true;
    try {
      const activities = await agent.Activities.list();
      activities.forEach((a) => this.setActivity(a));
    } catch (error) {
      console.log(error);
    }
    runInAction(() => (this.initialLoading = false));
  };

  setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.map.set(activity.id, activity);
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.setSelectedActivity(activity);
      return activity;
    }

    this.initialLoading = true;
    try {
      activity = await agent.Activities.details(id);
      this.setActivity(activity);
      this.setSelectedActivity(activity);
      runInAction(() => (this.initialLoading = false));
      return activity;
    } catch (error) {
      console.log(error);
    }
  };

  private getActivity = (id: string) => this.map.get(id);

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.map.set(activity.id, activity);
        this.setSelectedActivity(activity);
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    }
    runInAction(() => (this.loading = false));
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.map.set(activity.id, activity);
        this.setSelectedActivity(activity);
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    }
    runInAction(() => (this.loading = false));
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => this.map.delete(id));
    } catch (error) {
      console.log(error);
    }
    runInAction(() => (this.loading = false));
  };
}
