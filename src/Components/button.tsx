import React from "react"

interface IButtonProps {
    canClick: boolean;
    loading: boolean;
    actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
    canClick,
    loading,
    actionText
}) => (
        <button className={`mt-3 text-lg font-medium text-white py-3 transition-colors focus:outline-none ${
            canClick
                ? "bg-lime-400 hover:bg-lime-500" :
                "bg-gray-300 pointer-events-none"}`
        }>
            {loading ? "Loading..." : actionText}
        </button>
    )
