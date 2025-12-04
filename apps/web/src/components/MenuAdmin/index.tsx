import { MenuBox } from "@/components/Box/Menu";
import { MenuItem } from "./Item";

export const MenuAdmin = () => {
	return (
		<div className="flex">
			<MenuBox>
				<MenuItem
					label="Management"
					icon="management"
					menus={[{ label: "List acconts", to: "/admin/accounts/list" }]}
				/>
			</MenuBox>
		</div>
	);
};
