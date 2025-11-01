import { forwardRef } from "react";
import { cn } from "@/sdk/utils/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {};

export const Input = forwardRef<HTMLInputElement, Props>(
	({ className: classNameProps, ...props }, ref) => {
		return (
			<input
				ref={ref}
				className={cn(
					classNameProps,
					"rounded-sm border bg-white px-1 text-quaternary focus:outline-0",
					"placeholder:text-senary placeholder:opacity-75",
					"focus:ring-2 focus:ring-quaternary focus:ring-offset-1",
					"aria-invalid:border-red-500 aria-invalid:ring-1 aria-invalid:ring-red-500 aria-invalid:ring-offset-1",
					{
						"focus:outline-0": props.type === "checkbox",
					},
				)}
				{...props}
			/>
		);
	},
);
