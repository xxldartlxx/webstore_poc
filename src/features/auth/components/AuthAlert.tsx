interface AuthAlertProps {
    message: string;
}

export function AuthAlert({ message }: AuthAlertProps) {
    return (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center">
            {message}
        </div>
    );
}
