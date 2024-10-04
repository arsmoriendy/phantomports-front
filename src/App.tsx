import { ThemeProvider } from './components/theme-provider'
import { ThemeSwitcher } from './components/custom/theme-switcher'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { QueryForm } from './components/custom/query'
import { Footer } from './components/custom/footer'

function App() {
  return (
    <ThemeProvider storageKey='phantomports-theme'>
      <Card className='border-0 w-[100vw] shadow-none lg:w-[768px] lg:border lg:shadow-sm'>
        <CardHeader className='flex flex-row justify-between space-y-0'>
          <div className='flex flex-col space-y-1.5'>
            <CardTitle>Phantom Ports</CardTitle>
            <CardDescription>Lookup unregistered ports</CardDescription>
          </div>
          <ThemeSwitcher />
        </CardHeader>
        <CardContent>
          <QueryForm />
        </CardContent>
      </Card>

      <Footer className='mt-6' />
    </ThemeProvider>
  )
}

export default App
