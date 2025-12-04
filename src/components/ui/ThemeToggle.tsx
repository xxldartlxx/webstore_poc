
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="flex items-center gap-2">
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </Button>
    );
};
