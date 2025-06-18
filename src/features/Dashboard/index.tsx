import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const Dashboard = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
			<div className="max-w-2xl text-center space-y-6">
				<h1 className="text-4xl font-bold tracking-tight">
					Welcome to Product Management
				</h1>

				<p className="text-lg text-muted-foreground">
					Explore and manage your products efficiently. Add new products, update
					existing ones, and keep track of your inventory all in one place.
				</p>

				<Button
					size="lg"
					onClick={() => navigate('/products')}
					className="mt-6"
				>
					Explore Products
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="ml-2 h-4 w-4"
					>
						<path d="M5 12h14" />
						<path d="m12 5 7 7-7 7" />
					</svg>
				</Button>
			</div>
		</div>
	);
};

export default Dashboard;
