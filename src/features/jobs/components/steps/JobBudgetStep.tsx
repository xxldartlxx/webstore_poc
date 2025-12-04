import { Input } from '@/components/ui/input';
import type { JobFormData } from '../../hooks/useJobOnboarding';
import type { JobBudgetType, JobLocationType } from '../../types/job';

interface JobBudgetStepProps {
    job: JobFormData;
    onFieldChange: <K extends keyof JobFormData>(key: K, value: JobFormData[K]) => void;
}

function BudgetTypeToggle({ value, selected, onChange }: { value: JobBudgetType; selected: JobBudgetType; onChange: (value: JobBudgetType) => void }) {
    const isActive = value === selected;
    return (
        <button
            type="button"
            onClick={() => onChange(value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/60 hover:text-foreground'
            }`}
        >
            {value === 'fixed' ? 'Fixed price' : 'Hourly rate'}
        </button>
    );
}

function LocationTypeToggle({ value, selected, onChange }: { value: JobLocationType; selected: JobLocationType; onChange: (value: JobLocationType) => void }) {
    const isActive = value === selected;
    const label =
        value === 'remote' ? 'Remote' : value === 'onsite' ? 'On-site' : 'Hybrid';

    return (
        <button
            type="button"
            onClick={() => onChange(value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                isActive
                    ? 'bg-secondary text-foreground border-primary shadow-sm'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/60 hover:text-foreground'
            }`}
        >
            {label}
        </button>
    );
}

export function JobBudgetStep({ job, onFieldChange }: JobBudgetStepProps) {
    const handleBudgetTypeChange = (type: JobBudgetType) => onFieldChange('budgetType', type);
    const handleLocationTypeChange = (type: JobLocationType) => onFieldChange('locationType', type);

    const isRemote = job.locationType === 'remote';

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-1">Budget</label>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <BudgetTypeToggle value="fixed" selected={job.budgetType} onChange={handleBudgetTypeChange} />
                    <BudgetTypeToggle value="hourly" selected={job.budgetType} onChange={handleBudgetTypeChange} />
                </div>
                <Input
                    value={job.budget}
                    onChange={(e) => onFieldChange('budget', e.target.value)}
                    placeholder={job.budgetType === 'fixed' ? 'Total budget (e.g. 250)' : 'Hourly rate (e.g. 35)'}
                    type="number"
                    min={0}
                />
                <p className="mt-1 text-xs text-muted-foreground">You can always adjust budget details later after discussing with professionals.</p>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <LocationTypeToggle value="remote" selected={job.locationType} onChange={handleLocationTypeChange} />
                    <LocationTypeToggle value="onsite" selected={job.locationType} onChange={handleLocationTypeChange} />
                    <LocationTypeToggle value="hybrid" selected={job.locationType} onChange={handleLocationTypeChange} />
                </div>
                <Input
                    value={job.location}
                    onChange={(e) => onFieldChange('location', e.target.value)}
                    placeholder={isRemote ? 'City or region (optional)' : 'City or area where the work will happen'}
                    disabled={isRemote}
                />
                <p className="mt-1 text-xs text-muted-foreground">If the job can be done from anywhere, choose Remote. Otherwise, specify where the work will take place.</p>
            </div>
        </div>
    );
}
