import { makeAutoObservable } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";

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

  selectActivity = (id: string) =>
    (this.selectedActivity = this.activities.find((a) => a.id === id));

  deselectActivity = () => (this.selectedActivity = undefined);

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.deselectActivity();
    this.editMode = true;
  };

  closeForm = () => (this.editMode = false);
}
