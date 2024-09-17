import { ThemeProvider } from './components/theme-provider'
import { ThemeSwitcher } from './components/custom/theme-switcher'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { QueryForm } from './components/custom/query'

function App() {
  return (
    <ThemeProvider storageKey='opor-theme'>
      <div className="flex flex-col space-y-1.5">
        <Card className='border-0 w-[100vw] shadow-none lg:w-[768px] lg:border lg:shadow-sm'>
          <CardHeader className='flex flex-row justify-between space-y-0'>
            <div className='flex flex-col space-y-1.5'>
              <CardTitle>Opor</CardTitle>
              <CardDescription>Lookup open/unregistered ports</CardDescription>
            </div>
            <ThemeSwitcher />
          </CardHeader>
          <CardContent>
            <QueryForm />
          </CardContent>
        </Card>

        <small className='text-center text-muted-foreground'>
          Sourced from&nbsp;
          <a href='https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml' >
            IANA's Service Name and Transport Protocol Port Number Registry
          </a>
        </small>
      </div>
    </ThemeProvider>
  )
}

export default App
