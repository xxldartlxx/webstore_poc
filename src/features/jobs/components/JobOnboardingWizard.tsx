import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useJobOnboarding } from '../hooks/useJobOnboarding';
import { JobBasicsStep } from './steps/JobBasicsStep';
import { JobDetailsStep } from './steps/JobDetailsStep';
import { JobBudgetStep } from './steps/JobBudgetStep';
import { CheckCircle2 } from 'lucide-react';

const STEP_TITLES = ['Job basics', 'Details', 'Budget & location'];

export function JobOnboardingWizard() {
    const navigate = useNavigate();
    const { step, job, setField, nextStep, prevStep, canGoNext, isLastStep, reset } = useJobOnboarding();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!canGoNext) {
            return;
        }

        if (!isLastStep) {
            nextStep();
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleStartNew = () => {
        reset();
        setIsSubmitted(false);
    };

    const currentStepLabel = STEP_TITLES[step];
    const progressPercent = ((step + 1) / STEP_TITLES.length) * 100;

    if (isSubmitted) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
                <Card className="glass-card border-primary/20">
                    <CardHeader className="flex flex-col items-center text-center space-y-4">
                        <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                        <CardTitle>Your job request is ready</CardTitle>
                        <CardDescription>
                            This demo has captured your job details locally. In a real app, this is where it would be posted for professionals to
                            review.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-muted-foreground">
                        <div>
                            <p className="font-medium text-foreground">Summary</p>
                            <p className="mt-1">{job.title}</p>
                            <p className="mt-1">{job.shortDescription}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                        <Button variant="outline" onClick={handleStartNew} className="w-full sm:w-auto">
                            Post another job
                        </Button>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <Button
                                variant="outline"
                                onClick={() => navigate('/services')}
                                className="w-full sm:w-auto"
                            >
                                Browse services
                            </Button>
                            <Button onClick={() => navigate('/providers')} className="w-full sm:w-auto">
                                Find professionals
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
            <Card className="glass-card">
                <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                        <span>Step {step + 1} of {STEP_TITLES.length}</span>
                        <span>{currentStepLabel}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-secondary/60 overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-xl sm:text-2xl">Tell us about the job</CardTitle>
                        <CardDescription>
                            We&apos;ll ask a few quick questions so we can match you with the right professionals.
                        </CardDescription>
                    </div>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        {step === 0 && (
                            <JobBasicsStep job={job} onFieldChange={setField} />
                        )}
                        {step === 1 && (
                            <JobDetailsStep job={job} onFieldChange={setField} />
                        )}
                        {step === 2 && (
                            <JobBudgetStep job={job} onFieldChange={setField} />
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between border-t border-border/60 mt-4 pt-4">
                        <div className="flex gap-2 w-full sm:w-auto">
                            {step > 0 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full sm:w-auto"
                                    onClick={prevStep}
                                >
                                    Back
                                </Button>
                            )}
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto justify-end">
                            <Button
                                type="submit"
                                disabled={!canGoNext || isSubmitting}
                                className="w-full sm:w-auto"
                            >
                                {isLastStep ? (isSubmitting ? 'Posting…' : 'Post job') : 'Continue'}
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
