import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/layout";
import { api } from "@/sdk/lib/api/factory";

export const Route = createFileRoute("/_public/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useQuery(api.query.miforge.ping.queryOptions());

	return (
		<Layout>
			<span>Hello /public/home</span>
			<div>Message from API: {data?.status}</div>
		</Layout>
	);
}
