import { createLazyFileRoute } from "@tanstack/react-router";
import { LoginSection } from "@/sections/login";

export const Route = createLazyFileRoute("/_not_auth/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <LoginSection />;
}
