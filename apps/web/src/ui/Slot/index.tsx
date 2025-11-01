import { cloneElement, forwardRef, isValidElement } from "react";

export const Slot = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
	({ children, ...props }, ref) => {
		if (isValidElement(children)) {
			// mescla: props do filho primeiro, depois as do Slot (o Slot vence)
			const merged: Record<string, any> = { ...children.props, ...props };

			// remove undefined para não "controlar" sem querer
			for (const k of Object.keys(merged)) {
				if (merged[k] === undefined) delete merged[k];
			}

			return cloneElement(children, { ...merged, ref });
		}
		return (
			<div ref={ref} {...props}>
				{children}
			</div>
		);
	},
);
