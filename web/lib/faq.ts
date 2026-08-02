export const FAQ_ITEMS = [
    {
        question: "Is this a real medical diagnosis?",
        answer:
            "No — this is a screening estimate based on a trained model, not a clinical diagnosis. Always consult a doctor for medical decisions.",
    },
    {
        question: "How accurate is the model?",
        answer:
            "The model has a documented test accuracy of around 68.5%. That's meaningful, but not perfect — which is exactly why every result includes a recommendation to consult a doctor.",
    },
    {
        question: "What is SHAP / explainability?",
        answer:
            "SHAP is a technique that shows which factors most influenced your specific result, instead of giving you a black-box number with no reasoning behind it.",
    },
    {
        question: "Do you store my name or personal information?",
        answer:
            "No. Your data is anonymized on your device before it's ever sent, and only a one-way hash is used to link your own results together — never your real identity.",
    },
    {
        question: "Can anyone else see my results?",
        answer:
            "No. There's no login or account system — your history is tied only to a local, anonymous identifier stored on your own device.",
    },
    {
        question: "Can the AI Assistant prescribe medication or treatment?",
        answer:
            "No. It's explicitly restricted from naming medications or treatments, and will always redirect those questions to a real doctor.",
    },
    {
        question: "Can the AI Assistant diagnose me?",
        answer:
            "No. It only explains your existing screening result — it cannot produce a new diagnosis.",
    },
    {
        question: "Does this work without internet?",
        answer:
            "Partially. The app detects when you're offline and blocks new screenings until you're reconnected — it doesn't generate predictions offline.",
    },
    {
        question: "Can I delete my data?",
        answer:
            "Yes. You can delete individual entries from History, or clear local session data anytime from Settings.",
    },
];