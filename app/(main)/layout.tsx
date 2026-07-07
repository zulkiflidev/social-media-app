import BottomNavBar from "@/components/shared/BottomNavbar";
import Navbar from "@/components/shared/Navbar";



export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}

      </main>
      <BottomNavBar />  

    </>
  );
}