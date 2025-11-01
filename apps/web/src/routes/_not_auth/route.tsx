import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Layout } from "@/layout";

export const Route = createFileRoute("/_not_auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}
