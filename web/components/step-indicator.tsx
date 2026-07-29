const STEPS = ["Personal Info", "Family History", "Lifestyle", "Review"];

export default function StepIndicator({ currentStep }: { currentStep: number }) {
    return (
        <div className="flex items-center justify-between mb-8">
            {STEPS.map((label, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStep;
                const isDone = stepNum < currentStep;
                return (
                    <div key={label} className="flex-1 flex flex-col items-center relative">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                ${isDone ? "bg-primary text-primary-foreground" : ""}
                ${isActive ? "bg-primary/20 text-primary border-2 border-primary" : ""}
                ${!isDone && !isActive ? "bg-muted text-muted-foreground" : ""}
              `}
                        >
                            {stepNum}
                        </div>
                        <span className="text-xs mt-2 text-muted-foreground text-center">{label}</span>
                        {index < STEPS.length - 1 && (
                            <div
                                className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 ${isDone ? "bg-primary" : "bg-muted"
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}