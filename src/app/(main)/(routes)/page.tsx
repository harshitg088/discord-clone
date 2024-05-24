import { ModeToggle } from '@/components/mode-toggle';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
	return (
		<div className="w-full flex justify-between mx-4 my-8">
			<h1>Hello World</h1>
			<div className="flex gap-x-6 ">
				<ModeToggle />
				<UserButton afterSignOutUrl="/" />
			</div>
		</div>
	);
}
