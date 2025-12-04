import { useCallback, useMemo, useState } from 'react';
import type { Job } from '../types/job';

export type JobOnboardingStep = 0 | 1 | 2;

export type JobFormData = Omit<Job, 'id' | 'createdAt'>;

const DEFAULT_JOB: JobFormData = {
    title: '',
    category: '',
    shortDescription: '',
    description: '',
    budgetType: 'fixed',
    budget: '',
    locationType: 'remote',
    location: '',
};

interface UseJobOnboardingResult {
    step: JobOnboardingStep;
    job: JobFormData;
    setField: <K extends keyof JobFormData>(key: K, value: JobFormData[K]) => void;
    nextStep: () => void;
    prevStep: () => void;
    canGoNext: boolean;
    isLastStep: boolean;
    reset: () => void;
}

function validateStep(step: JobOnboardingStep, job: JobFormData): boolean {
    if (step === 0) {
        return Boolean(job.title && job.category && job.shortDescription);
    }

    if (step === 1) {
        return job.description.trim().length >= 30;
    }

    if (step === 2) {
        const hasBudget = Boolean(job.budget);
        const hasLocation = job.locationType === 'remote' ? true : Boolean(job.location);
        return hasBudget && hasLocation;
    }

    return false;
}

export function useJobOnboarding(): UseJobOnboardingResult {
    const [step, setStep] = useState<JobOnboardingStep>(0);
    const [job, setJob] = useState<JobFormData>(DEFAULT_JOB);

    const setField = useCallback(<K extends keyof JobFormData>(key: K, value: JobFormData[K]) => {
        setJob((prev) => ({ ...prev, [key]: value }));
    }, []);

    const nextStep = useCallback(() => {
        setStep((prev) => (prev < 2 ? ((prev + 1) as JobOnboardingStep) : prev));
    }, []);

    const prevStep = useCallback(() => {
        setStep((prev) => (prev > 0 ? ((prev - 1) as JobOnboardingStep) : prev));
    }, []);

    const reset = useCallback(() => {
        setStep(0);
        setJob(DEFAULT_JOB);
    }, []);

    const isLastStep = useMemo(() => step === 2, [step]);

    const canGoNext = useMemo(() => validateStep(step, job), [step, job]);

    return {
        step,
        job,
        setField,
        nextStep,
        prevStep,
        canGoNext,
        isLastStep,
        reset,
    };
}
