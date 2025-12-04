import { Textarea } from '@/components/ui/textarea';
import type { JobFormData } from '../../hooks/useJobOnboarding';

interface JobDetailsStepProps {
    job: JobFormData;
    onFieldChange: <K extends keyof JobFormData>(key: K, value: JobFormData[K]) => void;
}

export function JobDetailsStep({ job, onFieldChange }: JobDetailsStepProps) {
    const minChars = 30;
    const length = job.description.trim().length;

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-1">Describe your job in detail</label>
                <Textarea
                    value={job.description}
                    onChange={(e) => onFieldChange('description', e.target.value)}
                    placeholder="Include scope, key tasks, timings, and any important requirements so professionals can accurately respond."
                    rows={6}
                />
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>More detail helps you get better, more relevant responses.</span>
                    <span>{length}/{minChars}+ chars</span>
                </div>
            </div>
        </div>
    );
}
