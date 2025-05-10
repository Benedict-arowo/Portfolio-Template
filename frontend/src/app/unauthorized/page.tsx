import Link from "next/link";
import { ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
			<ShieldAlert className="mb-4 h-16 w-16 text-destructive" />
			<h1 className="mb-2 text-3xl font-bold">Access Denied</h1>
			<p className="mb-6 max-w-md text-muted-foreground">
				You don&#39;t have permission to access this page. Please
				contact an administrator if you believe this is an error.
			</p>
			<div className="flex gap-4">
				<Button asChild>
					<Link href="/">Return to Home</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link href="/login">Login with Different Account</Link>
				</Button>
			</div>
		</div>
	);
}
