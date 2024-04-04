import React, { ReactNode } from 'react';

interface DefaultButtonProps {
    text: string;
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
}

const Button: React.FC<DefaultButtonProps> = ({
    text,
    onClick,
    children,
    className,
}) => {
    return (
        <div className="flex justify-center py-4 w-full">
            <button
                className={`border-solid border-black btn-default overflow-hidden relative w-64 text-gray-900 py-4 px-4 rounded-xl transition-all duration-100 -- hover:shadow-md border before:to-stone-50 hover:-translate-y-[3px] ${className}`}
                onClick={onClick}
            >
                {text}
            </button>
            {children}
        </div>
    );
};

export default Button;
