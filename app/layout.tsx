import { SessionProvider } from '../components/SessionProvider'
import SideBar from '../components/SideBar'
import { getServerSession } from 'next-auth';
import '../styles/globals.css'
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Login from '../components/Login';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {
            !session ? 
            (
              <Login />
            ) :

            (
              <div className='flex'>
                {/* Sidebar */}
                <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[17rem]'>
                  <SideBar session={session} />
                </div>
                
                {/* Client provider -> notifications */}

                {/* Main Page */}
                <div className='bg-[#343541] flex-1'>
                  {children}
                </div>
              </div>
            )
          }
        </SessionProvider>
      </body>
    </html>
  )
}
