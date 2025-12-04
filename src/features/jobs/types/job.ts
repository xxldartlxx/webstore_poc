export type JobBudgetType = 'fixed' | 'hourly';

export type JobLocationType = 'remote' | 'onsite' | 'hybrid';

export interface Job {
    id?: string;
    title: string;
    category: string;
    shortDescription: string;
    description: string;
    budgetType: JobBudgetType;
    budget: string;
    locationType: JobLocationType;
    location: string;
    createdAt?: string;
}
