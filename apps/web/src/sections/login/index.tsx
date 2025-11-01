import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Container } from "@/ui/Container";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/ui/Form";
import { Input } from "@/ui/Input";
import { Section } from "@/ui/Section";
import { SectionHeader } from "@/ui/Section/Header";
import { InnerSection } from "@/ui/Section/Inner";

const FormSchema = z.object({
	email: z.email(),
});

type FormValues = z.infer<typeof FormSchema>;

export const LoginSection = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
		},
	});

	return (
		<Section>
			<SectionHeader color="green">
				<h2 className="section-title">Account Management</h2>
			</SectionHeader>
			<InnerSection>
				<Container title="Account Login" innerContainer>
					<Form {...form}>
						<form onSubmit={form.handleSubmit((data) => console.log(data))}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => {
									return (
										<FormItem className="gap-0.5">
											<FormLabel>E-mail Address</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									);
								}}
							/>
							<button type="submit">Submit</button>
						</form>
					</Form>
					<form />
				</Container>
			</InnerSection>
		</Section>
	);
};
