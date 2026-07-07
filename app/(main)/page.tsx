import { redirect } from 'next/navigation';


export default function HomePage() {

    redirect('/login');

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
            
            <h1 className="text-4xl font-bold tracking-tight">
               Welcome to Sociality 
            </h1>

            <p className="mt-2 text-muted-foreground">
               Please Login or Register...
            </p>
        </div>



    );
}