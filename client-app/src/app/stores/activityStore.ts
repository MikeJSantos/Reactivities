import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  initialLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setInitialLoading = (state: boolean) => (this.initialLoading = state);

  setActivities = (activities: Activity[]) => (this.activities = activities);

  loadActivities = async () => {
    if (this.initialLoading) return;
    this.setInitialLoading(true);

    try {
      const activities = await agent.Activities.list();
      activities.forEach((a) => {
        a.date = a.date.split("T")[0];
        this.setActivities([...this.activities, a]);
      });
    } catch (error) {
      console.log(error);
    }

    this.setInitialLoading(false);
  };

  selectActivity = (id: string) =>
    (this.selectedActivity = this.activities.find((a) => a.id === id));

  deselectActivity = () => (this.selectedActivity = undefined);

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.deselectActivity();
    this.editMode = true;
  };

  closeForm = () => (this.editMode = false);

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activities.push(activity);
        this.selectedActivity = activity;
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
        this.setActivities([
          ...this.activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        this.selectedActivity = activity;
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
      runInAction(() => {
        this.setActivities([...this.activities.filter((a) => a.id !== id)]);
        
      });
    } catch (error) {
      console.log(error);
    }
    runInAction(() => (this.loading = false));
  };
}
