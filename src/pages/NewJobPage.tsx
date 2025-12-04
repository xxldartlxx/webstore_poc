import { JobOnboardingWizard } from '@/features/jobs/components/JobOnboardingWizard';

export function NewJobPage() {
    return (
        <div className="min-h-[70vh] bg-gradient-to-b from-background via-background/80 to-background">
            <div className="container mx-auto">
                <JobOnboardingWizard />
            </div>
        </div>
    );
}

export default NewJobPage;
