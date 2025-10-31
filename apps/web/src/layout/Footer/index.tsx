export const Footer = () => {
	return (
		<footer
			className="mt-5 min-h-[60px] font-fondamento"
			style={{
				gridArea: "footer",
			}}
		>
			<div className="flex flex-col items-center font-roboto text-white text-xs">
				<span>Copyright by MITG. All rights reserved.</span>
				<div className="flex flex-row gap-1">
					<a href="/#" className="hover:underline">
						About MITG
					</a>
					<span> | </span>
					<a href="/#" className="hover:underline">
						Service Agreement
					</a>
					<span> | </span>
					<a href="/#" className="hover:underline">
						Privacy Policy
					</a>
				</div>
			</div>
		</footer>
	);
};
