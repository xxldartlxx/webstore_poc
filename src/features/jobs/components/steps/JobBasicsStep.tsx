import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { JobFormData } from '../../hooks/useJobOnboarding';

interface JobBasicsStepProps {
    job: JobFormData;
    onFieldChange: <K extends keyof JobFormData>(key: K, value: JobFormData[K]) => void;
}

const CATEGORIES = [
    'Home Services',
    'Design & Creative',
    'Development & Tech',
    'Writing & Translation',
    'Marketing & Sales',
    'Consulting',
];

export function JobBasicsStep({ job, onFieldChange }: JobBasicsStepProps) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-1">Job title</label>
                <Input
                    value={job.title}
                    onChange={(e) => onFieldChange('title', e.target.value)}
                    placeholder="e.g. Need a plumber for bathroom renovation"
                />
                <p className="mt-1 text-xs text-muted-foreground">Give your job a clear, descriptive title so pros can quickly understand what you need.</p>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                    value={job.category}
                    onChange={(e) => onFieldChange('category', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus-glow hover:border-primary/50"
                >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Short overview</label>
                <Textarea
                    value={job.shortDescription}
                    onChange={(e) => onFieldChange('shortDescription', e.target.value)}
                    placeholder="Briefly describe what you need help with"
                    rows={3}
                />
                <p className="mt-1 text-xs text-muted-foreground">This will be the first thing professionals see when browsing your job.</p>
            </div>
        </div>
    );
}
