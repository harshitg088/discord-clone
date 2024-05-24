export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className=" bg-slate-400 h-full flex items-center justify-center">
			{children}
		</div>
	);
}
